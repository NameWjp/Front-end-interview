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
interface Colorful {
  color: string;
}

type ColorfulSub = Colorful & {
  color: number
}
```
虽然不会报错，那 color 属性的类型是什么呢，答案是 never，取得是 string 和 number 的交集。

另外一方面，从语义的角度来说，interface是接口，type是类型，本身就是两个概念。如果你希望定义一个变量类型，就应该用 type。如果有明确的继承关系或表约束的，就用 interface。例如一个类应该是 implements 一个 interface 而不是 type。