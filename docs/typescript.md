## type 和 interface 的相同点和不同点
type 和 interface 非常相似，大部分时候，你可以任意选择使用，例如都可以描述一个对象或者函数，都允许扩展。
```ts
// Interface
// 通过继承扩展类型
interface Animal {
  name: string
}

interface Bear extends Animal {
  honey: boolean
}

const bear = getBear() 
bear.name
bear.honey
        
// Type
// 通过交集扩展类型
type Animal = {
  name: string
}

type Bear = Animal & { 
  honey: boolean 
}

const bear = getBear();
bear.name;
bear.honey;
```
type 和 interface 两者最关键的差别在于 type 别名本身无法添加新的属性，而 interface 是可以扩展的。
```ts
// Interface
// 对一个已经存在的接口添加新的字段
interface Window {
  title: string
}

interface Window {
  ts: TypeScriptAPI
}

const src = 'const a = "Hello World"';
window.ts.transpileModule(src, {});
        
// Type
// 创建后不能被改变
type Window = {
  title: string
}

type Window = {
  ts: TypeScriptAPI
}

// Error: Duplicate identifier 'Window'.
```
在处理交叉类型的情况，两者也不相同：
```ts
interface Colorful {
  color: string;
}

interface ColorfulSub extends Colorful {
  color: number
}

// Interface 'ColorfulSub' incorrectly extends interface 'Colorful'.
// Types of property 'color' are incompatible.
// Type 'number' is not assignable to type 'string'.
```
使用继承的方式，如果重写类型会导致编译错误，但交叉类型不会：
```ts
type Colorful {
  color: string;
}

type ColorfulSub = Colorful & {
  color: number
}
```
虽然不会报错，那 color 属性的类型是什么呢，答案是 never，取得是 string 和 number 的交集。

另外一方面，从语义的角度来说，interface是接口，type是类型，本身就是两个概念。如果你希望定义一个变量类型，就应该用 type。如果有明确的继承关系或表约束的，就用 interface。例如一个类应该是 implements 一个 interface 而不是 type。



## infer 的协变和逆变
infer 有一个特别有用的性质，当 infer 被同一个类型变量用在多处时，infer 推导出来的类型取决于这些位置是协变还是逆变。如果位置是协变的，那么推导出的类型是各个位置分别推导的类型的 union（或关系），如果位置是逆变的，那么推导的类型是各个位置推导类型的 intersection（且关系）。
### 协变
例如下面的 U 同时处于 record 的属性里，是处于协变位置。
```ts
type Foo<T> = T extends { a: infer U, b: infer U } ? U : never;
type T10 = Foo<{ a: string, b: string }>;  // string
type T11 = Foo<{ a: string, b: number }>;  // string | number
```
### 逆变
而下面的例子 U 所处的位置是函数的参数，其是逆变的。
```ts
type Bar<T> = T extends { a: (x: infer U) => void, b: (x: infer U) => void } ? U : never;
type T20 = Bar<{ a: (x: string) => void, b: (x: string) => void }>;  // string
type T21 = Bar<{ a: (x: string) => void, b: (x: number) => void }>;  // string & number
```
为什么这里是逆变而上面是协变？对于 `(x: infer U) => void` 类型，由于这里的 `x` 是输入，所以该子类型中的 `x` 必须是 `U` 的子类型才能保证类型的匹配。对应到上面的例子，需要同时是 string 和 number 的子类型，所以结果为 string & number
### 总结
在 TypeScript 中，对象、类、数组和函数的返回值类型都是协变关系，而函数的参数类型是逆变关系，所以 infer 位置如果在函数参数上，就会遵循逆变原则。

参考：[Typescript infer 关键字](https://github.com/ascoders/weekly/blob/master/%E5%89%8D%E6%B2%BF%E6%8A%80%E6%9C%AF/207.%E7%B2%BE%E8%AF%BB%E3%80%8ATypescript%20infer%20%E5%85%B3%E9%94%AE%E5%AD%97%E3%80%8B.md)



### 设计一个泛型，接受一个对象类型，返回一个可选的 key 的对象类型，但不能是空对象
```ts
interface Todo {
  title: string
  description: string
  completed: boolean
}

type Optional<T> = {
  [key in keyof T]: {
    [newKey in key]: T[newKey]
  }
}[keyof T]

type B = Optional<Todo>;
const b: B = {} // 报错
```