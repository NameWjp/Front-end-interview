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