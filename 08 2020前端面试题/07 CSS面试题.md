1.标准盒子模型和IE盒子模型区别？怎么适配IE盒子模型？

- 标准盒子模型和IE盒子模型都由margin、border、padding、content组成。

- 标准盒子模型的content的宽和高不包含border、padding，IE的content则包含border和padding。

- 要让网页按标准盒模型去解析，则需要加上`doctype`声明，否则不同的浏览器会按照自己的标准去解析。

- 也可以通过设置box-sizing属性设置

  ​	`box-sizing:content-box`标准盒子模型

  ​	`box-sizing:border-box`IE盒子模型

2.水平垂直居中

flex position margin

```html
<div class="parent" style="height:200px;width:200px;">
  <div class="child" style="height:100px;width:100px;"> Hello</div>
</div>
```



```scss
// CSS3的flex布局--未知高度和宽度
.parent{
  display:flex;
  justify-content:center;
  align-items:center;
}

// CSS3的position定位--未知高度和宽度
.parent{
  position:relative;
  .child{
	  position:absolute;
    left:50%;
    top:50%;
    transform:translate(-50%,-50%);
  }
}

//margin+positon--未知高度和宽度
.parent{
  position:relative;
  .child{
	  position:absolute;
    top:0;
    right:0;
    bottom:0;
    left:0;
    margin:auto;
  }
}

// 利用绝对定位，将元素的top和left属性都设为50%，再利用margin边距，将元素回拉它本身高宽的一半，
// 实现垂直居中。要知道宽和高。
.parent{
  position:relative;
  .child{
	  position:absolute;
    left:50%;
    top:50%;
    margin:-50px 0 0 -50px; 或 margin:-25% 0 0 -25%;
  }
}

// table--当要被居中的元素是inline或者inline-block的时候,可以巧妙的将父级容器设置为
// display:table-cell，配合text-align:center和vertical-align:middle即可以实现水平垂直居中。
.parent{
  display:table-cell;
  text-align:center;
  vertical-align:middle;
}

```

