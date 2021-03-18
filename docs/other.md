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

但是官方推出了拓展包，我们来看看小程序官方是如何解决这些问题的  
