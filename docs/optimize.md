## 图片优化
### 概念
#### 有损压缩
指在压缩文件大小的过程中，损失了一部分图片的信息，也即降低了图片的质量，并且这种损失是不可逆的，我们不可能从有一个有损压缩过的图片中恢复出全来的图片。常见的有损压缩手段，是按照一定的算法将临近的像素点进行合并。
#### 无损压缩
只在压缩文件大小的过程中，图片的质量没有任何损耗。我们任何时候都可以从无损压缩过的图片中恢复出原来的信息。
#### 索引色
用一个数字来代表（索引）一种颜色，在存储图片的时候，存储一个数字的组合，同时存储数字到图片颜色的映射。这种方式只能存储有限种颜色，通常是256种颜色，对应到计算机系统中，使用一个字节的数字来索引一种颜色。
#### 直接色
使用四个数字来代表一种颜色，这四个数字分别代表这个颜色中红色、绿色、蓝色以及透明度。现在流行的显示设备可以在这四个维度分别支持256种变化，所以直接色可以表示2的32次方种颜色。当然并非所有的直接色都支持这么多种，为压缩空间使用，有可能只有表达红、绿、蓝的三个数字，每个数字也可能不支持256种变化之多。
#### 点阵（位）图
点阵图是由象素的排列来实现其显示效果的，每个象素有自己的颜色信息，在对点阵图进行编辑操作的时候，可操作的对象是每个象素，我们可以改变图像的色相、饱和度、明度，从而改变图像的显示效果。点阵图缩放会失真，用最近非常流行的沙画来比喻最恰当不过，当你从远处看的时候，画面细腻多彩，但是当你靠的非常近的时候，你就能看到组成画面的每粒沙子以及每个沙粒的颜色。
#### 矢量图
也叫做向量图。矢量图并不纪录画面上每一点的信息，而是纪录了元素形状及颜色的算法，当你打开一付矢量图的时候，软件对图形象对应的函数进行运算，将运算结果（图形的形状和颜色）显示给你看。无论显示画面是大还是小，画面上的对象对应的算法是不变的，所以，即使对画面进行倍数相当大的缩放，其显示效果仍然相同(不失真)。
### 常见图片格式和使用场景
#### BMP
BMP，是无损的、既支持索引色也支持直接色的点阵图。这种图片格式几乎没有对数据进行压缩，所以BMP格式的图片通常是较大的文件。
#### GIF
GIF 是无损的、采用索引色的点阵图。采用 LZW 压缩算法进行编码。文件小，是 GIF 格式的优点，同时，GIF 格式还具有支持动画以及透明的优点。但是 GIF 格式仅支持 8bit 的索引色，所以 GIF 格式适用于对色彩要求不高同时需要文件体积较小的场景。
#### JPEG
JPEG 是有损的、采用直接色的点阵图。JPEG 的图片的优点是采用了直接色，得益于更丰富的色彩，JPEG 非常适合用来存储照片，与 GIF 相比，JPEG 不适合用来存储企业 Logo、线框类的图。因为有损压缩会导致图片模糊，而直接色的选用，又会导致图片文件较 GIF 更大。
#### PNG-8
PNG-8 是无损的、使用索引色的点阵图。PNG 是一种比较新的图片格式，PNG-8 是非常好的 GIF 格式替代者，在可能的情况下，应该尽可能的使用 PNG-8 而不是 GIF，因为在相同的图片效果下，PNG-8 具有更小的文件体积。除此之外，PNG-8 还支持透明度的调节，而 GIF 并不支持。除非需要动画的支持，否则没有理由使用 GIF 而不是 PNG-8。
#### PNG-24
PNG-24 是无损的、使用直接色的点阵图。PNG-24 的优点在于它压缩了图片的数据，使得同样效果的图片，PNG-24 格式的文件大小要比 BMP 小得多。不过 PNG24 的图片还是要比 JPEG、GIF、PNG-8 大得多。
#### SVG
SVG 是无损的矢量图。SVG 是矢量图意味着 SVG 图片由直线和曲线以及绘制它们的方法组成。当放大 SVG 图片时，看到的还是线和曲线，而不会出现像素点。这意味着 SVG 图片在放大时，不会失真，所以它非常适合用来绘制 Logo、Icon 等。
#### WebP
WebP 是谷歌开发的一种新图片格式，WebP 是同时支持有损和无损压缩的、使用直接色的点阵图。从名字就可以看出来它是为 Web 而生的，什么叫为 Web 而生呢？就是说相同质量的图片，WebP 具有更小的文件体积。现在网站上充满了大量的图片，如果能够降低每一个图片的文件大小，那么将大大减少浏览器和服务器之间的数据传输量，进而降低访问延迟，提升访问体验。目前只有 Chrome 浏览器和 Opera 浏览器支持 WebP 格式，兼容性不太好。另外 WebP 格式的图片无法直接在 mac 上双击预览，需要安装相对应的插件，增加了使用成本。
### 如何对项目上的图片进行优化？
1. 不用图片。很多时候会使用到很多修饰类图片，其实这类修饰图片完全可以用 CSS 去代替，或者图标字体 iconfont 去代替。
2. 对于移动端来说，屏幕宽度就那么点，往往使用图片的某一部分，这个时候可以提前裁剪图片，请求裁剪好的小图。
3. 小图使用 base64 格式，减少 http 请求。
4. 将多个图标文件整合到一张图片中（雪碧图），减少 http 请求。
5. 选取正确的图片格式，在兼容性允许的情况下尽量使用 WebP 格式的图片。小图使用 PNG 或者 SVG 图片，照片使用 JPEG 格式。  
6. 必要的时候使用图片懒加载。



