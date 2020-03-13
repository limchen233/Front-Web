##  CSS 在 react 中的应用
### 一、行内样式

（一）基本用法

在 react 中的 JSX 语法中是不能像 vue 中那样，直接在标称上以字符串在形式书写 CSS 样式，它会报错：

![](https://i.imgur.com/K6nZvfz.png)

![](https://i.imgur.com/hC2WS1A.png)

由图上报错内容可知，在 JSX 中书写行内样式要以对象的形式，不能用字符串：

![](https://i.imgur.com/A7GQaU5.png)

![](https://i.imgur.com/NEmt2jc.png)

样式成功显示！

> 注意：
> 
> 1、样式中的第一个 {} 代表要开始写 JS 代码了，第二个 {} 代表对象。样式的值要用 '' 号包裹，除纯数字外。

> 2、多个样式以逗号隔开，之前属性名带横线的 ‘-’ 用驼峰命名法。

![](https://i.imgur.com/uL3s4Qg.png)

![](https://i.imgur.com/HiFDSWT.png)