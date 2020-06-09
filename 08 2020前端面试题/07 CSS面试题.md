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

3.relative/absolute/fixed区别？

- relative不会脱离文档流，相对于自己定位。
- absolute和fixed会脱离文档流，fixed是相对于浏览器，absolute是相对于有定位的父元素或祖先元素。

**4.响应式布局**

通过媒体查询（@media screen）实现

（1）媒体查询原则

- 向上兼容，向下覆盖
- 从小到大用 768px~992px~1200px（mix-width）
- 从大到小 1200px~992px~768px（max-width）

（2）min/max-width和min/max-device-width区别

- min/max-width：它是指当前可视区域的宽度，在PC端和移动端都能正常响应
- min/max-device-width：指当前设备的宽度，在移动端正常响应，PC端不响应（PC端改变的是浏览器宽度，不是设备）

**5.页面上有2000个相同的元素要隐藏，怎么做性能优化？**

- 可以将元素的属性visibility设置为hidden，设置为hidden属性后，元素还占位置，不会发生重排（回流）

**6.display:none与visibility:hidden区别？**

a.隐藏元素：

- display:none 隐藏后的元素不占据任何空间。它的宽度、高度等各种属性值都将“丢失”
- visibility:hidden 隐藏的元素空间依旧存在。它仍具有高度、宽度等属性值

b.性能角度：

- display:none 会触发 reflow（回流）
- visibility:hidden 只会触发 repaint（重绘），因为没有发现位置变化

c.对子元素的影响：

- display:none 一旦父节点元素应用了 display:none，父节点及其子孙节点元素全部不可见，而且无论其子孙元素如何设置 display 值都无法显示；
- visibility:hidden 一旦父节点元素应用了 visibility:hidden，则其子孙后代也都会全部不可见。不过存在隐藏“失效”的情况。当其子孙元素应用了 visibility:visible，那么这个子孙元素又会显现出来。