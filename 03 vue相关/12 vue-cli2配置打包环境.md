目前`vue-cli2`上原配置是只有开发环境`dev`和线上环境`prod`的配置，但是我们实际场景上还有很多需要一个测试环境test,下面就是对测试环境的配置，将测试环境和线上环境的打包代码分开就不需要切来切去了。

1.找到项目根目录下的`build`文件夹里的`build.js`文件，然后复制一份出来将文件名修改为`build-test.js`。内容修改为如下图（修改三个地方）：

![image-20210519172209827](https://github.com/limchen233/picgo/blob/master/img/image-20210519172209827.png?raw=true)



2.复制一份`build/webpack.prod.conf.js`文件命名为`build/webpack.test.conf.js` 主要修改这一处地方:

![image-20210519173422799](https://github.com/limchen233/picgo/blob/master/img/image-20210519173422799.png?raw=true)

因为 `vue`打包后自动会生产`dist`文件夹，如果你不想覆盖`dist`文件夹，可以修改打包输出文件夹，还是`build/webpack.test.conf.js`文件:

![image-20210519174139396](https://github.com/limchen233/picgo/blob/master/img/image-20210519174139396.png?raw=true)



3.复制一份`config/prod.env.js`文件命名为`config/test.env.js`

```javascript
// test.env.js

'use strict'
const merge = require('webpack-merge')
const devEnv = require('./dev.env')

module.exports = merge(devEnv, {
	NODE_ENV: '"test"'
  // BASE_URL: '"https://test.com"' // 可以添加url
})
```

4.在`package.json`文件里添加一条` npm run build:test` 的启动项

![image-20210519174752710](https://github.com/limchen233/picgo/blob/master/img/image-20210519174752710.png?raw=true)

此时运行`npm run build:test`测试环境就打包成功了。可以看到test的代码已构建到dist目录下。

但是现在去访问页面发现是空白的，控制台报404，就是资源没加载成功。

解决方法：修改`build/webpack.base.conf.js`文件

![image-20210519175233400](https://github.com/limchen233/picgo/blob/master/img/image-20210519175233400.png?raw=true)

将`test`环境添加进去就可以了。

重新打包运行，页面OK！



### **---------------------更新---------------------------**

按上面配置好后，打包是没问题了，但是我发现在本地开发环境运行有问题。所以今天要重新改造一下。

#### 1.安装依赖

```javascript
npm i --save-dev cross-env // 运行跨平台设置和使用环境变量的脚本,能够提供一个设置环境变量的scripts，让你能够以unix方式设置环境变量，然后在windows上也能兼容运行。
```

#### 2.修改`package.json`文件

```json
// 修改package.json文件的`scripts`属性
"scripts": {
		"dev": "webpack-dev-server --inline --progress --config build/webpack.dev.conf.js",
		"start": "npm run dev",
    "lint": "eslint --ext .js,.vue src",
    "build:dev": "cross-env NODE_ENV=development ENV_CONFIG=dev node build/build.js",
    "build:test": "cross-env NODE_ENV=testing ENV_CONFIG=test node build/build.js",
    "build:prod": "cross-env NODE_ENV=production ENV_CONFIG=prod node build/build.js"
	},
```

如下图：

![](https://github.com/limchen233/picgo/blob/master/img/image-20210520150634905.png)

