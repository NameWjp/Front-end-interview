## BEM 命名规范
以往开发组件，我们都用 “重名概率小” 或者干脆起个 “当时认为是独一无二的名字” 来保证样式不冲突，这是不可靠的。

理想的状态下，我们开发一套组件的过程中，我们应该可以随意的为其中元素进行命名，而不必担心它是否与组件以外的样式发生冲突。

BEM解决这一问题的思路在于，由于项目开发中，每个组件都是唯一无二的，其名字也是独一无二的，组件内部元素的名字都加上组件名，并用元素的名字作为选择器，自然组件内的样式就不会与组件外的样式冲突了。

这是通过组件名的唯一性来保证选择器的唯一性，从而保证样式不会污染到组件外。

这也可以看作是一种 “硬性约束”，因为一般来说，我们的组件会放置在同一目录下，那么操作系统中，同一目录下文件名必须唯一，这一点也就确保了组件之间不会冲突。

BEM 的命名规矩很容易记：block-name__element-name--modifier-name，也就是模块名 + 元素名 + 修饰器名。

例子：
```less
.article {
    max-width: 1200px;
    &__body {
        padding: 20px;
    }
    &__button {
        padding: 5px 8px;
        &--primary {background: blue;}
        &--success {background: green;}
    }
}
```
参考：[BEM解决的问题](https://bemcss.com/)



## padding-top 和 margin-top 的百分比相对于什么，为什么
相对于父元素的 width。  
原因：我们认为，正常流中的大多数元素都会足够高以包含其后代元素（包括外边距），如果一个元素的上下外边距是父元素的 height 的百分数，就可能导致一个无限循环，父元素的 height 会增加，以适应后代元素上下外边距的增加，而相应的，上下外边距因为父元素 height 的增加也会增加，无限循环。  

一个比较经典的应用场景，移动端图片展示，盒子设高度为 0，宽度为 100%，padding-top 设置为 100%，这样这个盒子的高度始终会和盒子的宽度一样，之后里面的图片尺寸按照 1:1 设计，宽高都设置为 100% 就可以完美显示了。



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



## 聊聊伪类和伪元素（伪对象）
### 引入原因
首先 css 引入伪类和伪元素概念是为了格式化文档树以外的信息。也就是说，伪类和伪元素是用来修饰不在文档树中的部分，比如，一句话中的第一个字母，或者是列表中的第一个元素。
### 区别
#### 伪类
伪类用于当已有元素处于的某个状态时，为其添加对应的样式，这个状态是根据用户行为而动态变化的。比如说，当用户悬停在指定的元素时，我们可以通过 :hover 来描述这个元素的状态。虽然它和普通的 css 类相似，可以为已有的元素添加样式，但是它只有处于 dom 树无法描述的状态下才能为元素添加样式，所以将其称为伪类。
#### 伪元素
伪元素用于创建一些不在文档树中的元素，并为其添加样式。比如说，我们可以通过 ::before 来在一个元素前增加一些文本，并为这些文本添加样式。虽然用户可以看到这些文本，但是这些文本实际上不在文档树中。另外需要注意的是 css3 为了区分伪类和伪元素，要求伪元素使用双冒号（::）来表示，以此来区分伪类和伪元素。



## flex 属性的默认值
flex 是一个简写属性，包含 flex-grow、flex-shrink、flex-basis 三个属性，其初始值分别为：flex-grow：0、flex-shrink：1、flex-basis：auto。需要注意的是 flex-shrink 属性仅在默认宽度之和大于容器的时候才会发生收缩。



## fixed 元素相对于什么定位
css3 之前，fixed 只相对于屏幕视口（viewport）定位，需要注意的是，如果是 iframe 内的 fixed 元素，则是相对于 iframe 定位的。css3 之后，如果 fixed 元素的父元素的 transform 不为 none，则会相对于该父元素定位。