## HTTP请求
浏览器对同域的请求是有并发限制的，一般是 6 个，同一个域名并发请求多个资源往往会导致阻塞，可以使用以下方法：
1. 减少 HTTP 请求  
一个完整的 HTTP 请求需要经历 DNS 查找，TCP 握手，浏览器发出 HTTP 请求，服务器接收请求，服务器处理请求并发回响应，浏览器接收响应等过程。在文件很小的情况下发送请求是很不划算的，此时我们可以减少发送的请求来提升相应的速度，例如将小图片改成 base64 格式，合并请求等。
2. 使用 HTTP/2.0  
HTTP/2.0 版本协议，支持多路复用，理论上 HTTP/2.0 协议支持在同一个 TCP 连接上发送无限个 HTTP 请求，且这些请求的生命期可以重叠，大大减少请求时间，在使用 HTTP/2.0 后小图就没必要使用 base64 了。
3. 域名划分
通过将资源划分到不同的域名下，增加请求并行连接数。



## webpack 的优化
1. 压缩代码
2. 使用 contenthash 作为文件名称的一部分，利于浏览器缓存
3. tree-shaking  
4. 分割代码，将第三方插件或公共代码单独提取出来打包
5. 异步模块，按需加载（例如 Vue 路由懒加载）



## 使用 CDN 加载静态资源
内容分发网络（CDN）是一组分布在多个不同地理位置的 Web 服务器。我们都知道，当服务器离用户越远时，延迟越高。CDN 就是为了解决这一问题，在多个位置部署服务器，让用户离服务器更近，从而缩短请求时间。
### CDN 原理
当用户访问一个网站时，如果没有 CDN，过程是这样的：
1. 浏览器要将域名解析为 IP 地址，所以需要向本地 DNS 发出请求。
2. 本地 DNS 依次向根服务器、顶级域名服务器、权限服务器发出请求，得到网站服务器的 IP 地址。
3. 本地 DNS 将 IP 地址发回给浏览器，浏览器向网站服务器 IP 地址发出请求并得到资源。
![](./images/cdn_1.jpg)  

