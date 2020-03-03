## 一、DOM和虚拟DOM

### DOM和虚拟DOM的区别

DOM：浏览器中的概念，用JS对象来表示页面上的元素，并提供了操作DOM对象的API。

React中的虚拟DOM：是框架中的概念，是程序员用JS对象来模拟页面上的DOM元素和DOM嵌套关系。目的是> 为了实现页面中DOM元素的高效更新。

## 二、Diff算法

### tree diff：新旧两颗DOM树逐层对比的过程就是tree diff；当整颗DOM树逐层对比完毕，则所有需要被按需更新的元素必然能够找到。

### component diff：在进行 tree diff 的时候，每一层中组件级别的对比叫做 component diff

> 如果对比前后，组件的类型相同，则暂时认为此组件不需要更新；
>  
> 如果对比前后，组件的类型不同，则需要移除旧组件，创建新组件，并追加到页面中。
>  
### element diff：在进行组件对比的时候，如果两个组件类型相同，则需要进行元素级别的对比，这叫做element diff。

![](https://i.imgur.com/p4lT22R.png)

## 三、JSX语法

就是符合 xml 规范的 JS 语法；（语法格式相对来说，要比HTML严谨很多）。

本质：在运行的时候，被转换成了 React.createElement 形式来执行。