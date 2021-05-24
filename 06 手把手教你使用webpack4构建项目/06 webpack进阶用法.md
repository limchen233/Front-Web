##### 自动清理构建产物

`webpack`每次构建的时候不会清理目录，造成构建的输出目录output 文件越来越多。

使用插件`clean-webpack-plugin`，默认会删除output指定的输出目录

```javascript
1.安装插件
npm i clean-webpack-plugin -D

2.在webpack配置文件中引入插件
const CleanWebpackPlugin = require('clean-webpack-plugin')

3.配置插件
module.exports = {
  entry:{},
  output:{},
  plugins:[
    new CleanWebpackPlugin()
  ]
}
```

##### 自动补齐`CSS3`前缀

因为浏览器没有统一的标准，导致某些`css3`属性在不同的浏览器上需要加对应的前缀才能生效，手动增加肯定是繁琐的，我们可以利用插件去自动增加。

`postcss-loader`和`autoprefixer`

```javascript
1.安装插件
npm i postcss-loader autoprefixer -D

2.配置插件
module.exports = {
	// 打包输出文件
  output:{
    filename:'bundle.js'
  },
  
  // 插件配置
  plugins:[],
	
	//loader配置
	module:{
		rules:[
		  {
		    test:/.css$/, // 解析css文件
		    use:[ // loader调用是链式调用，从右向左，所以要先写style-loader
		      'style-loader',
		      'css-loader',
		      {
		      	loader:'postcss-loader',
		      	options:{
		      		plugins: () => [
		      			require('autoprefixer')({
		      				browsers:['last 2 version','1%','ios 7']
		      			})
		      		]
		      	}
		      }
		    ]
		  },
		  {
		    test:/.scss$/, //解析scss文件
		    use:[ // loader调用是链式调用，从右向左，所以要先写style-loader
		      'style-loader',
		      'css-loader',
		      'sass-loader'
		    ]
		  }
		]
	}
}

```

