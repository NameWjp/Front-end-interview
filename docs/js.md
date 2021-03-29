## js里的最大安全数是多少，为什么
js里采用 IEEE754 标准，采用双精度存储数值，存储结构如下。  
![](./images/js_number_save.png)
由于指数最大可以偏移 Math.pow(2, 11) 位，大于最大可表示的 52 位尾数，所以最大值由尾数 52 位决定。  
又因为尾数部分在规约形式下第一位总为 1 可以不写，所以 js 最大安全数为 Math.pow(2,53) - 1（64位浮点的后52位+被省略的1位）。不过由于 ES6 的普及，出现了新的数据类型 BigInt，它可以表示任意大的整数，在一定程度上 js 也就没有最大安全数这个概念了。

## 为什么 0.1 + 0.2 与 0.3 不相等，如何解决
js里采用 IEEE754 标准，采用双精度存储数值，存储结构如下。  
![](./images/js_number_save.png)
由于 0.1 和 0.2 转化成二进制的时候会无限循环。  
```js
0.1 -> 0.0001100110011001...(无限循环)
0.2 -> 0.0011001100110011...(无限循环)
```
所以必然会存在精度丢失的问题。  
解决方法：写一个公共方法，在计算的时候将 0.1 等小数转化整数，运算完成后再将其转化成小数。

## commonjs 和 es6 的区别
CommonJS 是一种模块规范，最初被应用于 Nodejs，成为 Nodejs 的模块规范。运行在浏览器端的 JavaScript 由于也缺少类似的规范，在 ES6 出来之前，前端也实现了一套相同的模块规范 (例如: AMD)，用来对前端模块进行管理。自 ES6 起，引入了一套新的 ES6 Module 规范，在语言标准的层面上实现了模块功能，而且实现得相当简单，有望成为浏览器和服务器通用的模块解决方案。但目前浏览器对 ES6 Module 兼容还不太好，我们平时在 Webpack 中使用的 export 和 import，会经过 Babel 转换为 CommonJS 规范。在使用上的差别主要有：
1. CommonJS 模块输出的是一个值的拷贝，ES6 模块输出的是值的引用。
2. CommonJS 模块是运行时加载，ES6 模块是编译时输出接口。
3. CommonJs 是单个值导出，ES6 Module可以导出多个。
4. CommonJs 是动态语法可以写在判断里，ES6 Module 静态语法只能写在顶层。
5. CommonJs 的 this 是当前模块，ES6 Module的 this 是 undefined。

## 为什么浏览器的 JS 线程和 UI 线程是互斥的？
由于 JavaScript 是可操纵 DOM 的,如果在修改这些元素属性同时渲染界面（即 JavaScript 线程和 UI 线程同时运行）,那么渲染线程前后获得的元素数据就可能不一致了。  
比如你使用 JS 操作了 DOM，如果 JS 线程和 UI 线程是并行的，那么下一行 JS 代码获取的 DOM 相关信息很可能还没有更新，不利于编程。

## Virtual Dom 的优势在哪里
JS 线程和 UI 线程是互斥的，JS 代码调用 DOM API 必须挂起 JS 线程、转换传入参数数据、激活 UI 线程，DOM 重绘后再转换可能有的返回值，最后激活 JS 线程并继续执行。  
若有频繁的 DOM API 调用，引擎间切换的代价将迅速积累。若其中有强制重绘的 DOM API 调用，重新计算布局、重新绘制图像会引起更大的性能消耗。  
VDOM 的本质是一种描述真实 DOM 的数据结构，相比直接修改 DOM 有以下优点：  
1. 虚拟 DOM 进行频繁修改，然后一次性比较并修改真实 DOM 中需要改的部分，最后在真实 DOM 中进行排版与重绘，减少过多 DOM 节点排版与重绘损耗
2. 虚拟 DOM 有效降低大面积真实 DOM 的重绘与排版，因为最终与真实 DOM 比较差异，可以只渲染局部

