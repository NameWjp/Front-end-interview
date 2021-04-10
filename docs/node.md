## package.json 依赖项版本号前面的 ~ ^ 有什么用？
+ ~ 会匹配最近的小版本依赖包，比如~1.2.3会匹配所有1.2.x版本，但是不包括1.3.0
+ ^ 会匹配最新的大版本依赖包，比如^1.2.3会匹配所有1.x.x的包，包括1.3.0，但是不包括2.0.0
+ 不写前缀，只写版本号就不会有更新问题（只是说你这个库的版本不会变，但是如果第三方的依赖库的依赖变化了，你项目的依赖也会变）



## 项目中使用 package-lock.json 锁版本问题
package-lock.json 的出现是为了解决不同情况下安装包不一致的问题，在执行 `npm install` 的时候，会根据 package.json 文件安装依赖，生成对应依赖版本的 package-lock.json 文件，里面详细描述了每个依赖包的版本。之后比如其他组员把代码拉下来后，执行 `npm ci` 就会根据 package-lock.json 去下载依赖包，这样就保证了依赖库的不变。



## peerDependencies 有什么用
假设一个项目有如下依赖项：
```js
{
  "dependencies": {
    "a": "1.0.0",
    "b": "1.0.0",
    "c": "1.0.0",
  }
}
```
并且 b 和 c 也各自有依赖项 a。那么下载依赖后的项目目录是这样的：
```js
.
├── project
│   └── node_modules
│       ├── a
│       ├── b
│       │   └── nodule_modules
│       │       └── a
│       └── c
│       │   └── nodule_modules
│       │       └── a
```
这样会有一个问题，依赖 a 会被重复安装 3 次。这时可以使用 `peerDependencies`，它可以避免相同的依赖被重复安装。  
现在只需要在 b 和 c 的 package.json 文件加上以下代码：  
```js
{
  "peerDependencies": {
    "a": "1.0.0"
  }
}
```
这样在安装时就可以避免重复安装依赖了。现在下载依赖后的目录为：
```js
.
├── helloWorld
│   └── node_modules
│       ├── a
│       ├── b
│       └── c
```
+ 如果用户显式依赖了核心库，则可以忽略各插件的 `peerDependency` 声明；
+ 如果用户没有显式依赖核心库，则按照插件 `peerDependencies` 中声明的版本将库安装到项目根目录中；  

注意，这里由于根据 `peerDependencies` 定义了 a 的版本，其它依赖于 a 的库有可能因为版本不兼容报错，这个时候就需要人为去排查原因。



## require 原理
当 Node 遇到 require(X) 时，按下面的顺序处理。
1. 如果 X 是内置模块（比如 require('http'）)  
a. 返回该模块。  
b. 不再继续执行。  
2. 如果 X 以 "./" 或者 "/" 或者 "../" 开头  
a. 根据 X 所在的父模块，确定 X 的绝对路径。  
b. 将 X 当成文件，依次查找下面文件，只要其中有一个存在，就返回该文件，不再继续执行。  
`X`、`X.js`、`X.json`、`X.node`  
c. 将 X 当成目录，依次查找下面文件，只要其中有一个存在，就返回该文件，不再继续执行。  
`X/package.json（main字段）`、`X/index.js`、`X/index.json`、`X/index.node`  
3. 如果 X 不带路径  
a. 根据 X 所在的父模块，确定 X 可能的安装目录（名称为 node_modules）。  
b. 依次在每个目录中，将 X 当成文件名或目录名加载。  
4. 抛出 "not found"

参考资料：[http://www.ruanyifeng.com/blog/2015/05/require.html](http://www.ruanyifeng.com/blog/2015/05/require.html)