如果用户访问的网站部署了 CDN，过程是这样的：
1. 浏览器要将域名解析为 IP 地址，所以需要向本地 DNS 发出请求。
2. 本地 DNS 依次向根服务器、顶级域名服务器、权限服务器发出请求，得到全局负载均衡系统（GSLB）的 IP 地址。
3. 本地 DNS 再向 GSLB 发出请求，GSLB 的主要功能是根据本地 DNS 的 IP 地址判断用户的位置，筛选出距离用户较近的本地负载均衡系统（SLB），并将该 SLB 的 IP 地址作为结果返回给本地 DNS。
4. 本地 DNS 将 SLB 的 IP 地址发回给浏览器，浏览器向 SLB 发出请求。
5. SLB 根据浏览器请求的资源和地址，选出最优的缓存服务器发回给浏览器。
6. 浏览器再根据 SLB 发回的地址重定向到缓存服务器。
7. 如果缓存服务器有浏览器需要的资源，就将资源发回给浏览器。如果没有，就向源服务器请求资源，再发给浏览器并缓存在本地。
![](./images/cdn_2.jpg)



## 合理放置 CSS 和 JS 的位置
1. CSS 放在文件头部  
CSS 的加载不会阻塞 DOM 树的解析，但是会阻塞 DOM 树的渲染，也会阻塞 JS 的执行。我们将 CSS 放置在头部可以防止用户先看到没有样式的“丑陋”的页面，同时也可以尽快渲染出页面，呈现给用户。
2. 将 JS 放置到文件底部或加上 defer 属性  
JS 的执行会阻塞 DOM 树的解析，将 JS 放置到文件底部，等 HTML 和 CSS 解析完了再加载 JS 文件，可以尽早向用户呈现页面的内容。defer 的特性是并行下载，延迟执行，能够更快的呈现页面。defer 和 async 的区别见：[defer-和-async-的区别](html.html#defer-和-async-的区别)



## 使用缓存
1. index.html 使用协商缓存  
我们项目每次打包后 index 页面名称都是不变的，所以要使用协商缓存每次去服务器效验是否需要更新。
2. 静态资源使用 contenthash 做文件名称，并使用强缓存  
静态资源往往不太容易改变，webpack 在打包时我们使用 contenthash 作为文件名称后，一旦内容改变了，文件名称也就改变了，强缓存也就失效了，所以理论上静态资源的强缓存时间可以很大。
3. 动静分离，减少缓存失效的次数  
使用 webpack 打包时可以使用 splitChunks 进行分包，例如将引入的库和业务代码分离，这样库文件的缓存就不容易失效了。

缓存相关的知识详见：[http-缓存](/http.html#http-缓存)



## 减少重绘和重排
1. 重绘  
当重新生成渲染树后，就要将渲染树每个节点绘制到屏幕，这个过程叫重绘。例如改变字体颜色，会导致重绘。
2. 重排  
当改变 DOM 元素位置或大小时，会导致浏览器重新生成渲染树，这个过程叫重排，重排一定会导致重绘。

重排和重绘这两个操作都是非常昂贵的，因为 JavaScript 引擎线程与 GUI 渲染线程是互斥，它们同时只能一个在工作。可以使用以下策略来减少重绘和重排：
+ 用 JavaScript 修改样式时，最好不要直接写样式，而是替换 class 来改变样式。
+ 如果要对 DOM 元素执行一系列操作，可以将 DOM 元素脱离文档流，修改完成后，再将它带回文档。推荐使用隐藏元素（display:none）或文档碎片（DocumentFragment），都能很好的实现这个方案。
+ 如果要插入大量 DOM 不要循环插入，使用文档碎片（DocumentFragment）包裹只插入一次。
+ JS 获取 Layout 属性值（如：offsetLeft、scrollTop、getComputedStyle 等）会引起重排，因此不要在循环中反复获取值，而是使用缓存，例如：  
```js
for(let i = 0; i ＜ childs.Length; 1++) {
  childs[i].style.width = node.offsetWidth + "px";
}
```
优化后：
```js
const width = node.offsetWidth;
for(let i = 0; i ＜ childs.Length; 1++) {
  childs[i].style.width = width + "px";
}
```
+ 对于不使用的页面，使用 display: none 隐藏，使其不参与 Layout Tree 的计算，节省 render 时间，见：[display: none 对 浏览器 Layout Tree 的影响](https://github.com/NameWjp/blog/issues/101)


## 使用事件委托
事件委托利用了事件冒泡，只指定一个事件处理程序，就可以管理某一类型的所有事件。不过现在各类框架已经解决了这个问题，详见：[什么是事件委托](/js.html#什么是事件委托)



## 大量计算使用 Web Workers
Web Worker 使用其他工作线程从而独立于主线程之外，它可以执行任务而不干扰用户界面。一个 worker 可以将消息发送到创建它的 JavaScript 代码, 通过将消息发送到该代码指定的事件处理程序（反之亦然）。Web Worker 适用于那些处理纯数据，或者与浏览器 UI 无关的长时间运行脚本。



## DNS-prefetch 和 Preconnect
当浏览器打开跨域外链（跳转到别的网页）的时候必须先将该域名解析为 IP 地址，然后浏览器才能发出请求。此过程称为 DNS 解析，[DNS-prefetch](https://developer.mozilla.org/zh-CN/docs/Web/Performance/dns-prefetch) (DNS 预获取) 是尝试在请求资源之前解析域名，之后打开可以加快网页的加载速度，注意 dns-prefetch 仅对跨域域上的 DNS 查找有效，非跨域在打开网页的时候就已经解析过了，不需要多此一举，使用方式如下：
```html
<head>
    <link rel="dns-prefetch" href="https://fonts.gstatic.com/">
</head>
```
考虑将 dns-prefetch 与 preconnect（预连接）提示配对。尽管 dns-prefetch 仅执行 DNS 查找，但 preconnect 会建立与服务器的连接。如果站点是通过 HTTPS 服务的，则此过程包括 DNS 解析，建立 TCP 连接以及执行 TLS 握手，将两者结合起来可提供进一步减少跨域请求的感知延迟的机会，如下所示：
```html
<head>
    <link rel="preconnect" href="https://fonts.gstatic.com/" crossorigin>
    <link rel="dns-prefetch" href="https://fonts.gstatic.com/">
</head>
```
一些资源，如字体，以匿名模式加载。在这种情况下，使用 preconnect 应该设置 crossorigin 属性。如果您省略它，浏览器将只执行DNS查找。



## preload 和 prefetch
### preload
[preload](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/rel/preload) 是 `<link>` 标签 `rel` 属性的属性值，同时需要配合 `as` 属性使用。  

`as` 指定将要预加载的内容的类型，使得浏览器能够：  

1. 更精确地优化资源加载优先级。
2. 匹配未来的加载需求，在适当的情况下，重复利用同一资源。
3. 为资源应用正确的内容安全策略。
4. 为资源设置正确的 Accept 请求头。

看一下这个示例：
```html
<link rel="preload" href="https://cdn.jsdelivr.net/npm/vue/dist/vue.js" as="script">
```
这种做法将把 `<link>` 标签塞入一个预加载器中。这个预加载器在不阻塞页面 onload 事件的情况下，去加载资源。我们可以通过以下两个示例来作一个对比：
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <script>
      console.time('load')
  </script>
  <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
  <script src="https://cdn.bootcdn.net/ajax/libs/echarts/2.1.10/chart/bar.js"></script>
  <script src="https://unpkg.com/element-ui/lib/index.js"></script>
  <link rel="stylesheet" href="https://unpkg.com/element-ui/lib/theme-chalk/index.css">
</head>
<body>
<script>
window.onload = () => {
  console.timeEnd('load') // load: 1449.759033203125ms
}
</script>
</body>
</html>
```
上面这个示例从加载到触发 onload 事件需要大概 1400 ms 的时间。再看一下使用 preload 预加载的时间：
```html
<link rel="preload" href="https://cdn.jsdelivr.net/npm/vue/dist/vue.js" as="script">
<link rel="preload" href="https://cdn.bootcdn.net/ajax/libs/echarts/2.1.10/chart/bar.js" as="script">
<link rel="preload" href="https://unpkg.com/element-ui/lib/index.js" as="script">
<link rel="preload" href="https://unpkg.com/element-ui/lib/theme-chalk/index.css" as="style">

window.onload = () => {
  console.timeEnd('load') // load: 10.8818359375ms
}
```
用 preload 来加载资源，只需要 10 ms 就触发了 onload 事件，说明同样是下载文件，使用 preload 不会阻塞 onload 事件。注意这样加载的话无法在 onload 中使用这些文件提供的方法，适合加载一些无关紧要的文件。

### prefetch
[prefetch](https://web.dev/i18n/en/link-prefetch/) 和 `preload` 不同，使用 `prefetch` 属性指定的资源将在浏览器空闲时间下下载，使用方式如下：
```html
<head>
  <link rel="prefetch" href="/articles/" as="document">
</head>
```
该 as 属性帮助浏览器设置正确的标头，并确定资源是否已在缓存中。此属性的示例值包括：document、script、style、font、image 等。

### 区别
+ preload 是告诉浏览器页面必定需要的资源，浏览器一定会加载这些资源。
+ prefetch 是告诉浏览器页面可能需要的资源，浏览器不一定会加载这些资源。
+ 对于当前页面很有必要的资源使用 preload，对于可能在将来的页面中使用的资源使用 prefetch。



## 开启 gzip 压缩
gzip 是网站压缩加速的一种技术，对于开启后可以加快我们网站的打开速度，原理是经过服务器压缩，客户端浏览器快速解压的原理，可以大大减少了网站的流量。nginx 开启 gzip 配置如下：
```
server{
  gzip on; # 是否开启gzip
  gzip_buffers 32 4K; # 用于处理请求压缩的缓冲区数量和大小
  gzip_comp_level 6; # 推荐6 压缩级别(级别越高,压的越小,越浪费CPU计算资源)
  gzip_min_length 1k; # 开始压缩的最小长度(再小就不要压缩了,意义不在)
  gzip_types application/javascript text/css text/xml; # 对哪些类型的文件用压缩 如txt,xml,html ,css
  gzip_disable "MSIE [1-6]\."; #正则匹配UA，配置禁用gzip条件。此处表示ie6及以下不启用gzip（因为ie低版本不支持）
  gzip_http_version 1.1; # 开始压缩的http协议版本(可以不设置,目前几乎全是1.1协议)
  gzip_vary on; # 是否传输gzip压缩标志
}
```



## Vue 优化
### 合理拆分组件
在某些业务场景中，我们需要渲染很多 input 输入框，如果写法不对，则会导致性能问题，例如：
```vue
<template>
  <div>
    <div v-for="(data, index) in tableData" :key="index">
      <div v-for="key in keys" :key="key" style="display: inline-block;width: 20%;">
        <el-input
          :value="data[key]"
          @input="v => handleInputChange(index, key, v)"
        />
      </div>
    </div>
  </div>
</template>
```
这里渲染了很多的 input，在每个 input 输入时，修改 data 数据源来更新数据。这样写看似没有什么问题，其实当 data 的数据量大的时候会出现性能问题，因为这里的组件粒度太大了，每个 input 输入后，都会全量出发这个组件的 diff，所以我们可以换个写法：
```vue
// 父组件
<template>
  <div>
    <div v-for="(data, index) in tableData" :key="index">
      <Child :handle-input-change="(key, v) => handleInputChange(index, key, v)" :data="data" :keys="keys" />
    </div>
  </div>
</template>

// 子组件
<template>
  <div>
    <div v-for="key in keys" :key="key" style="display: inline-block;width: 20%;">
      <el-input
        :value="data[key]"
        @input="v => handleInputChange(key, v)"
      />
    </div>
  </div>
</template>
```
这里我们只是简单的将代码抽出去独立成一份组件，却会带来巨大的性能提升。无论 data 数据量有多大，input 输入变化时，都只会进行一个 Child 组件的 diff。实际效果可以参考：[https://github.com/NameWjp/vue-element-admin/blob/master/src/views/demo/index.vue](https://github.com/NameWjp/vue-element-admin/blob/master/src/views/demo/index.vue)

参考链接:  [Vue中合理拆分组件对性能的影响](https://github.com/NameWjp/blog/issues/123)



## React 优化
### React.memo
类似的还有类组件的 PureComponent、ShouldComponentUpdate，它们都是通过浅比较来跳过更新。当然，memo并不是免费的，不然 React 为什么不直接默认给所有组件都包裹一下，shallowEqual 会去挨个遍历 props 并进行比较，这个成本可要比默认的全等策略大多了。

### useMemo、useCallback 等缓存策略
使用 useMemo、useCallback 主要有以下两个场景
1. 避免耗时的逻辑重复计算
只在某个状态变化才计算可以避免一些耗时的重复计算。
2. 防止子组件的缓存击穿
如果子组件使用 useMemo 包裹了，但是传递的 props 中的某个属性每次都是一个新对象，就会照成缓存无效，使用 useMemo 包裹可以解决这个问题。

### 状态下放
例如以下代码：
```js
const Child = () => {
  console.log('child render');

  return <div>I am child</div>;
};

export default function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <button onClick={() => setCount(count + 1)}>update</button>
      <Child />
    </>
  );
}
```
我们可以看到 App 组件更新的原因是内部的 count 发生了变化，而 Child 虽然跟 count 没有任何关系，但是由于同属于一个组件，也被带着重新渲染了。我们稍微改造一下，把count及其相关的逻辑抽离到另外一个子组件Counter中：
```js
const Child = () => {
  console.log('child render');

  return <div>I am child</div>;
};

const Counter = () => {
  const [count, setCount] = useState(0);

  return <button onClick={() => setCount(count + 1)}>update</button>;
}

export default function App() {
  return (
    <>
      <Counter />
      <Child />
    </>
  );
}
```
实际测试一下上面的代码，虽然只是简单调整了一下组件结构，Child 居然不再重新渲染了。原因就在于变化的内容现在在 Counter 内部，App 组件会由于满足了默认的性能优化策略不再重新渲染，因此传递给 Child 的 props 就不会发生变化，从而 Child 也就满足了默认的性能优化策略，这种逻辑是具有传递性的，即如果 Child 还有子组件，也会因为 Child 没有重渲染，继续满足默认性能优化策略而都被跳过。所以在平时的开发中，建议要避免大组件，将组件的粒度控制要尽可能的细。

### 内容提升
比如以下例子，状态下放的方法就不适应了，因为 Child 的外层 div 中也用到了count：
```js
const Child = () => {
  console.log('child render');

  return <div>I am child</div>;
};

export default function App() {
  const [count, setCount] = useState(0);

  return (
    <div classname={count}>
        <button onClick={() => setCount(count + 1)}>update</button>
        <Child />
    </div>
  );
}
```
这时候就可以用另外一种方法：内容提升。简而言之就是将 Child 以 children 的方式进行传递，从而将不变的内容提取到 App 中，这样 Counter 更新不会影响到 Child：
```js
const Child = () => {
  console.log('child render');

  return <div>I am child</div>;
};

const Counter = ({children}) => {
  const [count, setCount] = useState(0);

  return (
      <div classname={count}>
        <button onClick={() => setCount(count + 1)}>update</button>
        {children}
      </div>
   );
}

export default function App() {
  return (
    <Counter>
      <Child />
    </Counter>
  );
}
```
Child 现在是作为 Counter 组件的 props，props 的内容是在 App 组件中传递的，因此可以理解成 Child 依然是直接依赖于 App 组件，由于 App 没有重新渲染，因此 Child 也满足了默认的性能优化策略。



### useReducer 加 useContext 组合
使用 useReducer 加 useContext 组合可以避免某些场景的重渲染，例如：顶层和最底层的组件都使用了一个状态，每次顶层改变这个状态时，都会重新渲染整颗树，这个时候可以使用下面的办法来避免重渲染：
```jsx
import React, { useReducer, useContext, createContext } from 'react';

// 创建一个上下文
const StateContext = createContext();

// 定义reducer函数
const reducer = (state, action) => {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    default:
      return state;
  }
};

// 创建一个包装组件，它将状态逻辑封装在内部
const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, { count: 0 });

  return (
    <StateContext.Provider value={{ state, dispatch }}>
      {children}
    </StateContext.Provider>
  );
};

