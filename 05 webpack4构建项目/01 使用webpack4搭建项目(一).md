# webpack4的入门
## 一、开始
打开命令行工具,新建一个文件,进入该文件--初始化 package.json

	mkdir webpack-demo
    cd webpack-demo
    npm init -y //快速初始化项目

执行完之后,webpack-demo里面会多出一个package.json的文件

![](https://raw.githubusercontent.com/limchen233/images/master/webpack4_images/1.png)

在项目根目录下创建两个文件夹 src 和 dist，然后在 src 下创建 index.html,main.js文件

![](https://camo.githubusercontent.com/84865706eaec780cfd0eb778bd18c85eb9b4a752/68747470733a2f2f692e696d6775722e636f6d2f6d52786f7541692e706e67)

![](https://camo.githubusercontent.com/50518636a84237af096f15903a31fb6e7bad4ecc/68747470733a2f2f692e696d6775722e636f6d2f4d4d557178736b2e706e67)

## 二、安装

接着在webpack-demo文件下安装webpack

	npm install -D webpack

注意:webpack4中,webpack命令行相关的内容迁移到了webpack-cli,所以除了安装webpack外,我们还需要安装webpack-cli.

	npm i webpack-cli -D // -D是--save-dev的缩写，意思是将webpack-cli添加到开发依赖中(devDependencies), -S 则是添加到生产依赖中（dependencies）
	
> 到这一步,我的电脑现在直接运行webpack会报错,无法识别webpack命令.

![](https://raw.githubusercontent.com/limchen233/images/master/webpack4_images/3.png)

### 解决方法一：

> Node 8.2+ 版本提供的 npx 命令，可以运行在初始安装的 webpack 包(package)的 webpack 二进制文件（./node_modules/.bin/webpack），所以使用 npx webpack -v 就可以查看版本了，出现版本号也说明webpack安装成功了。

![](https://i.imgur.com/y8JXPkI.png)

### 解决方法二：
> 1、找到项目根目录下的package.json文件并打开，找到"scripts":{}这一段，在其中添加"dev": 
> "webpack"这一行，效果如下：
> 
	"scripts": {
    	"test": "echo \"Error: no test specified\" && exit 1",
    	"dev":"webpack"
  	},
> 2、命令行中输入“npm run dev”打包命令，顺利执行webpack命令（此时会报一个警告和另外一个错，下面再说）
> 
### 注意：此时直接运行 webpack 命令还是不行的，只能用 npm run dev。这是因为局部安装的webpack并不会在系统环境变量里面注册，所以在控制台里输入webpack找不到命令；npm run dev 系统可以找到注册在系统中的npm,自然可以运行。可能全局安装webpack也是一种解决方法（我不想全局安装，所以没有试）。

## 三、配置mode和入口、出口文件

运行 npx webpack 打包命令后，控制台会有警告出现

![](https://raw.githubusercontent.com/limchen233/images/master/webpack4_images/5.png)

原因在于：没有设定 mode，这是 webpack 4 引入的，有两种模式，development 与 production，默认为 production

解决方法：在项目根目录下创建 webpack.config.js 文件，并配置mode

![](https://i.imgur.com/avyi3C5.png)

然后运行 npx webpack 如下图 mode 警告没了，但是错误还在

![](https://i.imgur.com/N2Xjr1q.png)

提示找不到入口文件

之前在 webpack3 中我们是在 webpack.config.js 中配置了一个入口文件。webpack4中有一个很大的特性，就是约定大于配置（目的是压缩体积）。它约定的默认入口文件是src下的index.js,所以我们在这里不用配置（也可以选择配置，会把默认的覆盖），直接把项目src目录下的main.js改为index.js就可以了。然后运行 npx webpack

![](https://i.imgur.com/2wOCUsf.png)

成功运行了！！！（且打包成功后 dist 下出现了一个 main.js 文件）

### 默认打包入口文件：src/index.js

### 默认打包输出文件：dist/main.js

在 index.html 中手动引入打包后的文件，控制台就可以输出ok了。

![](https://i.imgur.com/powbIAf.png)

![](https://i.imgur.com/jlvwSJZ.png)
