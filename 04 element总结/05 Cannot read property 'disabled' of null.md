项目今天突然报了个错：cannot read property 'disabled' of null

![image-20200427152808230](https://raw.githubusercontent.com/limchen233/images/master/img/image-20200427152808230.png)

报错的原因是项目中使用了element的`el-dropdown`组件，而`el-dropdown`组件必须要有子组件`el-dropdown-menu`,否则就会报错。

我在项目中的`el-dropdown-menu`中使用了`v-if`判断，由于条件为false，所以没有显示`el-dropdown-menu`，然后就报错了。

解决方法：`v-if`写在别的地方或可以写一个空的`<el-dropdown-menu></el-dropdown-menu>`标签

