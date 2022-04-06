```javascript
'use strict'
const path = require('path')

function resolve(dir) {
	return path.join(__dirname, dir)
}

const name = 'O2P平台' // page title

const timeStamp = new Date().getTime()

// If your port is set to 80,
// use administrator privileges to execute the command line.
// For example, Mac: sudo npm run
// You can change the port by the following method:
// port = 9527 npm run dev OR npm run dev --port = 9527
const port = process.env.port || process.env.npm_config_port || 9527 // dev port

// All configuration item explanations can be find in https://cli.vuejs.org/config/
module.exports = {
	/**
	 * You will need to set publicPath if you plan to deploy your site under a sub path,
	 * for example GitHub Pages. If you plan to deploy your site to https://foo.github.io/bar/,
	 * then publicPath should be set to "/bar/".
	 * In most cases please use '/' !!!
	 * Detail: https://cli.vuejs.org/config/#publicpath
	 */
	publicPath: '/',
	outputDir: 'dist',
	assetsDir: 'static',
	lintOnSave: process.env.NODE_ENV === 'development',
	productionSourceMap: false,
	devServer: {
		port: port,
		open: true,
		overlay: {
			warnings: false,
			errors: true
		},
		proxy: {
			'/o2p/': {
				// target: 'http://10.22.1.25:30008', // 测试
				target: 'http://192.168.12.18:8000', // 王跃猛
				// target: 'http://192.168.11.56:8000', // 陈小超
				changeOrigin: true
			}
		}
	},
	css: {
		extract: {
			// 打包后css文件名称添加时间戳（防止页面使用缓存）
			filename: `static/css/[name].${timeStamp}.css`,
			chunkFilename: `static/css/[name].${timeStamp}.css`
		}
	},
	configureWebpack: {
		// 输出重构 打包编译后的js文件名称,添加时间戳.（防止页面使用缓存）
		output: {
			filename: `static/js/[name].${timeStamp}.js`,
			chunkFilename: `static/js/[name].${timeStamp}.js`
		},

		// provide the app's title in webpack's name field, so that
		// it can be accessed in index.html to inject the correct title.
		name: name,
		resolve: {
			alias: {
				'@': resolve('src')
			}
		}
	},
	chainWebpack(config) {
		// it can improve the speed of the first screen, it is recommended to turn on preload
		// it can improve the speed of the first screen, it is recommended to turn on preload
		config.plugin('preload').tap(() => [
			{
				rel: 'preload',
				// to ignore runtime.js
				// https://github.com/vuejs/vue-cli/blob/dev/packages/@vue/cli-service/lib/config/app.js#L171
				fileBlacklist: [/\.map$/, /hot-update\.js$/, /runtime\..*\.js$/],
				include: 'initial'
			}
		])

		// when there are many pages, it will cause too many meaningless requests
		config.plugins.delete('prefetch')

		// set svg-sprite-loader
		config.module.rule('svg').exclude.add(resolve('src/icons')).end()
		config.module
			.rule('icons')
			.test(/\.svg$/)
			.include.add(resolve('src/icons'))
			.end()
			.use('svg-sprite-loader')
			.loader('svg-sprite-loader')
			.options({
				symbolId: 'icon-[name]'
			})
			.end()

		config.when(process.env.NODE_ENV !== 'development', config => {
			config
				.plugin('ScriptExtHtmlWebpackPlugin')
				.after('html')
				.use('script-ext-html-webpack-plugin', [
					{
						// `runtime` must same as runtimeChunk name. default is `runtime`
						inline: /runtime\..*\.js$/
					}
				])
				.end()
			config.optimization.splitChunks({
				chunks: 'all', // 表示显示块的范围，有三个可选值：initial(初始块)、async(按需加载块)、all(全部块)，默认为all;
				cacheGroups: { // 缓存组
					libs: {
						name: 'chunk-libs', // 拆分出来块的名字(Chunk Names)，默认由块名和hash值自动生成
						test: /[\\/]node_modules[\\/]/,
						priority: 10, // 权重，表示缓存的优先级
						chunks: 'initial' // 只打包最初依赖的第三方
					},
					elementUI: { // 将elementUI拆分为单个包
						name: 'chunk-elementUI',
						priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
						test: /[\\/]node_modules[\\/]_?element-ui(.*)/ // in order to adapt to cnpm
					},
					commons: {
						name: 'chunk-commons',
						test: resolve('src/components'), // 缓存组的规则，表示符合条件的的放入当前缓存组，值可以是function、boolean、																string、RegExp，默认为空；
						minChunks: 3, // 表示被引用次数，默认为1；
						priority: 5,
						reuseExistingChunk: true // 表示可以使用已经存在的块，即如果满足条件的块已经存在就使用已有的，不再创建一个新的块。
					}
				}
			})
			// https:// webpack.js.org/configuration/optimization/#optimizationruntimechunk
			config.optimization.runtimeChunk('single')
		})
	}
}

```

