## 四、实现自动打包

如果我们修改了 index.js 中的内容，要重新手动运行 npx webpack 才能更新数据，这样就很繁琐。我们想实现一修改内容，webpack打包命令就自动运行。要实现这个功能需要安装 webpack-dev-server

	npm i webpack-dev-server -D

安装成功后需要配置。打开 package.json 文件，在 scripts 添加 "dev":"webpack-dev-server",如图:

![](https://i.imgur.com/HkY0sPq.png)

然后在控制台运行 npm run dev,打包成功，如图：

![](https://i.imgur.com/I9SY0NN.png)

此时我们再去修改页面内容 webpack 就会实现自动打包。

虽然实现了自动打包，但是数据却不会更新，这是为什么呢？

这是因为 webpack-dev-server 将打包后生成的main.js文件托管到了内存中（我们可以认为在项目根目录下有个main.js），而不是项目根目录下的dist文件夹内，而我们在 index.html 中引入的是项目根目录下的 dist/main.js,所以页面数据不会更新。要想实时更新要重新引入 /main.js,如图：

![](https://i.imgur.com/C2KMqpK.png)