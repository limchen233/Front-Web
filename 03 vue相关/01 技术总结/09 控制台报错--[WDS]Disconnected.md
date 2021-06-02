如题，`vue`项目正常请求下，经常报错`[WDS]:Disconnected`,虽然对请求无影响，但对于一个追求完美的程序员来说这忍不了。解决方法：

找到`config/index.js`内的`dev`配置，添加一行代码：

```
disableHostCheck:true,
```

![](https://raw.githubusercontent.com/limchen233/picgo/master/img/image-20200725102353560.png)

OK，问题解决！

========更新========更新==========

经过测试发现，出现这个错误是因为我把`node_modules`下的`sockjs-client/dist/sockjs.js`内的第1605行代码`self.xhr.send(payload)`注释掉了。（添加注释的原因是刷新页面时发送了没必要的请求）把这个注释拿掉就可以了。也不用加`disableHostCheck:true`。