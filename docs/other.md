## 小程序 computed 实现原理
小程序官网展示的案例是通过拦截 setData 方法，在每次 setData 方法的时候去计算 computed 中定义的值，然后设置到 data （这样做有很多弊端，例如 computed 之间如果相互引用很可能会存在有些 computed 没有计算出来的问题）。  
官方拓展包的实现是通过 Proxy 拦截 data 的访问获取每一个 computed 对应的依赖路径，并记录依赖的值，之后会根据依赖计算出自己的值，并初始化出自身的更新函数。在有字段改变的时候，触发 fields 字段是 ** 的 observer 函数，执行所有的 computed 更新函数，直到所有更新函数都已经是新值。  
个人博客相关文章：[https://github.com/NameWjp/blog/issues/23](https://github.com/NameWjp/blog/issues/23)