// 使用上下文的组件
const Counter = () => {
  const { state, dispatch } = useContext(StateContext);
  return (
    <div>
      Count: {state.count}
      <button onClick={() => dispatch({ type: 'increment' })}>+</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
    </div>
  );
};

// 子组件
const Child = () => {
  console.log('child render');

  return <div>I am child</div>;
};

// 应用程序组件
const App = () => {
  return (
    <StateProvider>
      <Counter />
      <Child />
    </StateProvider>
  );
};

export default App;
```
这里首先通过状态下放，将状态抽离到外部，防止整颗树渲染。之后利用内容提升，将其余子元素通过 children 传递给 StateProvider 组件。这样可以达到顶层和底层组件共享一个状态，状态变化时只更新这两个组件，不会导致整颗树重新渲染。



### 使用社区的轮子
例如：[use-context-selector](https://github.com/dai-shi/use-context-selector)、[jotai](https://github.com/pmndrs/jotai)、[react-tracked](https://github.com/dai-shi/react-tracked)



## Hybrid App 下的性能优化
1. WebView 启动优化  
在 App 启动的时候生成一个 WebView 并让其全局化。或者更彻底一点，把 WebView 的实例保存在一个公共的池中，当用户访问这个 WebView 时，直接从公共池取出来加载网页，而不是重新初始化一个新的 WebView。
2. 离线包  
离线包就是将 HTML、JavaScript、CSS 等页面内静态资源打包到一个压缩包内，App 预先内置该压缩包到本地，然后当用户在客户端打开 H5 页面时，直接从本地加载。



## 首屏渲染白屏时间如何优化
### 如何分析首屏加载CSR的性能？

有以下几种方法进行分析：

1. network（浏览器->DevTools）
2. performance （浏览器->DevTools）
3. lighthouse（浏览器->DevTools）
4. sentry（第三方平台）
5. [**webPageTest**](https://webpagetest.org/) 更全面，更详细，更强大的页面分析
   具体怎么操作我就不赘述了，各位自行去看。

### 分析后如何找出CSR性能瓶颈？ 

找出上面分析出对性能影响最大的点，从这个点着手优化。

### 如何解决CSR性能瓶颈？ 从CSR方向来讲的话，基本就两个方向了

1. **网络层面**：
   从网络方面来讲，就是减少HTTP请求的次数，以及减小请求体积，这里就简单聊几点
   a). 将多次请求合并到一次请求（ajax、精灵图，文件合并等）
   b). 页面懒加载应该也可以算在这个方面。
   c). 缓存住一些不经常改动的文件或内容将请求拦截（service worker）
   b). 文件内容压缩
   e). 静态资源CDN也是方式之一
   f). 升级到 http2
2. **渲染层面**
   a). 骨架屏，起码能让用户有打开了网页的感觉
   b). 图片懒加载
   c). 防抖节流
   d). 代码层面的改善吧，很有可能是某些坏代码产生的

### 有没有其他渲染方案可以解决CSR当前问题，他的原理是什么？   

SSR。就是将框架代码提前在服务端跑一遍，不过一般除非对SEO要求比较高或者你们公司比较有钱，否则不太会去使用，因为比较占用服务器的资源。