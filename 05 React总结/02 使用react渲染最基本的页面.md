## 在项目中使用react

首先用webpack搭建起一个项目，搭建好后再进行如下操作。（可参考前面的webpack搭建过程）

### 1、安装包
	npm i react react-dom -S // -S是在开发和生产依赖中都会注入，因为 react 和 react-dom 开发、生产中都会用到

> react：专门用于创建组件和虚拟Dom的，同时组件的生命周期都在这个包中
> 
> react-dom：专门进行Dom操作的，最主要的应用场景就是 ReactDom.render()

### 2、在index.html页面中，创建容器：
	<!--容器，将来使用 React 创建的虚拟DOM元素，都会被渲染到这个指定的容器中 -->
	<div id="app"></div>

![](https://i.imgur.com/GAeeLKA.png)

### 3、导入包：
	import React from 'react'
	import ReactDom from 'react-dom'

**注：这两个包导入的时候，必须这么写。否则会报错。**

### 4、创建虚拟DOM元素

有三个基本参数

> 参数1：创建的元素类型，字符串，表示元素的名称
> 
> 参数2：是一个对象或null，表示当前这个DOM元的属性

> 参数3：子节点（包括其它虚拟DOM或文本子节点）

> 参数n：其它子节点

    const myh1 = React.createElement('h1',null,'这是h1标签') // <h1>这是h1标签</h1>    h1标签没有属性

    const myh1 = React.createElement('h1',{id:'h1',title:'this is h1'},'这是h1标签') // <h1 id="myh1" title="this is h1">这是h1标签</h1>    带属性的h1标签

### 5、使用ReactDom把虚拟DOM渲染到页面上

有两个基本参数

参数1：要渲染的虚拟DOM元素

参数2：指定页面上一个容器,注意是容器

    ReactDom.render(myh1,document.getElementById('app'))

事例1：不带属性的h1标签

![](https://i.imgur.com/bfEBNtO.png)

![](https://i.imgur.com/lf8tHlR.png)

事例2：带属性的h1标签

![](https://i.imgur.com/znVYcg1.png)

![](https://i.imgur.com/rtkSfVV.png)