## 介绍下 sku 算法的实现
1. 构建一个 sku 数组用于渲染
```js
skuList = [
    {
        name: 颜色,
        list: [白色，黑色]
    },
    {
        name: 重量,
        list: [5, 10]
    }
]
```
2. 构建一个 map 用于确定库存，key 是用户可能选择的 sku 组合，值是库存
```js
skuMap = {
    // 已知的
    白色,5: 1,
    白色,10: 1,
    黑色,5: 1,
    黑色,10: 1,
    // 需要算法计算出来的
    白色, : 2,
    黑色, : 2,
    5, : 2,
    10, : 2,
     ,白色: 2,
     ,黑色: 2,
     ,5: 2,
     ,10: 2,
}

算法如下：
/**
 * 列出目标数组的所有任意个数的组合
 * [a, b] =>
 * [
 *  [a,  ],
 *  [ , b],
 *  [ ,  ],
 *  [a, b]
 * ]
 * @param {Array} targetArr
 */
function arrayCombine(targetArr) {
  const resultArr = [];
  for (let n = 0; n <= targetArr.length; n += 1) {
    const flagArrs = getFlagArrs(targetArr.length, n);
    while (flagArrs.length) {
      const flagArr = flagArrs.shift();
      const combArr = Array(targetArr.length);
      for (let i = 0; i < targetArr.length; i += 1) {
        // 为零不做处理
        if (flagArr[i]) {
          combArr[i] = targetArr[i];
        }
      }
      resultArr.push(combArr);
    }
  }
  return resultArr;
}

/**
 * 类型从m个位置中放入n个数，列出所有可能的排列方式(排列组合C42)
 * 实现思路：
 *  首先初始化，将数组前n个元素置1，表示第一个组合为前n个数。
 *  然后从左到右扫描数组元素值的“10”组合，找到第一个“10”组合后将其变为“01”组合；
 *  同时将其左边的所有“1”全部移动到数组的最左端。
 *  当第一个“1”移动到数组的m-n的位置，即n个“1”全部移动到最右端时，就得到了最后一个组合。
 * getFlagArrs(4, 2) =>
 * [
 *  [1, 1, 0, 0],
 *  [1, 0, 1, 0],
 *  [0, 1, 1, 0],
 *  [1, 0, 0, 1],
 *  [0, 1, 0, 1],
 *  [0, 0, 1, 1]
 * ]
 * @param {Number} m
 * @param {Number} n
 */
function getFlagArrs(m, n) {
  const flagArrs = [];
  const flagArr = [];
  let isEnd = false;
  for (let i = 0; i < m; i += 1) {
    flagArr[i] = i < n ? 1 : 0;
  }
  flagArrs.push(flagArr.concat());
  // 当n不等于0并且m大于n的时候进入
  if (n && m > n) {
    while (!isEnd) {
      let leftCnt = 0;
      for (let u = 0; u < m - 1; u += 1) {
        if (flagArr[u] === 1 && flagArr[u + 1] === 0) {
          for (let j = 0; j < u; j += 1) {
            flagArr[j] = j < leftCnt ? 1 : 0;
          }
          flagArr[u] = 0;
          flagArr[u + 1] = 1;
          const aTmp = flagArr.concat();
          flagArrs.push(aTmp);
          if (aTmp.slice(-n).join('').indexOf('0') === -1) {
            isEnd = true;
          }
          break;
        }
        if (flagArr[u] === 1) {
          leftCnt += 1;
        }
      }
    }
  }
  return flagArrs;
}
```

## 什么是循环依赖？
"循环加载"（circular dependency）指的是，a脚本的执行依赖b脚本，而b脚本的执行又依赖a脚本。目前前端主要有两种加载模式方式，分别是：CommonJS 和 ES6 模块加载，webpack 在打包的时候会根据配置模拟两种加载模式去加载。
1. CommonJS 模块加载
CommonJS 模块的重要特性是加载时执行，即脚本代码在require的时候，就会全部执行。CommonJS 的做法是，一旦出现某个模块被"循环加载"，就只输出已经执行的部分，还未执行的部分不会输出。
2. ES6 模块加载
ES6 模块的运行机制与 CommonJS 不一样，它遇到模块加载命令import时，不会去执行模块，而是只生成一个引用。等到真的需要用到时，再到模块里面去取值。ES6 根本不会关心是否发生了"循环加载"，只是生成一个指向被加载模块的引用，需要开发者自己保证，真正取值的时候能够取到值。 
 
