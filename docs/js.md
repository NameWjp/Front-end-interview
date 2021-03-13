## js里的最大安全数是多少，为什么
js里采用 IEEE754 标准，采用双精度存储数值，存储结构如下。  
![](./images/jsNumberSave.png)
由于指数最大可以偏移 Math.pow(2, 11) 位，大于最大可表示的 52 位尾数，所以最大值由尾数 52 位决定。  
又因为尾数部分在规约形式下第一位总为 1 可以不写，所以 js 最大安全数为 Math.pow(2,53) - 1（64位浮点的后52位+被省略的1位）。

## 为什么 0.1 + 0.2 与 0.3 不相等，如何解决
js里采用 IEEE754 标准，采用双精度存储数值，存储结构如下。  
![](./images/jsNumberSave.png)
由于 0.1 和 0.2 转化成二进制的时候会无限循环。  
```js
0.1 -> 0.0001100110011001...(无限循环)
0.2 -> 0.0011001100110011...(无限循环)
```
所以必然会存在精度丢失的问题。  
解决方法：写一个公共方法，在计算的时候将 0.1 等小数转化整数，运算完成后再将其转化成小数。
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