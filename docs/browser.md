## 什么是同源政策有哪些限制
同源策略可防止 JavaScript 发起跨域请求。源被定义为协议、主机名和端口号的组合。此策略可防止页面上的恶意脚本通过该页面的文档对象模型，访问另一个网页上的敏感数据（注意提交表单是不会受同源政策的限制）。  
下表给出了与 URL http://store.company.com/dir/page.html 的源进行对比的示例:
|URL|结果|原因|
|-|-|-|
|http://store.company.com/dir2/other.html|同源|只有路径不同|
|https://store.company.com/secure.html|不同源|协议不同|
|http://store.company.com:81/dir/etc.html|不同源|端口不同( http:// 默认端口是80)|
|http://news.company.com/dir/other.html|不同源|主机不同|
同源政策的范围：  
1. Cookie、LocalStorage 和 IndexDB 无法读取。
2. DOM 无法获得。
3. AJAX 请求不能发送。   

常见的解决办法：  
1. jsonp ，允许 script 加载第三方资源
2. 反向代理（nginx 服务内部配置 Access-Control-Allow-Origin *）
3. cors 前后端协作设置请求头部，Access-Control-Allow-Origin 等头部信息
4. iframe 嵌套通讯，postmessage  

参考资料：[http://www.ruanyifeng.com/blog/2016/04/same-origin-policy.html](http://www.ruanyifeng.com/blog/2016/04/same-origin-policy.html)



## 为什么浏览器的 JS 线程和 UI 线程是互斥的？
由于 JavaScript 是可操纵 DOM 的,如果在修改这些元素属性同时渲染界面（即 JavaScript 线程和 UI 线程同时运行）,那么渲染线程前后获得的元素数据就可能不一致了。  
比如你使用 JS 操作了 DOM，如果 JS 线程和 UI 线程是并行的，那么下一行 JS 代码获取的 DOM 相关信息很可能还没有更新，不利于编程。



## 跨源资源共享（CORS）
CORS 是一个W3C标准，全称是"跨域资源共享"（Cross-origin resource sharing）。它允许浏览器向跨源服务器，发出 XMLHttpRequest 请求，从而克服了 ajax 只能同源使用的限制。浏览器将 CORS 请求分为两类：简单请求和非简单请求。

### 简单请求
只要同时满足以下两大条件，就属于简单请求：  
1. 请求方法是以下三种方法之一：  
HEAD  
GET  
POST  
2. HTTP的头信息不超出以下几种字段：  
Accept  
Accept-Language  
Content-Language  
Last-Event-ID  
Content-Type：只限于三个值 application/x-www-form-urlencoded、 multipart/form-data、 text/plain

对于简单请求浏览器会直接发出 CORS 请求，但会在请求头信息中，增加一个 Origin 字段。服务器会返回一个正常的 HTTP 响应，如果浏览器发现，这个回应的头信息没有包含 Access-Control-Allow-Origin 字段（也有其他的效验字段），或者 Origin 不在 Access-Control-Allow-Origin 字段定义的范围内，就会抛出一个错误，被 XMLHttpRequest 的 onerror 回调函数捕获，同时丢弃返回的内容。如果效验通过了，则会正常返回服务器的内容。

### 非简单请求
凡是不满足简单请求的 ajax 请求都是非简单请求，例如 Content-Type 为 application/json 的 POST 请求。对于非简单请求，浏览器会在正式通信之前，增加一次 HTTP 查询请求，称为 "预检" 请求，预请求的方法是 OPTIONS，同时也会在请求头添加 Origin 字段。服务器会返回一个正常的 HTTP 响应，如果浏览器发现，这个回应的头信息没有包含 Access-Control-Allow-Origin 字段（也有其他的效验字段），或者 Origin 不在 Access-Control-Allow-Origin 字段定义的范围内，就会抛出一个错误，被 XMLHttpRequest 的 onerror 回调函数捕获，同时不会再发送请求。如果效验通过了，则会重新发送真正的请求，返回服务器的内容。

参考资料：[https://www.ruanyifeng.com/blog/2016/04/cors.html](https://www.ruanyifeng.com/blog/2016/04/cors.html)



## 在浏览器输入 URL 回车之后发生了什么
1. URL 解析  
地址解析、检查缓存等操作。
2. DNS 查询  
查询路线：浏览器缓存 => 本机 Host 文件 => 操作系统缓存 => 路由器缓存 => DNS 服务器 => 根域名服务器
3. 建立 TCP 连接，三次握手
4. 服务器处理请求  
5. 浏览器接受请求  
资源解压、根据 MIME 类型做相应的处理、重定向等
6. 渲染页面  
html、css 的解析，构建渲染树，视图渲染，JavaScript 的编译和执行等

详细解析参考：[https://zhuanlan.zhihu.com/p/80551769](https://zhuanlan.zhihu.com/p/80551769)