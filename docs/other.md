## 小程序 computed 实现原理
小程序官网展示的案例是通过拦截 setData 方法，在每次 setData 方法的时候去计算 computed 中定义的值，然后设置到 data （这样做有很多弊端，例如 computed 之间如果相互引用很可能会存在有些 computed 没有计算出来的问题）。  
官方拓展包的实现是通过 Proxy 拦截 data 的访问获取每一个 computed 对应的依赖路径，并记录依赖的值，之后会根据依赖计算出自己的值，并初始化出自身的更新函数。在有字段改变的时候，触发 fields 字段是 ** 的 observer 函数，执行所有的 computed 更新函数，直到所有更新函数都已经是新值。  
个人博客相关文章：[https://github.com/NameWjp/blog/issues/23](https://github.com/NameWjp/blog/issues/23)

## 单点登录
### 概念
单点登录分为多个系统和一个认证系统SSO，如图：
![](./images/sso.png)  
图中有4个系统，分别是 Application1、Application2、Application3、和 SSO。Application1、Application2、Application3 没有登录模块，而 SSO 只有登录模块，没有其他的业务模块，当 Application1、Application2、Application3 需要登录时，将跳到 SSO 系统，SSO 系统完成登录，其他的应用系统也就随之登录了。
### 同域下的单点登录
利用 cookie 可以设置二级域名的特点达到 cookie 共享的目的。例如此时有三个域名：app1.a.com，app2.a.com，sso.a.com。当用户在 app1.a.com 系统中的 session 中查找不到时，会请求 sso.a.com 的接口，来判断用户是否登录，因为之前登录会在 sso.a.com 中设置二级域名的 cookie（在这里是.a.com），所以该请求会携带对应的 cookie，sso.a.com 系统拿到 cookie 后会在自己的 session 中查找是否存在，存在则返回 session 给 app1.a.com 系统同步，否则让用户跳转到 sso.a.com 系统进行登录。
### 不同域下的单点登录
不同域下的单点登录参考 CAS 官网上的标准流程，具体流程如下：  
1. 用户访问 app 系统，app 系统是需要登录的，但用户现在没有登录。
2. 跳转到 SSO 登录系统，SSO 系统也没有登录，弹出用户登录页。
3. 用户填写用户名、密码，SSO 系统进行认证后，将登录状态写入 SSO 的 session，浏览器（Browser）中写入 SSO 域下的 Cookie。
4. SSO 系统登录完成后会生成一个 ST（Service Ticket），然后跳转到 app 系统，同时将 ST 作为参数传递给 app 系统。
5. app 系统拿到 ST 后，从后台向 SSO 发送请求，验证 ST 是否有效。
6. 验证通过后，app 系统将登录状态写入 session 并设置 app 域下的 Cookie。

至此，跨域单点登录就完成了。以后我们再访问 app 系统时，app 就是登录的。接下来，我们再看看访问 app2 系统时的流程。用户访问 app2 系统，app2 系统没有登录，跳转到 SSO。
1. 由于 SSO 已经登录了，不需要重新登录认证。
2. SSO 生成 ST，浏览器跳转到 app2 系统，并将ST作为参数传递给 app2。
3. app2 拿到 ST，后台访问 SSO，验证 ST 是否有效。
4. 验证成功后，app2 将登录状态写入 session，并在 app2 域下写入 Cookie。  

这样，app2 系统不需要走登录流程，就已经是登录了。SSO，app 和 app2 在不同的域，它们之间的 session 不共享也是没问题的。  
参考链接：[https://developer.aliyun.com/article/636281](https://developer.aliyun.com/article/636281)