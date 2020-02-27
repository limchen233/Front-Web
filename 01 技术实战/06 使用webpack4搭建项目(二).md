## 四、实现自动打包

如果我们修改了 index.js 中的内容，要重新手动运行 npx webpack 才能更新数据，这样就很繁琐。我们想实现一修改内容，webpack打包命令就自动运行。要实现这个功能需要安装 webpack-dev-server

	npm i webpack-dev-server -D

安装成功后需要配置。打开 package.json 文件，在 scripts 添加 "dev":"webpack-dev-server",如图:

![](https://i.imgur.com/HkY0sPq.png)

然后在控制台运行 npm run dev,打包成功，如图：

![](https://i.imgur.com/I9SY0NN.png)