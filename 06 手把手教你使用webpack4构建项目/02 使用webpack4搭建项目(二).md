## 四、实现自动打包

如果我们修改了 index.js 中的内容，要重新手动运行 npx webpack 才能更新数据，这样就很繁琐。我们想实现一修改内容，webpack打包命令就自动运行。要实现这个功能需要安装 webpack-dev-server

	npm i webpack-dev-server --save-dev 
	注意： --save-dev参数是将webpack-dev-server作为工程的devDependencies(开发环境依赖)记录在package.json中。这样做是因为webpack-dev-server仅仅在本地开发时才会用到，在生产环境中并不需要它，所以放在devDependencies中是比较恰当的。

安装成功后需要配置。打开 package.json 文件，在 scripts 添加 "dev":"webpack-dev-server",如图:

![](https://raw.githubusercontent.com/limchen233/images/master/img/HkY0sPq.png)

然后在控制台运行 npm run dev,打包成功，如图：

![](https://i.imgur.com/I9SY0NN.png)

此时我们再去修改 index.js 的内容 webpack 就会实现自动打包。

虽然实现了自动打包，但是控制台数据却不会更新，这是为什么呢？

这是因为 webpack-dev-server 将打包后生成的main.js文件托管到了内存中（我们可以认为在项目根目录下有个main.js），而不是项目根目录下的dist文件夹内，而我们在 index.html 中引入的是项目根目录下的 dist/main.js,所以控制台数据不会更新。要想实时更新要重新引入 /main.js,如图：

![](https://i.imgur.com/C2KMqpK.png)

配置dev-server

> --open 自动打开页面（默认浏览器，也可以指定浏览器）
> 
> --hot 热更新（实时刷新页面）
> 
> --port 3000 指定端口

> --host 127.0.0.1 指定主机域名

> --progress 打包记录

> --compress 压缩记录

> --contentBase src 指定托管的根目录

![](https://i.imgur.com/0fBiiWN.png)
