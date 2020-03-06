写项目的时候，有个重置表单的需求，从修改切换到新建时也要清空字段。为了节省代码资源开销，用了同一个表单，字段也是一样的。使用了resetFields()方法，但是却没起作用。（如果是分开写的应该不会出现这个问题）

出现这个问题的条件是：先打开修改页面，打开修改页面会调用后端的查询详情接口，所以对参数赋了值，这时候再去打开新建，点重置表单是没法清空数据的。（如果你先打开的是新建页面，然后填了些数据，这时候点重置是有效的）

**关于 resetFields() 方法：**
> 1、此方法用于将form表单的数据设置为初始值
> 
> 2、而这个初始值是在 form 的 mounted 生命周期被赋值上去的。所以，在 form 的 mounted 之前，> 如果给 form 表单赋值了，那么后面调用 resetFields()都是无效的，因为 form 表单的初始值已经在 mounted 之前就被赋值了。重置也只是回到了 mounted 之前的初始值。

解决方法：

所以我们要在 form 表单 mounted 之后再进行赋值操作这样就可以完美解决问题了，在点击编辑赋值的时候使用 "this.$nextTick" 方法即可，nextTick里面的代码会在DOM更新后执行。如图：

![](https://i.imgur.com/iK4UVvh.png)


这样就完美解决了！

顺便说下 resetFields() 的使用：
首先要在表单上绑定要清空的 form 数据和添加 ref，form 是个对象

![](https://i.imgur.com/C4uyCoS.png)

![](https://i.imgur.com/GIM9nDf.png)

然后在需要用到的地方调用：

    this.$refs.ruleForm.resetFields()