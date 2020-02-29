## 在项目中使用react

首先用webpack搭建起一个项目，搭建好后再进行如下操作。（可参考前面的webpack搭建过程）

### 1、安装包
	npm i react react-dom -S

> react：专门用于创建组件和虚拟Dom的，同时组件的生命周期都在这个包中
> 
> react-dom：专门进行Dom操作的，最主要的应用场景就是 ReactDom.render()

### 2、在index.html页面中，创建容器：
	<!--容器，将来使用 React 创建的虚拟DOM元素，都会被渲染到这个指定的容器中 -->
	<div id="app"></div>

### 3、导入包：
	import React from ‘react’
	import ReactDom from ‘react-dom’