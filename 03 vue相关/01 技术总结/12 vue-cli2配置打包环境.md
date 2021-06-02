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
// 修改package.json文件的`scripts`属性，修改打包命令
"scripts": {
		"dev": "webpack-dev-server --inline --progress --config build/webpack.dev.conf.js",
		"start": "npm run dev",
    "lint": "eslint --ext .js,.vue src",
    "build:dev": "cross-env NODE_ENV=development ENV_CONFIG=dev node build/build.js",
    "build:test": "cross-env NODE_ENV=testing ENV_CONFIG=test node build/build.js",
    "build:prod": "cross-env NODE_ENV=production ENV_CONFIG=prod node build/build.js"
	},
```

> `NODE_ENV=xxx ENV_CONFIG=xxx` 设置` webpack `打包时的 `NODE_ENV、 ENV_CONFIG `环境变量

如下图：

![](https://github.com/limchen233/picgo/blob/master/img/image-20210520150634905.png)

以后可根据当前环境使用相对应的打包命令：

```
开发环境: npm run build:dev
测试环境: npm run build:test
生产环境: npm run build:prod
```



#### 3.修改项目`config`文件夹下的配置文件

- **添加`test.env.js`文件**

	```javascript
	'use strict'
	const merge = require('webpack-merge')
	const devEnv = require('./dev.env')
	
	module.exports = merge(devEnv, {
		NODE_ENV: '"testing"',
		ENV_CONFIG: '"test"',
		BASE_URL: '"http://localhost:8084/disNx"' // 设置开发环境接口地址
	})
	```

- **修改`dev.env.js`文件**

	```javascript
	'use strict'
	const merge = require('webpack-merge')
	const prodEnv = require('./prod.env')
	
	// 获取NODE_ENV参数
	// const env = process.env.NODE_ENV
	
	module.exports = merge(prodEnv, {
		NODE_ENV: '"development"',
		ENV_CONFIG: '"dev"', // 添加ENV_CONFIG属性
		BASE_URL: '"http://xxxx"' // 添加测试环境请求url，根据自己情况设置
	})
	```

- **修改`prod.env.js`文件**

	```javascript
	'use strict'
	module.exports = {
		NODE_ENV: '"production"',
		ENV_CONFIG: '"prod"', // 添加ENV_CONFIG属性
		BASE_URL: '"http://xxxx"' // 添加生产环境请求url，根据自己情况设置
	}
	```

	> 注意各属性的value值，单引号内有双引号。

- **修改`index.js`文件**

	`build`属性下添加以下配置：

	```javascript
	devEnv: require('./dev.env'),
	testEnv: require('./test.env'),
	prodEnv: require('./prod.env'),
	```

	如图：

	![](https://github.com/limchen233/picgo/blob/master/img/image-20210520155003519.png?raw=true)

	> 参数名与文件名对应，此处参数将在` build/webpackage.prod.conf.js` 中使用到

修改完后的`config`文件夹目录：

![image-20210520160013571](https://github.com/limchen233/picgo/blob/master/img/image-20210520160013571.png?raw=true)



#### 4.修改项目`build`文件夹下的配置文件

##### 添加各打包环境设置：

- **修改`build.js`文件**

	```javascript
	// process.env.NODE_ENV = 'production'  // 将此行代码注释
	
	// const spinner = ora('building for production...')
	const spinner = ora('building for ' + process.env.NODE_ENV + ' of ' + process.env.ENV_CONFIG + ' production...')
	```

	如图所示

	![image-20210520163059525](https://github.com/limchen233/picgo/blob/master/img/image-20210520163059525.png?raw=true)

- 修改`utils.js`文件的`assetsPath`

	原代码：

	```javascript
	// 原代码
	exports.assetsPath = function (_path) {
	  const assetsSubDirectory = process.env.NODE_ENV === 'production'
	    ? config.build.assetsSubDirectory
	    : config.dev.assetsSubDirectory
	
	  return path.posix.join(assetsSubDirectory, _path)
	}
	
	// 修改后
	exports.assetsPath = function(_path) {
		const assetsSubDirectory =
			process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'testing'
				? config.build.assetsSubDirectory
				: config.dev.assetsSubDirectory
	
		return path.posix.join(assetsSubDirectory, _path)
	}
	```

	

- 修改`webpack.base.conf.js`文件内的`publicPath`

	

	```javascript
	// 原代码
	output: {
	  path: config.build.assetsRoot,
	  filename: '[name].js',
	  publicPath: process.env.NODE_ENV === 'production'
	    ? config.build.assetsPublicPath
	    : config.dev.assetsPublicPath
	},
	    
	// 修改后
	output: {
		path: config.build.assetsRoot,
		filename: '[name].js',
		publicPath:
			process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'testing'
				? config.build.assetsPublicPath
				: config.dev.assetsPublicPath
	},
	```

	

- 修改`webpack.prod.conf.js`文件

	```javascript
	// 原代码
	const env = require('../config/prod.env')
	
	
	// 修改后
	const env = config.build[process.env.ENV_CONFIG+'Env']
	```

	将会根据各打包环境设置的参数选择读取 `config/index.js` 文件下 `build` 参数中设置的环境配置参数，从而读取到 `config` 目录下配置的各打包环境的`js`文件

	

- 修改`vue-loader.conf.js`文件

	```javascript
	// 原代码
	const isProduction = process.env.NODE_ENV === 'production'
	const sourceMapEnabled = isProduction
	  ? config.build.productionSourceMap
	  : config.dev.cssSourceMap
	  
	// 修改后
	const isProduction = process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'testing'
	const sourceMapEnabled = isProduction
	  ? config.build.productionSourceMap
	  : config.dev.cssSourceMap
	```

	

#### 5.引入配置的接口请求地址

我的项目中所有请求统一在`api`文件中管理，在`js`文件中获取到**各环境配置**的请求地址将其添加到请求路径中。

![image-20210520164942620](https://github.com/limchen233/picgo/blob/master/img/image-20210520164942620.png?raw=true)

