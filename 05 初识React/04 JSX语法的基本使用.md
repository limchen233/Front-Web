首先我们要知道 **jsx 语法的本质：**并不是直接把 jsx 渲染到页面上，而是内部先转换成了 createElement 形式再渲染的；

**在 jsx 中混合写入 js 表达式**：在 jsx 语法中，要把 JS 代码写到 `{ }` 中

   + 渲染数字
   + 渲染字符串
   + 渲染布尔值
   + 为属性绑定值
   + 渲染jsx元素

![](https://i.imgur.com/10vSY4B.png)

![](https://i.imgur.com/DCSbJ6O.png)

![](https://i.imgur.com/VDULDge.png)

**注意事项：**

**在 jsx 语法中，标签必须成对出现，如果是单标签，则必须自闭和！**

**在 jsx 中 写注释**：要写在 {} 中，推荐使用`{ /* 这是注释 */ }`

![](https://i.imgur.com/MMkh9Xc.png)

**为 jsx 中的元素添加class类名**：需要使用`className` 来替代 `class`；`htmlFor`替换`for`属性

**在JSX创建DOM的时候，所有的节点，必须有唯一的根元素进行包裹；**

> 当 编译引擎，在编译JSX代码的时候，如果遇到了`<`那么就把它当作 HTML代码去编译，如果遇到了 `{}` 就把 花括号内部的代码当作 普通JS代码去编译；
