今天使用element组件遇到一个问题：在一个 el-dialog 里面使用 el-select 选择器和 el-input 输入框，因为 el-input 默认尺寸看着有点大，就加了 size="medium" 属性，这个时候 el-select 和 el-input 就不一样大了。同样给 el-select 添加 size="medium" 属性，大小是一样了，但是下拉选的图标没有居中。如图：

![](https://i.imgur.com/uh348l5.png)

解决方法一：都恢复到默认大小

解决方法二：el-input 添加 size="medium" 属性后，输入框高度变为36px，默认是40px。
所以把 el-select 下的 input 高度也改为36px，它们高度就一样大小了。同时把 el-select 上的 size="medium" 属性去掉。

![](https://i.imgur.com/8w2y8Jw.png)

修改后的页面样式：

![](https://i.imgur.com/t6BrCXi.png)