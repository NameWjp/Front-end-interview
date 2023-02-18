## 什么是 XSS 
XSS 攻击的本质是代码注入，利用浏览器拼接成任意的 javascript 去执行自己想做的事情。防御的方法很简单，不要相信用户的任何输入，对于用户的任何输入要进行检查、过滤和转义。



## 什么是 CSRF
CSRF 攻击是利用浏览器可以跨域发送请求（ajax 请求会跨域，但从同源政策来看有两种不跨域，一是 GET 请求通过请求资源的方式，二是 POST 请求通过 form 表单的形式），而每个 http 请求浏览器都会自动携带对应域名下的 Cookie 的特性。如果服务端的认证方式完全基于 cookie，那么这条请求就可以达到伪装用户的目的。常见的防御手段是放弃 session 的用户认证，采用 token 的认证方式，在每个 http 的请求头上携带 token，服务器拿到 token 去效验合法性。另一种方法是设置 Cookie 的 SameSite 为 Lax，限制跨域请求 Cookie 的发送，能够有效的防止 CSRF 攻击。



## Cookie 的保护方式
### Secure
当 Cookie 的 Secure 属性设置为 true 时，表示创建的 Cookie 会被以安全的形式向服务器传输，也就是只能在 HTTPS 连接中被浏览器传递到服务器端进行会话验证，如果是 HTTP 连接则不会传递该 Cookie 信息，所以不会被窃取到 Cookie 的具体内容。就是只允许在加密的情况下将 Cookie 加在数据包请求头部，防止 Cookie 被带出来。
### HttpOnly
如果在 Cookie 中设置了 "HttpOnly" 属性，那么通过程序(JS 脚本、Applet 等)将无法读取到 Cookie 信息，这样能有效的防止XSS攻击。
### SameSite
SameSite 是用来限制 Cookie 的跨域发送，用来防止 CSRF 攻击和用户追踪。当为 Strict 时会完全禁止第三方 Cookie，由于这个规则过于严格，可能造成非常不好的用户体验。比如，当前网页有一个 GitHub 链接，用户点击跳转就不会带有 GitHub 的 Cookie，跳转过去总是未登陆状态。当为 Lax 时大多数情况也是不发送第三方 Cookie，但是导航到目标网址的 Get 请求除外。当为 None 时（必须设置 Secure 属性，否则 None 设置无效）任何跨域请求都会发送。
### SameParty（实验性）
#### SameSite 的问题
SameSite 虽然能够解决第三方登录问题，但是会阻止在使用危险 HTTP 方法进行请求携带的三方 Cookie，例如 POST 方式。同时，使用 JavaScript 脚本发起的请求也无法携带三方 Cookie。所以有这些需求的网站将不得不设置  SameSite=None，这意味着这种 Cookie 又失去了跨站点请求伪造 (CSRF) 保护。
#### First-Party Sets 策略
First-Party Sets 提出了一种明确定义在同一主体下拥有和运营的多个站点关系的方法。比如 .tmall.com、taobao.com 都可以被定义为同一主体运营 。为了防止滥用，First-Party Sets 有一些限制：

+ First-Party Sets 中的域必须由同一组织拥有和运营。
+ 所有域名应该作为一个组被用户识别。
+ 所有域名应该共享一个共同的隐私政策。  

每一个需要用到 First-Party Sets 策略的域名都应该把一个 JSON 配置托管在 /.well-known/first-party-set 路由下。例如 conardli.top 的配置应该托管在 https://conardli.top/.well-known/first-party-set 下：
```json
{
  "owner": "conardli.top",
  "version": 1,
  "members": ["conardli.com", "conardli.cn"]
}
```
另外 conardli.com、 conardli.cn 两个域名均需要增加所有者的配置：
```json
{
  "owner": "conardli.top"
}
```
#### SameParty 属性
SameParty 属性就是配合上面的 First-Party Sets 策略来的，开启了 First-Party Sets 域名下需要共享的 Cookie 都需要增加 SameParty 属性，例如，如果我在 conardli.top 下设置了下面的 Cookie
```js
Set-Cookie: name=lishiqi; Secure; SameSite=Lax; SameParty
```
这时我在 conardli.cn 下发送 conardli.top 域名的请求，Cookie 也可以被携带了，但是如果我在另外一个网站，例如 eval.site 下发送这个请求， Cookie 就不会被携带。

### 总结
Secure 属性是防止信息在传递的过程中被监听捕获后信息泄漏，HttpOnly 属性的目的是防止程序获取 Cookie 后进行攻击，SameSite 是为了防止 CSRF 攻击和用户追踪。但是这几个属性并不能解决 Cookie 在本机出现的信息泄漏的问题(FireFox 的插件 FireBug 能直接看到 Cookie 的相关信息)。最后 SameParty 的出现有望彻底解决第三方登录 Cookie 问题。

