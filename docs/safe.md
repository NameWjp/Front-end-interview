## 什么是 xss 
xss攻击的本质是代码注入，利用浏览器拼接成任意的 javascript 去执行自己想做的事情。防御的方法很简单，不要相信用户的任何输入，对于用户的任何输入要进行检查、过滤和转义。



## 什么是 csrf
csrf攻击是利用浏览器可以跨域发送请求（ajax 请求会跨域，普通的表单提交和资源获取不会），而每个 http 请求浏览器都会自动携带对应域名下的 cookie 的特性。如果服务端的认证方式完全基于 cookie，那么这条请求就可以达到伪装用户的目的。常见的防御手段是放弃 session 的用户认证，采用 token 的认证方式，在每个 http 的请求头上携带 token，服务器拿到 token 去效验合法性。



## cookies 的保护方式
Cookie 中有个属性secure，当该属性设置为true时，表示创建的 Cookie 会被以安全的形式向服务器传输，也就是只能在 HTTPS 连接中被浏览器传递到服务器端进行会话验证，如果是 HTTP 连接则不会传递该cookie信息，所以不会被窃取到Cookie 的具体内容。就是只允许在加密的情况下将cookie加在数据包请求头部，防止cookie被带出来。

另一个是 HttpOnly属性，如果在Cookie中设置了"HttpOnly"属性，那么通过程序(JS脚本、Applet等)将无法读取到Cookie信息，这样能有效的防止XSS攻击。

secure属性是防止信息在传递的过程中被监听捕获后信息泄漏，HttpOnly属性的目的是防止程序获取cookie后进行攻击。

但是这两个属性并不能解决cookie在本机出现的信息泄漏的问题(FireFox的插件FireBug能直接看到cookie的相关信息)。