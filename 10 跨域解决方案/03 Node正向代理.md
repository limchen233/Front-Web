在`webpack`中可以配置`proxy`来快速获得接口代理的能力。

我们用`vue-cli`创建项目后，会生成一个`config/index.js`的文件，在`index.js`中配置`proxy`。

在`dev`属性下配置`proxyTable`

```javascript
module.exports={
  dev:{
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: { // 跨域配置
      '/api':{ // 匹配所有以'/api'开关的请求路径
        target:'http://192.168.102.188:9091', // 代理目标的基础路径
        ChangeOrigin:true,// 支持跨域
        pathRewrite:{// 重写路径：去掉路径中开头的'/api'}
          '^/api':''
        }
      }
    }
  }
}
```



代码中的target是你要请求的接口地址，一般是`ip` + 端口号。

`ChangeOrigin`属性是是否支持跨域，要设为`true`，才支持跨域。

然后在发请求时将原来的请求地址改为`/api`

以上设置好后就可以跨域访问了。

还没完，继续看。。。。

有时候我们项目打包后可能会出点小问题，就是我们放在`assets`下的图片打包上传后没有显示出来，不用急，修改下路径就可以了。

还是`config/index.js`文件，找到`build`属性下的`assetsPublicPath：'/'`，修改为`assetsPublicPath：'./'`就可以了。
