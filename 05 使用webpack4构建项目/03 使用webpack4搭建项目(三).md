## 五、webpack插件

自动打包后，浏览器默认进入的是项目根目录，而不是项目的首页，我们需要手动点击src才会进入项目首页，如图：

![](https://i.imgur.com/aVbSTER.png)

怎么样能自动进入项目首页呢？我们需要安装 html-webpack-plugin，它能帮我们把页面生成到内存中去。安装好后要在 webpack.config.js 中配置。

	npm i html-webpack-plugin -D

插件在 webpack.config.js 的配置分三步走：

> 1、引入插件
>
> 2、创建插件实例
>
> 3、挂载到暴露的对象上

![](https://i.imgur.com/kcYxCxp.png)

配置好后，重新运行 npm run dev，此时就自动打开项目首页了。

注意，这个时候我们查看项目首页源码，这个插件帮我们在底部自动插入了打包后的 main.js，如图：

![](https://i.imgur.com/22YdohF.png)

所以上面我们手动引入的 main.js 就可以删掉了。
