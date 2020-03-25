项目中，父组件使用了 ref 属性调用子组件的方法突然报错了，代码和报错如下：

![](https://i.imgur.com/yhT7jfW.png)

![](https://i.imgur.com/xqU6mMH.png)

![](https://i.imgur.com/20jxefk.png)

![](https://i.imgur.com/YtukVqK.png)

解决方法：把 mounted 里的调用放到一个定时器里就可以了
我的理解是因为 ref 属性初始渲染时，它们还不存在，所以不能访问。加个定时器延时执行。但是其他使用 ref 属性调用的方法又没有报错，百思不得其解。

    setTimeout(() => {
      this.tabMap[this.tabName] && this.tabMap[this.tabName]()
    }, 1000)