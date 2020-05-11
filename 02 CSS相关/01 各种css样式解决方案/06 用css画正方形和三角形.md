1、容器和子元素高度都为0的情况, 如何用`CSS`画出正方形?

用`padding`和`border`都可以

```html
// padding方式
<div class="father" style="height:0;width:100px;">
  <div class="children" style="height:0;padding:50%;background:red;"></div>
</div>
```

![image-20200422095605690](https://raw.githubusercontent.com/limchen233/images/master/img/image-20200422095605690.png)

![image-20200422095645184](https://raw.githubusercontent.com/limchen233/images/master/img/image-20200422095645184.png)

```html
// border方式
<div class="parent" style="height:0;">
  <div class="children" style="height:0;width:0;border:50px solid royalblue;">
    
  </div>
</div>
```



2、纯`CSS`实现绘制各种三角形（各种角度）

三角形实现原理：宽度width为0；height为0；`transparent`透明色

（1）等边三角形：设置某条边的border-方向：长度 solid red，其他边使用border-方向：长度 solid transparent。**通过设置每个方向的边框透明度呈现不同的三角形。**

（2）直角三角形：设置border-top或border-bottom为不透明。如果斜边是在三角形的右边，就设置右边的边框为透明色；若斜边是在三角形的左边，设置左边的边框为透明色。

```html
// 等边三角形
<style>
  .parent > .children{
    width: 0;
    height: 0;
    border-top: 100px solid red; // top改为bottom就可以将三角形倒立过来
    border-right: 50px solid transparent;
    border-left: 50px solid transparent;
  }
</style>
<div class="parent">
  <div class="children"></div>
</div>
```

![image-20200422142550700](https://raw.githubusercontent.com/limchen233/images/master/img/image-20200422142550700.png)

```html
// 直角三角形
<style>
  .parent > .children{
    width: 0;
    height: 0;
    border-top: 100px solid red;
    border-right: 100px solid transparent;
  }
</style>
<div class="parent">
  <div class="children"></div>
</div>
```

![image-20200422142828907](https://raw.githubusercontent.com/limchen233/images/master/img/image-20200422142828907.png)