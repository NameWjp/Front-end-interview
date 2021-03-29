## webpack Loader 的加载顺序
webpack 的 Loader 加载是从有往做依次加载的，例如：
```js
{
  test: /\.less$/,
  use: ['style-loader', 'css-loader', 'less-loader']
}
```
至于为啥 Webpack 选择从右往左加载，只是 Webpack 选择了 compose（从右往左组合函数） 方式，而不是 pipe（从左向右组合函数） 的方式而已，在技术上实现从左往右也不会有难度。
