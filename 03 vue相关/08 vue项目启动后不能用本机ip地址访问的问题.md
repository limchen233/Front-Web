今天做移动端的项目，需要在真机上调试套用的壳子，刚开始项目部署在服务器后再调试，这样就比较麻烦，每次改完代码都要commit和build才行。后来就想通过本地测试。碰到个问题是项目启动后，输入本机`ip`地址加端口号却访问不到项目，电脑防火墙关掉也不行。后来发现应该是`vue-cli`版本问题，我的版本是`2.x`。`3.x`的默认用`localhost`或`ip`都可以访问。

`2.x`版本解决方法：

第一种：打开`config/index.js`，找到`dev`对象下的`host`属性，改为自己的本机`ip`地址或`‘0.0.0.0’`（如果配置的是4个0，项目启动后，要手动输入本机`ip`地址才能访问）,配置好后要重新启动项目。

![](https://raw.githubusercontent.com/limchen233/picgo/master/img/image-20200702173202563.png)

第二种：直接在`package.json`里的`scripts`下的`dev`属性里加上`--host 你的ip地址或0.0.0.0`，然后重新启动项目

![](https://raw.githubusercontent.com/limchen233/picgo/master/img/image-20200702173557927.png)

——————————————————————更新————————————————————————————

如果上面填写的是具体的`IP`地址，项目是不能在`localhost`下运行的。`config/index.js`和`package.json`的配置要改为`0.0.0.0`，这样就既可以用`localhost`访问，又支持`ip`访问项目（输入本地`ip`地址，不是4个0）