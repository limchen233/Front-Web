## 一、webpack结合vue的使用

### vue-loader
安装vue的包:

	npm i vue -S

由于在webpack中,推荐使用.vue这个组件模板文件定义组件,所以需要安装能解析这种文件的loader:vue-loader vue-template-compiler,安装指令:

	npm i vue-loader vue-template-compiler -D

在webpack.config.js中配置:

![](https://i.imgur.com/ed1Gti8.png)

> 注意:使用.vue的方式定义组件,如果打包失败,并提示导入的vue包是runtime-only,则要用render函数渲染组件,不要用components.
使用render函数时,html文件里不需要引用组件名.render函数里的组件会覆盖div里的内容.所以使用render函数时只能有一个组件.