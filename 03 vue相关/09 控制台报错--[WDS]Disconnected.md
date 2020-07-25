如题，`vue`项目正常请求下，经常报错`[WDS]:Disconnected`,解决方法：

找到`config/index.js`内的`dev`配置，添加一行代码：

```
disableHostCheck:true,
```

![](https://raw.githubusercontent.com/limchen233/picgo/master/img/image-20200725102353560.png)

OK，问题解决！