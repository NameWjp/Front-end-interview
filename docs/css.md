## padding-top 和 margin-top 的百分比相对于什么，为什么
相对于自身的 width。  
原因：我们认为，正常流中的大多数元素都会足够高以包含其后代元素（包括外边距），如果一个元素的上下外边距是父元素的 height 的百分数，就可能导致一个无限循环，父元素的 height 会增加，以适应后代元素上下外边距的增加，而相应的，上下外边距因为父元素 height 的增加也会增加，如果循环。

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
