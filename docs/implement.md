## async 和 Generator 的关系，如何使用 Generator 实现 async
async 语法是内置自动执行器的 Generator 的语法糖。  
利用 `Generator` 实现 `async/await` 主要就是用一个函数（自动执行器）来包装 `Generator`，从而实现自动执行 `Generator`。  
每次执行 `next()` 返回的 `{ value, done }` 中的 value 是一个 Promise，所以要等它执行完毕后再执行下一次 `next()`，即在它的后面加一个 `then()` 函数，并且在 `then()` 函数中执行 `next()`。  
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
        (err) => step(() => gen.throw(err)),
      )
    }

    step(() => gen.next())
  })
}

// 1 2 3
async(test).then(val => console.log(val))
```



## 实现 compose 函数
compose（组合）函数特点：
+ compose 的参数是函数，返回的也是一个函数
+ 因为除了第一个函数的接受参数，其他函数的接受参数都是上一个函数的返回值，所以初始函数的参数是多元的，而其他函数的接受值是一元的
+ compsoe 函数可以接受任意的参数，所有的参数都是函数，且执行方向是自右向左的，初始函数一定放到参数的最右面
```js
function compose(...fns) {
    let isFirst = true
    return (...args) => {
      return fns.reduceRight((result, fn) => {
          if (!isFirst) return fn(result)
          isFirst = false
          return fn(...result)
      }, args)
    }
}

// 测试
const greeting = (firstName, lastName) => 'hello, ' + firstName + ' ' + lastName
const toUpper = str => str.toUpperCase()
const fn = compose(toUpper, greeting)
console.log(fn('jack', 'smith')) // HELLO, JACK SMITH
```
在使用上可以使用 lodash 库提供的 flowRight 函数。



## 实现 new 操作符
调用 `new` 的过程中会发生四件事情：
1. 创建一个新对象
2. 设置新对象的 `constructor` 属性为构造函数，设置新对象的 `__proto__` 属性指向构造函数的 prototype 对象
3. 调用构造函数，并将 this 指向新对象
4. 返回新对象

```js
// 实现
function FakeNew() {
  const Constructor = [].shift.apply(arguments);
  const obj = Object.create(Constructor.prototype);
  obj.constructor = Constructor;
  const res = Constructor.call(obj, arguments);
  return typeof res === 'object' ? res : obj;
}

// 调用
function User(name) {
  this.name = name;
}
User.prototype.getName = function() {
  return this.name;
}
const u = FakeNew(User, 'wangjp');
```



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



## 实现发布/订阅模式
```js
class Event {
  constructor() {
    this.events = {}
  }

  on(event, callback) {
    if (!this.events[event]) {
      this.events[event] = []
    }

    this.events[event].push(callback)
  }

  off(event, callback) {
    if (this.events[event]) {
      if (callback) {
        const cbs = this.events[event]
        for(let i = 0; i < cbs.length; i++) {
          if (callback === cbs[i]) {
            cbs.splice(i, 1);
            break;
          }
        }
      } else {
        this.events[event] = []
      }
    }
  }

  emit(event, ...args) {
    if (this.events[event]) {
      for (const func of this.events[event]) {
        func.call(this, ...args)
      }
    }
  }

  once(event, callback) {
    const wrap = (...args) => {
      callback.call(this, ...args)
      this.off(event, wrap)
    }

    this.on(event, wrap)
  }
}
```



## 如何实现一个可设置过期时间的 localStorage
```js
(function () {
    const getItem = localStorage.getItem.bind(localStorage)
    const setItem = localStorage.setItem.bind(localStorage)
    const removeItem = localStorage.removeItem.bind(localStorage)

    localStorage.getItem = function (key) {
        const expires = getItem(key + '_expires')
        if (expires && new Date() > new Date(Number(expires))) {
            removeItem(key)
            removeItem(key + '_expires')
        }

        return getItem(key)
    }

    localStorage.setItem = function (key, value, time) {
        if (typeof time !== 'undefined') {
            setItem(key + '_expires', new Date().getTime() + Number(time))
        }

        return setItem(key, value)
    }
})()
```



## 防抖和节流函数的原理和实现
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

// 使用
function test(a, b) {
    console.log(a, b)
}

curry(test)(1)(2) // 1 2
```
在使用上可以使用 lodash 库提供的 curry 函数，功能更加完善。



## 简易 Promise 的实现
```js
// 提前定义一些状态
const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

// 执行传入的 promise 或者 其它值
function resolvePromise(promise2, res, resolve, reject) {
  if (promise2 === res) {
    return reject(new TypeError('Chaining cycle detected for promise #<Promise>'));
  }
  if(res instanceof MyPromise) {
    res.then(resolve, reject);
  } else{
    resolve(res);
  }
}

class MyPromise {
  // 状态
  status = PENDING;
  // 成功之后的值
  value = null;
  // 失败之后的值
  reason = null;
  // 成功回调
  onFulfilledCallbacks = [];
  // 失败回调
  onRejectedCallbacks = [];
  // 成功方法
  resolve = (value) => {
    if (this.status === PENDING) {
      this.status = FULFILLED;
      this.value = value;
      while (this.onFulfilledCallbacks.length) {
        this.onFulfilledCallbacks.shift()(value);
      }
    }
  };
  // 失败方法
  reject = (reason) => {
    if (this.status === PENDING) {
      this.status = REJECTED;
      this.reason = reason;
      while (this.onRejectedCallbacks.length) {
        this.onRejectedCallbacks.shift()(reason);
      }
    }
  };

  constructor(executor) {
    try {
      executor(this.resolve, this.reject);
    } catch (error) {
      this.reject(error);
    }
  }

  static resolve(parameter) {
    if (parameter instanceof MyPromise) {
      return parameter;
    }

    return new MyPromise(resolve => {
      resolve(parameter);
    });
  }

  static reject(reason) {
    return new MyPromise((resolve, reject) => {
      reject(reason);
    })
  }

  then(onFulfilled, onRejected) {
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value;
    onRejected = typeof onRejected === 'function' ? onRejected : reason => { throw reason };

    const promise2 = new MyPromise((resolve, reject) => {
      if (this.status === FULFILLED) {
        // 同步的情况，此时状态是 FULFILLED
        queueMicrotask(() => {
          try {
            const res = onFulfilled(this.value);
            resolvePromise(promise2, res, resolve, reject);
          } catch (error) {
            reject(error);
          }
        });
      } else if (this.status === REJECTED) {
        // 同步的情况，此时状态是 REJECTED
        queueMicrotask(() => {
          try {
            const res = onRejected(this.reason);
            resolvePromise(promise2, res, resolve, reject);
          } catch (error) {
            reject(error);
          }
        });
      } else if (this.status === PENDING) {
        // 异步的情况，此时状态是 PENDING
        this.onFulfilledCallbacks.push(() => {
          queueMicrotask(() => {
            try {
              const res = onFulfilled(this.value);
              resolvePromise(promise2, res, resolve, reject);
            } catch (error) {
              reject(error);
            }
          });
        });
        this.onRejectedCallbacks.push(() => {
          queueMicrotask(() => {
            try {
              const res = onRejected(this.reason);
              resolvePromise(promise2, res, resolve, reject);
            } catch (error) {
              reject(error);
            }
          });
        });
      }
    })

    return promise2;
  }
};
```
参考链接：[https://juejin.cn/post/6945319439772434469](https://juejin.cn/post/6945319439772434469)
