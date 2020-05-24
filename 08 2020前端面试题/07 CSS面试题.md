1.标准盒子模型和IE盒子模型区别？怎么适配IE盒子模型？

- 标准盒子模型和IE盒子模型都由margin、border、padding、content组成。

- 标准盒子模型的content的宽和高不包含border、padding，IE的content则包含border和padding。

- 要让网页按标准盒模型去解析，则需要加上`doctype`声明，否则不同的浏览器会按照自己的标准去解析。

- 也可以通过设置box-sizing属性设置

  ​	`box-sizing:content-box`标准盒子模型

  ​	`box-sizing:border-box`IE盒子模型

2.水平垂直居中

flex position margin

```scss
// flex布局
div{
	display:flex;
  justify-content:center;
  align-items:center;
}

// position定位

```

