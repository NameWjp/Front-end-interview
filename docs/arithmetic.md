## 手写冒泡算法
```js
function bubbleSort(arr) {
  const len = arr.length;
  for (let i = 0; i < len; i++) {
    for(let j = 0; j < len - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        const temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }
}
```



## 根据 value 获取叶子节点
```js
/**
 * 获取树节点
 * @param {Array} tree 树结构
 * @param {*} value 要找的节点值
 * @param {String} keyName 要找的节点键名
 * @param {String} childrenKey 当前节点中子节点键名
 */
export function getTreeNode(tree, value, keyName, childrenKey) {
  const stack = [...tree];
  let tempNode;
  while (stack.length) {
    tempNode = stack.pop();
    if (tempNode[keyName] === value) {
      return tempNode
    }
    if (tempNode[childrenKey] && tempNode[childrenKey].length) {
      stack.push(...tempNode[keyName]);
    }
  }
  return null;
}
```



## 根据 value 获取叶子节点的路径
```js
/**
 * 根据 value 获取叶子节点的路径
 * @param {Array} tree
 * @param {*} value
 * @param {String} keyName
 * @param {String} childrenKey
 */
export function getTreeKeyPath(tree, value, keyName, childrenKey = 'children') {
  const path = [];

  const parse = (subTree) => {
    for (let i = 0; i < subTree.length; i += 1) {
      const node = subTree[i];
      path.push(node[keyName]);
      if (node[keyName] === value) {
        return true;
      }
      if (node[childrenKey] && node[childrenKey].length) {
        if (parse(node[childrenKey])) {
          return true;
        }
      }
      path.pop();
    }
    return false;
  };

  return path;
}
```



## 列表结构转树结构
```js
export function listToTree(source, pid = 0) {
  const result = [];
  source.forEach(item => {
    if (item.parentId === pid) {
      item.children = listToTree(source, item.id);
      result.push(item);
    }
  });
  return result;
}
```



## 实现洗牌算法
```js
// 返回最小与最大值之间的随机数，包含最大最小值
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

//将数组的副本循环随机打乱重组一个新数组返回
//实现方法: 在[0~i]数组中,取出i的值,将他的值与随机一个小于i索引的值对换
export function shuffle(arr) {
  let _arr = arr.slice()
  for (let i = 0; i < _arr.length; i++) {
    let j = getRandomInt(0, i)
    let t = _arr[i]
    _arr[i] = _arr[j]
    _arr[j] = t
  }
  return _arr
}
```