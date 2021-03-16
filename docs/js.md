## js里的最大安全数是多少，为什么
js里采用 IEEE754 标准，采用双精度存储数值，存储结构如下。  
![](./images/js_number_save.png)
由于指数最大可以偏移 Math.pow(2, 11) 位，大于最大可表示的 52 位尾数，所以最大值由尾数 52 位决定。  
又因为尾数部分在规约形式下第一位总为 1 可以不写，所以 js 最大安全数为 Math.pow(2,53) - 1（64位浮点的后52位+被省略的1位）。


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

## 什么是循环依赖，如何解决？