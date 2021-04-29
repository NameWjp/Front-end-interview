## padding-top 和 margin-top 的百分比相对于什么，为什么
相对于自身的 width。  
原因：我们认为，正常流中的大多数元素都会足够高以包含其后代元素（包括外边距），如果一个元素的上下外边距是父元素的 height 的百分数，就可能导致一个无限循环，父元素的 height 会增加，以适应后代元素上下外边距的增加，而相应的，上下外边距因为父元素 height 的增加也会增加，无限循环。  

一个比较经典的应用场景，移动端图片展示，盒子设高度为 0，宽度为 100%，padding-top 设置为 100%，这样这个盒子的高度始终会和盒子的宽度一样，图片按 1:1 的比例显示就可以在任意机型上完美显示。



## 文字和图片并排居中
1. 利用 flex 布局，父元素添加属性：  
```css
.parent {
  display: flex;
  justify-content: center;
  align-items: center;
}
```
2. 利用 vertical-align 属性居中：
```css
.parent {
  line-height: 200px;
  font-size: 0;
}
.img {
  vertical-align: middle;
}
.text {
  vertical-align: middle;
  font-size: 16px;
}
```
通过设置 vertical-align:middle 对文字和图片进行垂直居中时，父元素需要设置 font-size: 0，因为 vertical-align:middle 是将子元素的中点与父元素的 `baseline + x-height / 2` 的位置进行对齐的，设置字号为 0 可以保证让这些线的位置都重合在中点。  
推荐文章：[https://segmentfault.com/a/1190000023944126](https://segmentfault.com/a/1190000023944126)



## 文本超出部分显示省略号
### 单行
```css
overflow: hidden;
text-overflow: ellipsis;
white-space: nowrap;
```
### 多行（需要 webkit 内核浏览器的支持）
```css
display: -webkit-box;
-webkit-box-orient: vertical;
-webkit-line-clamp: 3; // 最多显示几行
overflow: hidden;
```



## 什么是 BFC
块格式化上下文（Block Formatting Context，BFC） 是 Web 页面的可视 CSS 渲染的一部分，是块盒子的布局过程发生的区域，也是浮动元素与其他元素交互的区域。BFC元素特性表现为，内部子元素再怎么翻江倒海，翻云覆雨都不会影响外部的元素。常用来避免 margin 穿透、清除浮动等问题。触发 BFC 的常用方法如下：
+ float 的值不为 none。
+ overflow的值为 auto, scroll 或 hidden。
+ display的值为 table-cell, table-caption, inline-block 中的任何一个。
+ position的值不为 relative 和 static。



## css 作用域隔离方法
+ 命名空间，加不同的前缀
+ module，例如 vue 的 scoped，css-loader 的 modules 模式
+ css-in-js，直接写成内联样式
+ Shadow DOM，其实就是 web components，作用域隔离