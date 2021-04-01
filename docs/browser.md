## 什么是同源政策有哪些限制
同源策略可防止 JavaScript 发起跨域请求。源被定义为协议、主机名和端口号的组合。此策略可防止页面上的恶意脚本通过该页面的文档对象模型，访问另一个网页上的敏感数据。  
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