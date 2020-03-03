话不多说，直接上代码

![](https://i.imgur.com/yPBBxt4.png)

![](https://i.imgur.com/oX7cKBk.png)

这样就能够渲染出嵌套的html元素结构了。不过这种方法有点麻烦，因为每次都要调用 React.createElement API,其实创建DOM元素最简单的方法就是写html代码，但是在JS中写html代码是不允许的。惊喜的是，在 react 中就可以！前提是需要安装第三方loader--babel

## 安装babel

    npm i babel-core babel-loader babel-plugin-transform-runtime -D
    npm i babel-preset-env babel-preset-stage-0 babel-preset-react -D
> babel-preset-react:能够识别转换JSX语法的包

安装好后，首先要在 webpack.config.js里配置 module

![](https://i.imgur.com/fRa6R4G.png)

最后还要在项目根目录中创建一个 .babelrc 文件

![](https://i.imgur.com/d9txiIM.png)

.babelrc是一个json格式的文件，里面配置我们刚才安装的babel相关包和插件