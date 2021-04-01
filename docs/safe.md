## 什么是 xss 
xss攻击的本质是代码注入，利用浏览器拼接成任意的 javascript 去执行自己想做的事情。防御的方法很简单，不要相信用户的任何输入，对于用户的任何输入要进行检查、过滤和转义。

## 什么是 csrf
csrf攻击是利用浏览器可以跨域发送请求（ajax 请求会跨域，普通的表单提交和资源获取不会），而每个 http 请求浏览器都会自动携带对应域名下的 cookie 的特性。如果服务端的认证方式完全基于 cookie，那么这条请求就可以达到伪装用户的目的。常见的防御手段是放弃 session 的用户认证，采用 token 的认证方式，在每个 http 的请求头上携带 token，服务器拿到 token 去效验合法性。