参考：  
+ [What is the difference between SameSite="Lax" and SameSite="Strict"?](https://stackoverflow.com/questions/59990864/what-is-the-difference-between-samesite-lax-and-samesite-strict)  
+ [Cookie 的 SameSite 属性](https://www.ruanyifeng.com/blog/2019/09/cookie-samesite.html)
+ [详解 Cookie 新增的 SameParty 属性](https://juejin.cn/post/7002011181221167118)



## 常见的编码和加密算法
### 编码
编码不是加密算法，指将一种格式转化成另一种格式，例如很多服务器只识别 ASCII 字符，我们在传递 url 的参数时需要先将参数编码。例如 `encodeURIComponent` 方法和 `encodeURI` 方法。还有另外一种常见的编码：`Base64 编码`。Base64 编码可以把任意长度的二进制数据变为纯文本，例如将小图转化为 Base64，从而减少浏览器请求。
### 哈希算法
哈希算法（Hash）又称摘要算法（Digest），它的作用是：对任意一组输入数据进行计算，得到一个固定长度的输出摘要。由于有彩虹表攻击，我们常常会在输入中加盐（加入自己定义好的认证码）加大破解的难度。
#### 常见用途
1. 网站上传文件时将文件 hash 也上传，这样用户下载文件后自己计算出 hash，如果 hash 值和上传的文件 hash 值一样，则说明文件没有被修改过。
2. 使用 md5 加密用户密码，这样可以防止用户密码泄漏，用户登陆时只需要看登陆密码计算出来的 md5 和数据库存储的 md5 是否一样，一样则说明密码输入正确。
#### 特点
1. 相同的输入一定得到相同的输出
2. 不同的输入大概率得到不同的输出
#### 常见算法
1. `MD5`
2. `SHA-1`
### 对称加密算法
对称加密算法就是传统的用一个密码进行加密和解密。例如，我们常用的WinZIP和WinRAR对压缩包的加密和解密，就是使用对称加密算法。常见算法：`AES 加密`。
### 口令加密算法
口令加密算法指对用户输入的口令进行加密，算出一个密钥。例如 `PBE 算法`，它的作用就是把用户输入的口令和一个安全随机的口令采用杂凑后计算出真正的密钥。
### 密钥交换算法
密钥交换算法即 `DH 算法`，它解决了密钥在双方不直接传递密钥的情况下完成密钥交换，这个神奇的交换原理完全由数学理论支持。详见：[DH 算法](https://www.liaoxuefeng.com/wiki/1252599548343744/1304227905273889)
### 非对称加密算法
非对称加密就是加密和解密使用的不是相同的密钥：只有同一个公钥-私钥对才能正常加解密。非对称加密的典型算法就是 `RSA 算法`。非对称加密相比对称加密的显著优点在于，对称加密需要协商密钥，而非对称加密可以安全地公开各自的公钥，缺点在于运算速度慢。实际上浏览器中的 HTTPS 协议采用的两种算法结合：先通过 RSA 交换 AES 口令，接下来双方通信实际上采用的是速度较快的 AES 对称加密，而不是缓慢的 RSA 非对称加密。
### 签名算法
数字签名就是用发送方的私钥对原始数据进行签名，只有用发送方公钥才能通过签名验证，这样就保证了消息一定是私钥含有方发送的。
### 数字证书
我们知道，摘要算法用来确保数据没有被篡改，非对称加密算法可以对数据进行加解密，签名算法可以确保数据完整性和抗否认性，把这些算法集合到一起，并搞一套完善的标准，这就是数字证书。因此，数字证书就是集合了多种密码学算法，用于实现数据加解密、身份认证、签名等多种功能的一种安全标准。

数字证书可以防止中间人攻击，因为它采用链式签名认证，即通过根证书（Root CA）去签名下一级证书，这样层层签名，直到最终的用户证书。而 Root CA 证书内置于操作系统中，所以，任何经过 CA 认证的数字证书都可以对其本身进行校验，确保证书本身不是伪造的。

数字证书一般由数字证书认证机构（Certificate Authority）颁发，证书里面包含了真实服务器的公钥和网站的一些其他信息，数字证书机构用自己的私钥加密后发给浏览器，浏览器使用数字证书机构的公钥解密后得到真实服务器的公钥。这个过程是建立在被大家所认可的证书机构之上得到的公钥，所以这是一种安全的方式。

参考资料：[https://www.liaoxuefeng.com/wiki/1252599548343744/1255943717668160](https://www.liaoxuefeng.com/wiki/1252599548343744/1255943717668160)
