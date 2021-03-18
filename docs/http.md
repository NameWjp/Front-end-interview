## 一个 tcp 连接能发几个 http 请求?
HTTP 1.0 版本协议一个 tcp 只能发送一个 http 请求，但是服务器实现了 Connection: Keep-Alive，因此一个 tcp 可以发送多个 http 请求但请求不能并发。  
HTTP 1.1 版本将 Connection: Keep-Alive 纳入标准。  
HTTP 2.0 版本协议，支持多用复用，一个 TCP 连接是可以并发多个 HTTP 请求的。  