tips：建议阅读阮一峰的文章 [http://www.ruanyifeng.com/blog/2015/11/circular-dependency.html](http://www.ruanyifeng.com/blog/2015/11/circular-dependency.html)

## cookie token 和 session 的区别
它们出现的原因是因为 http 是无状态的，所以需要一种手段去标示哪些 http 请求是那个用户发送的。  
1. session 存储于服务器，可以理解为一个状态列表，拥有一个唯一识别符号 sessionId，通常存放于 cookie 中。服务器收到 cookie 后解析出 sessionId，再去 session 列表中查找，才能找到相应 session。所以 session 的实现依赖于 cookie。
2. cookie 类似一个令牌，装有 sessionId，存储在客户端，浏览器通常会自动添加，存储大小为 4kb。
3. token 也类似一个令牌，无状态，用户信息都被加密到 token 中，服务器收到 token 后解密就可知道是哪个用户。需要开发者手动添加。
4. jwt 只是一个跨域认证的方案

## xss 和 csrf 的区别
1. xss 攻击  
xss攻击的本质是代码注入，利用浏览器拼接成任意的 javascript 去执行自己想做的事情。防御的方法很简单，不要相信用户的任何输入，对于用户的任何输入要进行检查、过滤和转义。
2. csrf 攻击  
csrf攻击是利用浏览器可以跨域发送请求（ajax 请求会跨域，普通的表单提交和资源获取不会），而每个 http 请求浏览器都会自动携带对应域名下的 cookie 的特性。如果服务端的认证方式完全基于 cookie，那么这条请求就可以达到伪装用户的目的。常见的防御手段是放弃 session 的用户认证，采用 token 的认证方式，在每个 http 的请求头上携带 token，服务器拿到 token 去效验合法性。

## 防抖和节流函数
防抖：在指定的时间内不执行才会调用。例如调整浏览器窗口大小时，`resize` 次数过于频繁，但我们只需要调整完窗口后再计算，这里就可以用防抖处理。    
节流：控制调用的频率，多长时间内只能调用一次。例如商城里面的放大镜效果，`onmouseover` 触发过于频繁，这时就需要使用节流控制调用频率。

```js
/**
 * 防抖函数
 * 注意，fn不要使用箭头函数
 * @param {Function} fn
 * @param {Number} delay
 */
function debounce(fn, delay) {
  let timeId;
  return function(...args) {
    if (timeId) {
      clearTimeout(timeId)
    }
    timeId = setTimeout(() => {
      fn.call(this, ...args);
      timeId = null;
    }, delay);
  }
}

/**
 * 节流函数
 * 开始执行触发，离开后不触发
 * @param {Function} fn
 * @param {Number} delay
 */
function throttle(fn, delay) {
  let previous = 0;
  return function(...args) {
    const now = +new Date();
    if (now - previous > delay) {
      fn.call(this, ...args);
      previous = now;
    }
  }
}
```
在使用上可以使用 lodash 库提供的防抖和节流，功能更加完善。

## async 和 Generator 的关系，如何使用 Generator 实现 async
async 语法是内置自动执行器的 Generator 的语法糖。  
利用 `Generator` 实现 `async/await` 主要就是用一个函数（自动执行器）来包装 `Generator`，从而实现自动执行 `Generator`。  
每次执行 `next()` 返回的 `{ value, done }` 中的 value 是一个 Promise，所以要等它执行完毕后再执行下一次 `next()`，即在它的后面加一个 `then()` 函数，并且在 `then()` 函数中执行 next()。  
```js
function t(data) {
  return new Promise(r => setTimeout(() => r(data), 100))
}

function *test() {
  const data1 = yield t(1)
  console.log(data1)
  const data2 = yield t(2)
  console.log(data2)
  return 3
}

function async(generator) {
  return new Promise((resolve, reject) => {
    const gen = generator()

    function step(nextFun) {
      // 每一次 next() 都是返回这样的数据 { value: xx, done: false }，结束时 done 为 true
      let next
      try {
        // 如果 generator() 执行报错，需要 reject 给外面的 catch 函数
        next = nextFun()
      } catch(e) {
        return reject(e)
      }

      // done: true 代表 generator() 结束了
      if (next.done) {
        return resolve(next.value)
      }

      Promise.resolve(next.value).then(
        (val) => step(() => gen.next(val)), // 通过 next(val) 将 val 传给 yield 后面的变量 
        (err) => step(() => gen.trhow(err)),
      )
    }

    step(() => gen.next())
  })
}

// 1 2 3
async(test).then(val => console.log(val))
```

## 函数柯里化的优点和实现
柯里化的优点如下：
1. 参数复用
2. 提前返回
3. 延迟计算/运行
实现如下：
```js
function sub_curry(fn, ...params) {
  return function(...newParams) {
    return fn.apply(this, [...params, ...newParams]);
  };
}

function curry(fn, length) {
  length = length || fn.length;
  
  return function(...params) {
    if (params.length < length) {
      return curry(sub_curry.apply(this, [fn, ...params]), length - params.length);
    } else {
      return fn.apply(this, params);
    }
  };
}
```
在使用上可以使用 lodash 库提供的 curry 函数，功能更加完善。

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

## DOM 事件触发流程
1. 捕获阶段：从父节点到目标节点
2. 目标阶段：在目标元素上触发事件
3. 冒泡阶段：从目标节点到父节点

## target 和 currentTarget 区别
+ event.target  
返回触发事件的元素（例如用户点击时会返回点击位置最底层的 dom 元素）
+ event.currentTarget
返回绑定事件的元素

## 什么是事件委托
事件委托利用了事件冒泡，只指定一个事件处理程序，就可以管理某一类型的所有事件。使用事件委托的一个好处就是可以节省内存。
```js
<ul>
  <li>苹果</li>
  <li>香蕉</li>
  <li>凤梨</li>
</ul>

// good（这里如果存在嵌套的多个元素，可以利用 parentNode 属性从 event.target 一直往上找，找到需要的元素为止）
document.querySelector('ul').onclick = (event) => {
  let target = event.target
  if (target.nodeName === 'LI') {
    console.log(target.innerHTML)
  }
}

// bad
document.querySelectorAll('li').forEach((e) => {
  e.onclick = function() {
    console.log(this.innerHTML)
  }
}) 
```
最后说一下其实在 Vue 和 React 里大多数情况是不需要事件代理的，只要保证 for 循环绑定的是一个函数就不会有内存浪费的问题。而且 React 有自己的一套事件机制，我们使用的都是由 React 合成的事件，React 内部会把所有的事件绑定到 document 上，采用的就是事件代理的思想，在框架层面已经帮我们优化了。

## new 一个对象内部做了什么？
```js
function Test(){}
const test = new Test()
```
1. 创建一个新对象
```js
const obj = {}
```
2. 设置新对象的 constructor 属性为构造函数的名称，设置新对象的 `__proto__` 属性指向构造函数的 prototype 对象
```js
obj.constructor = Test
obj.__proto__ = Test.prototype
```
3. 调用构造函数，并将 this 指向新对象
```js
Test.call(obj)
```
4. 将初始化完毕的新对象地址，保存到等号左边的变量中

## prototype 和 `__proto__` 的关系是什么
结论：
1. `prototype` 用于访问函数的原型对象。
2. `__proto__` 用于访问对象实例的原型对象（值得注意的是这个属性是非标准的，只不过各浏览器都实现了它，推荐使用 es6 标准的 Object.getPrototypeOf() 来获取原型对象）。
```js
function Test() {}
const test = new Test()
test.__proto__ == Test.prototype // true
```
也就是说，函数拥有 prototype 属性，对象实例拥有 `__proto__` 属性，它们都是用来访问原型对象的。  
最后贴一个图，有助于理解：
![](./images/js_prototype.jpg)

## 原型链
所有的 JS 对象都有一个 `__proto__` 属性，指向它的原型对象。当试图访问一个对象的属性时，如果没有在该对象上找到，它还会搜寻该对象的原型，以及该对象的原型的原型，依次层层向上搜索，直到找到一个名字匹配的属性或到达原型链的末尾（末尾是 null）。

## 使用 ES5 和 ES6 实现继承
ES5 prototype 寄生组合式继承  
```js
function SuperType(name) {
  this.name = name
}

SuperType.prototype.sayName = function() {
  console.log(this.name)
}

function SubType(name, age) {
  SuperType.call(this, name)
  this.age = age
}

SubType.prototype.sayAge = function() {
  console.log(this.age)
}

function extendPrototype(Sub, Super) {
  Sub.prototype = Object.create(Super.prototype)
  Sub.prototype.constructor = Sub
}

extendPrototype(SubType, SuperType)

const sub = new SubType('tom', 18)
sub.sayAge() // 18
sub.sayName() // tom
```
ES6 class
```js
class SuperType {
  constructor(name) {
    this.name = name
  }

  sayName() {
    console.log(this.name)
  }
}

class SubType extends SuperType {
  constructor(name, age) {
    super(name)
    this.age = age
  }

  sayAge(age) {
    console.log(this.age)
  }
}

const sub = new SubType('tom', 18)
sub.sayAge() // 18
sub.sayName() // tom
```
从实现上来看，ES6 更加简洁。

## 闭包
闭包是指有权访问另一个函数作用域中的变量的函数。
```js
function sayName() {
  const name = 'xiaoming'

  return () => {
    console.log(`Hi! ${name}`)
  }
}
const test = sayName()
test() // Hi! xiaoming
```
虽然 sayName 函数已经执行完毕，但是其活动对象也不会被销毁，因为 test 函数仍然引用着 sayName 函数中的变量 name，这就是闭包。但也因为闭包引用着另一个函数的变量，导致另一个函数即使不使用了也无法销毁，所以闭包使用过多，会占用较多的内存，这也是一个副作用。

## 内存回收
在 JS 中，有两种内存回收算法。第一种是引用计数垃圾收集，第二种是标记-清除算法（从2012年起，所有现代浏览器都使用了标记-清除垃圾回收算法）。
### 引用计数垃圾收集
如果一个对象没有被其他对象引用，那它将被垃圾回收机制回收
```js
let o = { a: 1 }
```
一个对象被创建，并被 o 引用。
```js
o = null
```
刚才被 o 引用的对象现在是零引用，将会被回收。
#### 循环引用
引用计数垃圾收集有一个缺点，就是循环引用会造成对象无法被回收。
```js
function f(){
  var o = {};
  var o2 = {};
  o.a = o2; // o 引用 o2
  o2.a = o; // o2 引用 o

  return "azerty";
}

f();
```
在 f() 执行后，函数的局部变量已经没用了，一般来说，这些局部变量都会被回收。但上述例子中，o 和 o2 形成了循环引用，导致无法被回收。
### 标记-清除算法
这个算法假定设置一个叫做根（root）的对象（在 Javascript 里，根是全局对象）。垃圾回收器将定期从根开始，找所有从根开始引用的对象，然后找这些对象引用的对象……从根开始，垃圾回收器将找到所有可以获得的对象和收集所有不能获得的对象。

对于刚才的例子来说，在 f() 执行后，由于 o 和 o2 从全局对象出发无法获取到，所以它们将会被回收。  
### 高效使用内存
在 JS 中能形成作用域的有函数、全局作用域、with，在 es6 还有块作用域。局部变量随着函数作用域销毁而被释放，全局作用域需要进程退出才能释放或者使用 delete 和赋空值 `null` `undefined`。  

在 V8 中用 delete 删除对象可能会干扰 V8 的优化，所以最好通过赋值方式解除引用。  

参考资料：[内存管理](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Memory_Management)

## 对象浅拷贝和深拷贝有什么区别
在 JS 中，除了基本数据类型，还存在对象、数组这种引用类型。对于基本类型，浅拷贝和深拷贝都会拷贝它的值。对于引用类型，浅拷贝只会拷贝它的地址，而深拷贝会创建一个一样的对象。  
浅拷贝：Object.assign，扩展运算符等。  
深拷贝：JSON.parse(JSON.stringify(obj))（不过这个方法会有很多坑，详见：[https://www.jianshu.com/p/b084dfaad501](https://www.jianshu.com/p/b084dfaad501)），lodash 的 cloneDeep 方法等。

## js 里的类型判断
1. typeof 操作符  
使用 typeof 判断基本类型是可以的，但是引用类型都会返回 object
```js
typeof 1
"number"

typeof "1"
"string"

typeof null
"object"

typeof []
"object"

typeof {}
"object"
```
2. instanceof 操作符  
instanceof 操作符主要用来检查构造函数的原型是否在对象的原型链上。
```js
function Fruit(name, color) {
    this.name = name;
    this.color = color;
}

const apple = new Fruit("apple", "red");

apple instanceof Object  // true
apple instanceof Array   // false
```
3. toString方法  
该方法基本可以判断所有类型
```js
function _typeof (obj) {
  const s = Object.prototype.toString.call(obj);
  return s.match(/\[object (.*?)\]/)[1].toLowerCase();
}

_typeof('123') // string
```

## js有哪些数据类型
1. Undefined
2. Null
3. Boolean
4. Number 
5. String
6. Object
7. Symbol
8. BigInt

## 内置函数(原生函数)
+ String
+ Number
+ Boolean
+ Object
+ Function
+ Array
+ Date
+ RegExp
+ Error
+ Symbol  

注意像 String，Number 我们定义的时候一般不会使用 new 的方式，而是使用定义字面量的方式定义。例如 "i am string"，当我们调用它的字面量的方法时，语法编译器会自动进行装箱操作，将其包装成 String 对象，然后调用其方法，之后再进行拆箱操作将其转回字面量。

## cookie、localStorage、sessionStorage区别
|特性|cookie|localStorage|sessionStorage|
|-|-|-|-|
|由谁初始化|客户端或服务器，服务器可以使用`Set-Cookie`请求头|客户端|客户端|
|数据的生命周期|一般由服务器生成，可设置失效时间。在浏览器生成，默认失效时间是关闭浏览器之后失效|永久保存，可清除|仅在当前会话有效，关闭页面后清除|
|存放数据大小|4KB|5MB|5MB|
|与服务器通信|每次都会携带在HTTP头中，如果使用cookie保存过多数据会带来性能问题|仅在客户端保存|仅在客户端保存|
|用途|一般由服务器生成，用于标识用户身份|用于浏览器缓存数据|用于浏览器缓存数据|
|访问权限|任意窗口|任意窗口|当前页面窗口|
|作用范围|可以设置 二级、三级 域名携带，设置二级域名会使所有匹配的三级域名携带 cookie|只能在当前域名携带|只能在当前域名携带|

## HTTP 缓存
HTTP 缓存主要分为以下两种：
1. 强缓存
2. 协商缓存  

浏览器从请求接口到呈现页面会经过以下阶段：  
![](./images/browser_cache.jpg)  
两者的主要区别是使用本地缓存的时候，是否需要向服务器验证本地缓存是否依旧有效。顾名思义，协商缓存，就是需要和服务器进行协商，最终确定是否使用本地缓存。
### 强缓存
当浏览器向服务器发起请求时，服务器会将缓存规则放入 HTTP 响应报文的 HTTP 头中和请求结果一起返回给浏览器，控制强制缓存的字段分别是 Expires 和 Cache-Control，其中 Cache-Control 优先级比 Expires 高。
#### Expires
Expires 是 http1.0 提出的一个表示资源过期时间的 header，它描述的是一个绝对时间，由服务器返回。由于设置的是绝对时间，当客户端在不同的时区时，则过期时间就会发生误差。
```
Expires: Wed, 11 May 2018 07:20:00 GMT
```
#### Cache-Control
Cache-Control 出现于 HTTP/1.1，优先级高于 Expires ,表示的是相对时间。设置 max-age 字段为 300 则表示缓存该结果 300 秒。
```
Cache-Control: max-age=300
```
tips: Cache-Control 的其他用法
+ no-cache：表示在使用缓存之前，强制要求缓存把请求提交给原始服务器进行验证(协商缓存验证)。
+ no-store：不使用任何缓存。
+ public：表明响应可以被任何对象（包括：发送请求的客户端，代理服务器，等等）缓存，即使是通常不可缓存的内容。（例如：1.该响应没有 max-age 指令或 Expires 消息头；2.该响应对应的请求方法是 POST 。）
+ private：表明响应只能被单个用户缓存，不能作为共享缓存（即代理服务器不能缓存它）。私有缓存可以缓存响应内容，比如：对应用户的本地浏览器。

### 协商缓存
当浏览器对某个资源的请求没有命中强缓存或者响应头 Cache-Control 设置为 `no-cache` 时，就会发一个请求到服务器，验证协商缓存是否命中，如果协商缓存命中，请求响应返回的 http 状态为 304 并且会显示一个 Not Modified 的字符串

协商缓存是利用的是【Last-Modified，If-Modified-Since】和【ETag、If-None-Match】这两对Header来管理的
[https://github.com/amandakelake/blog/issues/41](https://github.com/amandakelake/blog/issues/41)