## 小程序 computed 实现原理
小程序官网展示的案例是通过拦截 setData 方法，在每次 setData 方法的时候去计算 computed 中定义的值，然后设置到 data 中，官方展示案例如下：  
```js
// behavior.js
module.exports = Behavior({
  lifetimes: {
    created() {
      this._originalSetData = this.setData // 原始 setData
      this.setData = this._setData // 封装后的 setData
    }
  },
  definitionFilter(defFields) {
    const computed = defFields.computed || {}
    const computedKeys = Object.keys(computed)
    const computedCache = {}

    // 计算 computed
    const calcComputed = (scope, insertToData) => {
      const needUpdate = {}
      const data = defFields.data = defFields.data || {}

      for (let key of computedKeys) {
        const value = computed[key].call(scope) // 计算新值
        if (computedCache[key] !== value) needUpdate[key] = computedCache[key] = value
        if (insertToData) data[key] = needUpdate[key] // 直接插入到 data 中，初始化时才需要的操作
      }

      return needUpdate
    }

    // 重写 setData 方法
    defFields.methods = defFields.methods || {}
    defFields.methods._setData = function (data, callback) {
      const originalSetData = this._originalSetData // 原始 setData
      originalSetData.call(this, data, callback) // 做 data 的 setData
      const needUpdate = calcComputed(this) // 计算 computed
      originalSetData.call(this, needUpdate) // 做 computed 的 setData
    }

    // 初始化 computed
    calcComputed(defFields, true) // 计算 computed
  }
})
```
但这种方式实现的比较简陋，有几个比较明显的缺点：  
1. 每次 setData 的时候都会去计算所有的 computed 性能很差，不能进行精准更新。
2. computed 之间如果相互引用很可能会存在有些 computed 没有计算出来的问题。  

小程序官方推出了拓展包，我们来看看小程序官方是如何解决这些问题的  
小程序官方的实现依赖于 observers 字段，详情见 [https://developers.weixin.qq.com/miniprogram/dev/framework/custom-component/observer.html](https://developers.weixin.qq.com/miniprogram/dev/framework/custom-component/observer.html)。它内部会维护一个 ObserversItems 的数组，最终会挂载到 observers 字段上。  
```js
definitionFilter(defFields: any & BehaviorExtend) {
  const observersItems: ObserversItem[] = [];

  ...

  if (typeof defFields.observers !== "object") {
    defFields.observers = {};
  }
  if (Array.isArray(defFields.observers)) {
    defFields.observers.push(...observersItems);
  } else {
    observersItems.forEach((item) => {
      // defFields.observers[item.fields] = item.observer
      const f = defFields.observers[item.fields];
      if (!f) {
        defFields.observers[item.fields] = item.observer;
      } else {
        defFields.observers[item.fields] = function () {
          item.observer.call(this);
          f.call(this);
        };
      }
    });
  }
}
```
上面主要做了一些兼容处理，和用户传入的 observers 字段合并，我们这里主要注意 computed 字段的实现原理，源码里有这样一段  
```js
if (computedDef) {
  observersItems.push({
    fields: "**",
    observer(this: BehaviorExtend) {
      if (!computedWatchInfo) return;

      let changed: boolean;
      do {
        changed = computedWatchInfo.computedUpdaters.some((func) =>
          func.call(this)
        );
      } while (changed);
    },
  });
}
```
这里的 fields 字段是 ** 表示 data 里的每个数据变化都会触发 observer 的回调，里面会执行 computedWatchInfo.computedUpdaters 队列里的更新函数，找到一个返回为 true 会停止执行。这里的 computedWatchInfo 是在初始化的过程中生成的，我们继续看看初始化的过程：  
```js
export const behavior = Behavior({
  attached(this: BehaviorExtend) {
    this.setData({
      _computedWatchInit: "attached",
    });
  },
  created(this: BehaviorExtend) {
    this.setData({
      _computedWatchInit: "created",
    });
  },
  definitionFilter(defFields: any & BehaviorExtend) {
    const computedDef = defFields.computed;
    const observersItems: ObserversItem[] = [];
    let computedWatchInfo = null;

    observersItems.push({
      fields: "_computedWatchInit",
      observer(this: BehaviorExtend) {
        const status = this.data._computedWatchInit;
        if (status === "created") {
          // init data fields
          computedWatchInfo = {
            computedUpdaters: [],
            computedRelatedPathValues: {},
            watchCurVal: {},
          };
        } else if (status === "attached") {
          // handling computed
          // 1. push to initFuncs
          // 2. push to computedUpdaters
          if (computedDef) {
            Object.keys(computedDef).forEach((targetField) => {
              const updateMethod = computedDef[targetField];
              const relatedPathValuesOnDef = [];
              const val = updateMethod(
                dataTracer.create(this.data, relatedPathValuesOnDef)
              );

              const pathValues = relatedPathValuesOnDef.map(({ path }) => ({
                path,
                value: dataPath.getDataOnPath(this.data, path),
              }));

              // here we can do small setDatas
              // because observer handlers will force grouping small setDatas together
              this.setData({
                [targetField]: dataTracer.unwrap(val),
              });

              computedWatchInfo.computedRelatedPathValues[
                targetField
              ] = pathValues;

              // will be invoked when setData is called
              const updateValueAndRelatedPaths = () => {
                const oldPathValues =
                  computedWatchInfo.computedRelatedPathValues[targetField];
                let needUpdate = false;
                // check whether its dependency updated
                for (let i = 0; i < oldPathValues.length; i++) {
                  const { path, value: oldVal } = oldPathValues[i];
                  const curVal = dataPath.getDataOnPath(this.data, path);
                  if (oldVal !== curVal) {
                    needUpdate = true;
                    break;
                  }
                }
                if (!needUpdate) return false;

                const relatedPathValues = [];
                const val = updateMethod(
                  dataTracer.create(this.data, relatedPathValues)
                );
                this.setData({
                  [targetField]: dataTracer.unwrap(val),
                });
                computedWatchInfo.computedRelatedPathValues[
                  targetField
                ] = relatedPathValues;
                return true;
              };
              computedWatchInfo.computedUpdaters.push(
                updateValueAndRelatedPaths
              );
            });
          }
        }
      },
    });
  }
})
```
小程序 Behavior 初始化的流程是 definitionFilter => created => attached，definitionFilter 初始化的时候会定义 _computedWatchInit 