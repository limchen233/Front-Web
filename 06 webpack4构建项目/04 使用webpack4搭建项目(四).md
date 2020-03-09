## 模块加载器

#### webpack无法处理CSS文件,less文件,scss文件以及所有的url地址,所以webpack需要第三方工具加载器

### （1）style-loader/css-loader

输入以下命令进行本地项目安装:

`npm i style-loader css-loader -D`

安装好后要在webpack.config.js文件中配置:

![](https://i.imgur.com/MPXlkoy.png)

### （2）less-loader/sass-loader(两个安装一个即可)

输入以下命令进行本地项目安装:

#### less-loader

`npm i less-loader less -D // less为依赖包` 

#### sass-loader

`npm i sass-loader node-sass -D // node-sass为依赖包`

安装好后要在webpack.config.js文件中配置:

![](https://i.imgur.com/PYVaOGx.png)

### （3）url-loader（处理图片和字体的模块）

安装模块

	npm i url-loader file-loader -D

webpack.config.js文件的配置:

![](https://i.imgur.com/bZkJVlB.png)

![](https://i.imgur.com/hdHfbY6.png)

> url地址传参数,limit是固定写法.limit给定的值是图片的大小,单位是byte.如果我们引用的图片大于或等于给定的值,则不会被转为base64格式的字符串,如果图片小于给定的值,则会被转为base64的字符串


在webpack.config.js文件中处理字符:
![](https://i.imgur.com/q8zPhbl.png)