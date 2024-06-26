(window.webpackJsonp=window.webpackJsonp||[]).push([[13],{391:function(t,a,s){t.exports=s.p+"assets/img/react_lifecycle.8a5cefdb.png"},392:function(t,a,s){t.exports=s.p+"assets/img/react_update.ac355f35.jpeg"},416:function(t,a,s){"use strict";s.r(a);var n=s(45),e=Object(n.a)({},(function(){var t=this,a=t.$createElement,n=t._self._c||a;return n("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[n("h2",{attrs:{id:"hooks-的出现解决了什么问题"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#hooks-的出现解决了什么问题"}},[t._v("#")]),t._v(" hooks 的出现解决了什么问题？")]),t._v(" "),n("p",[t._v("个人认为 React hooks 的出现主要解决了两个问题。")]),t._v(" "),n("ol",[n("li",[t._v("逻辑割裂"),n("br"),t._v("\n在 hooks 出现之前，React 主要通过编写 class 类来编写组件，每个组件有自己的生命周期，这就导致我们在编码时必须按照组件的生命周期去写，例如：我们在 "),n("code",[t._v("componentDidMount")]),t._v(" 注册一个定时去，在 "),n("code",[t._v("componentWillUnmount")]),t._v(" 销毁定时器。在 "),n("code",[t._v("componentDidMount")]),t._v(" 中请求数据，在 "),n("code",[t._v("componentDidUpdate")]),t._v(" 中判断状态变化请求数据。同样的逻辑， 我们需要在不同的生命周期中去实现，在一个大型的 app 中，类似的逻辑会有很多，掺杂在一起，越来越难以维护。")]),t._v(" "),n("li",[t._v("逻辑复用"),n("br"),t._v("\n在 hooks 出现之前，复用逻辑的方式主要是"),n("code",[t._v("高阶函数")]),t._v("和"),n("code",[t._v("Render Props")]),t._v("，但这两种模式都有它们自己的问题，那就是会出现「嵌套地域」。"),n("br"),t._v("\n对于高阶组件，我门的实现方式往往实现一个函数，它接受一个类并返回一个新类。这种方法确实可以很巧妙的解决一些逻辑复用的问题，但有一个弊端，如果一个组件被包裹很多层就会出现下面的情况：")])]),t._v(" "),n("div",{staticClass:"language-js extra-class"},[n("pre",{pre:!0,attrs:{class:"language-js"}},[n("code",[n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("export")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("default")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("withA")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("\n  "),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("withB")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("\n    "),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("withC")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("\n      "),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("withD")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("\n        Component\n      "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n    "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n  "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])])]),n("p",[t._v("Render Props 也一样，这两种模式都会限制你的组件结构，随着功能的增加，包裹的层数越来越多，陷入所谓的 "),n("code",[t._v("wrapper hell")]),t._v(" 之中。"),n("br"),t._v("\nHooks 的出现是一种全新的写法，抛弃了类，使用函数来写组件。但由于函数没法保存状态，React 引入了 "),n("code",[t._v("useState")]),t._v(" 等 API 来帮助我们保留状态。其中的原理是 React 会根据 "),n("code",[t._v("useState")]),t._v(" 的调用顺序来在内部保留状态，所以 Hooks 有一个重要的规则，只能在最顶层使用 Hooks。使用 Hooks 编写的代码没有「嵌套地狱」，组织代码粒度更细，相关逻辑代码紧密，提升了组件的内聚性，减少了维护成本。")]),t._v(" "),n("h2",{attrs:{id:"react-的生命周期有哪些"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#react-的生命周期有哪些"}},[t._v("#")]),t._v(" React 的生命周期有哪些？")]),t._v(" "),n("p",[t._v("React 生命周期图谱如下：\n"),n("img",{attrs:{src:s(391),alt:""}}),t._v("\n根据不同状态可以细分如下：")]),t._v(" "),n("h3",{attrs:{id:"挂载"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#挂载"}},[t._v("#")]),t._v(" 挂载")]),t._v(" "),n("ol",[n("li",[t._v("constructor()"),n("br"),t._v("\n在 React 组件挂载之前，会调用它的构造函数")]),t._v(" "),n("li",[t._v("static getDerivedStateFromProps()"),n("br"),t._v("\ngetDerivedStateFromProps 会在调用 render 方法之前调用，并且在初始挂载及后续更新时都会被调用，它应返回一个对象来更新 state（注意这里是静态方法，代表你不能访问 this，使得 getDerivedStateFromProps 这个函数强迫变成一个纯函数，逻辑也相对简单，就没那么多错误了）。")]),t._v(" "),n("li",[t._v("render()"),n("br"),t._v("\n渲染函数 render() 被调用")]),t._v(" "),n("li",[t._v("componentDidMount()"),n("br"),t._v("\ncomponentDidMount() 会在组件挂载后（插入 DOM 树中）立即调用。依赖于 DOM 节点的初始化应该放在这里。如需通过网络请求获取数据，此处是实例化请求的好地方。")])]),t._v(" "),n("h3",{attrs:{id:"更新"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#更新"}},[t._v("#")]),t._v(" 更新")]),t._v(" "),n("ol",[n("li",[t._v("static getDerivedStateFromProps()")]),t._v(" "),n("li",[t._v("shouldComponentUpdate()"),n("br"),t._v("\n根据 shouldComponentUpdate() 的返回值，判断 React 组件是否受当前 state 或 props 更改的影响。默认父组件的 state 或 prop 更新时，无论子组件的 state、prop 是否更新，都会触发子组件的更新，这会形成很多没必要的 render，浪费很多性能，使用 shouldComponentUpdate 可以优化掉不必要的更新。")]),t._v(" "),n("li",[t._v("render()")]),t._v(" "),n("li",[t._v("getSnapshotBeforeUpdate()"),n("br"),t._v("\ngetSnapshotBeforeUpdate() 在最近一次渲染输出（提交到 DOM 节点）之前调用。它使得组件能在发生更改之前从 DOM 中捕获一些信息（例如，滚动位置）。此生命周期的任何返回值将作为参数传递给 componentDidUpdate()。")]),t._v(" "),n("li",[t._v("componentDidUpdate()"),n("br"),t._v("\ncomponentDidUpdate() 会在更新后会被立即调用。")])]),t._v(" "),n("h3",{attrs:{id:"卸载"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#卸载"}},[t._v("#")]),t._v(" 卸载")]),t._v(" "),n("ol",[n("li",[t._v("componentWillUnmount()"),n("br"),t._v("\ncomponentWillUnmount() 会在组件卸载及销毁之前直接调用。在此方法中执行必要的清理操作，例如，清除 timer 等。")])]),t._v(" "),n("h3",{attrs:{id:"错误处理"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#错误处理"}},[t._v("#")]),t._v(" 错误处理")]),t._v(" "),n("ol",[n("li",[t._v("static getDerivedStateFromError()"),n("br"),t._v("\n此生命周期会在后代组件抛出错误后被调用。 它将抛出的错误作为参数，并返回一个值以更新 state")]),t._v(" "),n("li",[t._v("componentDidCatch()"),n("br"),t._v("\n此生命周期在后代组件抛出错误后被调用。")])]),t._v(" "),n("h2",{attrs:{id:"purecomponent-和-component-区别"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#purecomponent-和-component-区别"}},[t._v("#")]),t._v(" PureComponent 和 Component 区别")]),t._v(" "),n("p",[t._v("当使用 component 时，父组件的 state 或 prop 更新时，无论子组件的 state、prop 是否更新，都会触发子组件的更新，这会形成很多没必要的 render，浪费很多性能。pureComponent 的优点在于：pureComponent 在 shouldComponentUpdate 只进行浅层的比较，只要外层对象没变化，就不会触发render，减少了不必要的render。")]),t._v(" "),n("h2",{attrs:{id:"如何使用-context-上下文"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#如何使用-context-上下文"}},[t._v("#")]),t._v(" 如何使用 Context 上下文")]),t._v(" "),n("ol",[n("li",[t._v("创建一个 context 对象")])]),t._v(" "),n("div",{staticClass:"language-js extra-class"},[n("pre",{pre:!0,attrs:{class:"language-js"}},[n("code",[n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 初始值为 { theme: themes.dark, toggleTheme: () => {} }")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" ThemeContext "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" React"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("createContext")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  theme"),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" themes"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("dark"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),n("span",{pre:!0,attrs:{class:"token function-variable function"}},[t._v("toggleTheme")]),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),n("ol",{attrs:{start:"2"}},[n("li",[t._v("使用 context.Provider 提供数据")])]),t._v(" "),n("div",{staticClass:"language-js extra-class"},[n("pre",{pre:!0,attrs:{class:"language-js"}},[n("code",[n("span",{pre:!0,attrs:{class:"token function"}},[t._v("render")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("\n    "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v("ThemeContext"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("Provider value"),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("this")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("state"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v("\n      "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v("Content "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v("\n    "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),t._v("ThemeContext"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("Provider"),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v("\n  "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),n("ol",{attrs:{start:"3"}},[n("li",[t._v("使用 context.Consumer 或者挂载 contextType 或者 useContext 消费数据")])]),t._v(" "),n("div",{staticClass:"language-js extra-class"},[n("pre",{pre:!0,attrs:{class:"language-js"}},[n("code",[n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// context.Consumer")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("render")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("\n    "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v("ThemeContext"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("Consumer"),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v("\n      "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token parameter"}},[n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" theme"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" toggleTheme "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")])]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("\n        "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v("button\n          onClick"),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("toggleTheme"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n          style"),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("backgroundColor"),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" theme"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("background"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v("\n          Toggle Theme\n        "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),t._v("button"),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v("\n      "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n    "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),t._v("ThemeContext"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("Consumer"),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v("\n  "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n"),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 挂载 contextType")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("class")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("MyClass")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("extends")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("React"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("Component")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("...")]),t._v("\n  "),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("render")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" value "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("this")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("context"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\nMyClass"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("contextType "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" ThemeContext"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n"),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// useContext")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" value "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("useContext")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("ThemeContext"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),n("p",[t._v("需要注意的是 Provider 必须是 Consumer 的祖先元素。")]),t._v(" "),n("h2",{attrs:{id:"react-父组件调用子组件的方法"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#react-父组件调用子组件的方法"}},[t._v("#")]),t._v(" React 父组件调用子组件的方法")]),t._v(" "),n("ol",[n("li",[t._v("使用 forwardRef 和 useImperativeHandle 在子组件中暴露方法")])]),t._v(" "),n("div",{staticClass:"language-jsx extra-class"},[n("pre",{pre:!0,attrs:{class:"language-jsx"}},[n("code",[n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("FancyInput")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("props"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" ref")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" inputRef "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("useRef")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  "),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("useImperativeHandle")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("ref"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),n("span",{pre:!0,attrs:{class:"token function-variable function"}},[t._v("focus")]),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n      inputRef"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("current"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("focus")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n  "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token tag"}},[n("span",{pre:!0,attrs:{class:"token tag"}},[n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("input")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("ref")]),n("span",{pre:!0,attrs:{class:"token script language-javascript"}},[n("span",{pre:!0,attrs:{class:"token script-punctuation punctuation"}},[t._v("=")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("inputRef"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")])]),t._v(" "),n("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("...")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("/>")])]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\nFancyInput "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("forwardRef")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("FancyInput"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),n("ol",{attrs:{start:"2"}},[n("li",[t._v("父组件使用 ref 调用子组件方法")])]),t._v(" "),n("div",{staticClass:"language-jsx extra-class"},[n("pre",{pre:!0,attrs:{class:"language-jsx"}},[n("code",[n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("parentContainer")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" childRef "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("useRef")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n  "),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("useEffect")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    childRef"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("current"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("focus")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n  "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token tag"}},[n("span",{pre:!0,attrs:{class:"token tag"}},[n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),n("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("FancyInput")])]),t._v(" "),n("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("ref")]),n("span",{pre:!0,attrs:{class:"token script language-javascript"}},[n("span",{pre:!0,attrs:{class:"token script-punctuation punctuation"}},[t._v("=")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("childRef"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")])]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("/>")])]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),n("h2",{attrs:{id:"react-组件更新流程"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#react-组件更新流程"}},[t._v("#")]),t._v(" React 组件更新流程")]),t._v(" "),n("p",[n("img",{attrs:{src:s(392),alt:""}})]),t._v(" "),n("h2",{attrs:{id:"react-虚拟-dom-diff-算法"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#react-虚拟-dom-diff-算法"}},[t._v("#")]),t._v(" React 虚拟 DOM diff 算法")]),t._v(" "),n("p",[t._v("React 的虚拟 DOM（Virtual DOM）是其核心特性之一，它允许开发者编写声明式的 UI 代码并且不用担心具体的性能细节。React 使用虚拟 DOM 来优化 UI 的更新过程，使得只有当数据发生变化时，才会重新渲染组件。React 的 diff 算法是优化这个过程的关键。")]),t._v(" "),n("p",[t._v("React 的 diff 算法是一种启发式算法，它通过两个假设来优化应用程序的性能：")]),t._v(" "),n("ol",[n("li",[n("p",[n("strong",[t._v("两个不同类型的元素会产生不同的树。")]),t._v(" 当 React 在对比两棵树时，如果发现元素的类型不同，它会直接删除旧树，并且建立一棵新树。")])]),t._v(" "),n("li",[n("p",[n("strong",[t._v("通过 "),n("code",[t._v("key")]),t._v(" 属性，可以在不同的渲染中识别出哪些元素是相同的。")]),t._v(" 在数组中渲染多个子组件时，应该给每个子组件赋予一个独一无二的 "),n("code",[t._v("key")]),t._v(" 属性。这样，React 可以通过 "),n("code",[t._v("key")]),t._v(" 来匹配原始树形结构中的子元素和后来的子元素。")])])]),t._v(" "),n("p",[t._v("React 的 diff 算法主要分为三个步骤：")]),t._v(" "),n("h3",{attrs:{id:"对比不同类型的元素"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#对比不同类型的元素"}},[t._v("#")]),t._v(" 对比不同类型的元素")]),t._v(" "),n("p",[t._v("当根元素是不同类型的组件时，React 会拆卸旧树并建立新树。例如，当一个 "),n("code",[t._v("<div>")]),t._v(" 变成了 "),n("code",[t._v("<span>")]),t._v("，或者当一个 "),n("code",[t._v("MyComponent")]),t._v(" 变成了 "),n("code",[t._v("YourComponent")]),t._v("，React 会销毁旧的树并完整地重新建立起新的树。")]),t._v(" "),n("h3",{attrs:{id:"对比同一类型的元素"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#对比同一类型的元素"}},[t._v("#")]),t._v(" 对比同一类型的元素")]),t._v(" "),n("p",[t._v("当比较两个相同类型的 React 元素时，React 会保留 DOM 节点，并且仅更新改变了的属性。例如，如果一个元素的 className 从 "),n("code",[t._v("before-class")]),t._v(" 变成了 "),n("code",[t._v("after-class")]),t._v("，React 将只修改 "),n("code",[t._v("className")]),t._v(" 属性。")]),t._v(" "),n("h3",{attrs:{id:"对比同类型的组件"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#对比同类型的组件"}},[t._v("#")]),t._v(" 对比同类型的组件")]),t._v(" "),n("p",[t._v("当一个组件更新时，如果它的类型相同，React 会保留组件实例不变，只会更新组件的 props。然后，调用该组件的 "),n("code",[t._v("render")]),t._v(" 方法，接着 diff 算法会对比前后两次渲染结果的差异，并且更新 DOM。")]),t._v(" "),n("h3",{attrs:{id:"对子节点的-diff"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#对子节点的-diff"}},[t._v("#")]),t._v(" 对子节点的 Diff")]),t._v(" "),n("p",[t._v("对于子节点，React 也会进行 diff 操作：")]),t._v(" "),n("ul",[n("li",[n("p",[n("strong",[t._v("没有 "),n("code",[t._v("key")]),t._v(" 的子节点：")]),t._v(" React 会逐个对比旧树和新树的子节点，如果子节点在两棵树中的位置发生了变化，那么 React 可能会产生不必要的 DOM 更新。")])]),t._v(" "),n("li",[n("p",[n("strong",[t._v("有 "),n("code",[t._v("key")]),t._v(" 的子节点：")]),t._v(" 当子节点拥有 "),n("code",[t._v("key")]),t._v(" 时，React 会使用 "),n("code",[t._v("key")]),t._v(" 来匹配旧树和新树中的子节点。这样，即使子节点的位置发生变化，React 也能够正确地识别出它们，从而避免不必要的 DOM 操作。")])])]),t._v(" "),n("p",[t._v("React 的 diff 算法是非常高效的，因为它减少了对 DOM 的操作次数，而 DOM 操作通常是 Web 应用中性能瓶颈的主要原因。然而，diff 算法并不是完美的，如果开发者不合理地使用 "),n("code",[t._v("key")]),t._v(" 或者在组件结构中做出大的变动，仍然可能会导致性能问题。因此，合理地利用 React 的 diff 算法，可以帮助开发者构建高性能的 Web 应用。")])])}),[],!1,null,null,null);a.default=e.exports}}]);