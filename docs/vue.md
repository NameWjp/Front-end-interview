## vue 的生命周期有哪些
![](./images/vue_lifecycle.png)  
vue 的生命周期如图，总结如下：
1. beforeCreate  
只初始化一些事件，data 数据没有初始化，无法访问。
2. created  
data 数据已经初始化，可以访问，但此时的 dom 没有挂载，可以在这里进行请求服务器数据等操作。
3. beforeMount  
dom 挂载，但是 dom 中存在类似 {{ xxx }} 的占位符，并没有替换。
4. mounted  
此时组件渲染完毕，占位符也都被替换。
5. beforeUpdate 和 updated  
组件触发更新时，会立刻先调用 beforeUpdate，等到重新渲染完之后调用 updated 钩子
6. beforeDestroy 和 destroyed  
组件在销毁前会调用 beforeDestroy 钩子，可以在这里进行一些定时器或者销毁操作。destroyed 钩子函数会在 Vue 实例销毁后调用。
7. activated 和 deactivated  
如果组件被 keep-alive 包裹，第一次渲染会在 mounted 钩子后面调用 activated 钩子，离开的时候不会调用 beforeDestroy 和 destroyed 钩子，而是调用 deactivated 钩子，等到再切换回来的时候，activated 钩子会调用（不会再走 mounted 钩子）。
8. errorCaptured  
用于捕获子组件中抛出的错误，注意只有 errorCaptured 返回 false 则可以阻止错误继续向上传播（本质上是说“这个错误已经被搞定了且应该被忽略”）。
## Vue 响应式原理
![](./images/vue_init_process.png)  
Vue 的初始化如图所示，在执行 Observer 的时候会给 data 中的每个对象和数组添加一个 `__ob__` 属性，其中有一个 dep 属性，dep 是类 Dep 的实例，而 Dep 类内部实现了一套发布订阅的模式。之后又会递归遍历 data 中的对象和数组，将对象的 key 全部通过 Object.defineProperty 定义，拦截对象的 get 和 set，在 get 中通过 depend（这里在源码里有点绕，其实是先调用 dep 的 depend 方法，该方法会调用当前 watcher 的 addDep 方法，并将当前 dep 传过去，watcher 的 addDep 实际就是执行了 dep 的 addSub 方法将自己 push 进去） 将当前 watcher（后面解释它的意义）push 到一个数组中，完成了订阅。set 中通过遍历之前的数组，触发每个 watcher 的 update，从而派发更新。对于数组，由于数组是引用类型，对数组的 push 等方法并不会触发对象的 set，这里采用的是代理模式，拦截数组的原型，在 push 等改变数组方法调用时，手动派发更新。
`__ob__`属性如下：  
![](./images/vue_ob_data.png)  
最后说下 Watcher，在 Vue 中 watcher 有三种：render watcher/ computed watcher/ user watcher(就是vue方法中的那个watch)，Watcher 类的作用是 vm 实例和 Observer 的桥梁，负责管理 dep，vm 等。比如 Observer 的 set 方法触发了 watcher 的 update 去更新， watcher 的 update 会调用 vm 的 _update 从而更新视图。

## Vue3 和 Vue2 的区别
Vue3 除了性能提升外，相比 Vue2 有以下特点：  
1. 使用 Proxy 替代 Object.defineProperty  
替换之后对象或数组可以在没有提前定义 key 的情况下直接赋值。（Object.defineProperty 需要提前知道 key 才能拦截这个 key 的访问，而 Proxy 是直接拦截整个对象的访问）
2. 增加 Composition  
在vue2中我们会在一个 vue 文件中 data，methods，computed，watch 中定义属性和方法，共同处理页面逻辑. 一个功能往往需要在不同的vue配置项中定义属性和方法，比较分散.即使通过 Mixins 重用逻辑代码，也容易发生命名冲突且关系不清。  
在 Vue3 Composition API 中，代码是根据逻辑功能来组织的，一个功能的所有 api 会放在一起（高内聚，低耦合），这样做，即时项目很大，功能很多，都能快速的定位到这个功能所用到的所有 API。提高可读性和可维护性，而且基于函数组合的 API 更好的重用逻辑代码（和 React 的 Hooks 类似）。
3. 全面支持 TypeScript  
内部采用 TypeScript 重写，并在工具链上提供对 TypeScript 的支持。

## Vue 和 React 的区别是什么
设计理念不同，Redux 使用的是不可变数据，而 Vuex 的数据是可变的。  
Vue 通过 getter/setter 以及一些函数的劫持，能精确知道数据变化。而 React 更强调数据的不可变（immutable）。比如改变一个对象属性的值，在 Vue 可以直接修改，而在 React 需要拿一个新值替换旧值。
原因？？