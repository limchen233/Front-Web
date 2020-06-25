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

![](https://raw.githubusercontent.com/limchen233/picgo/master/img/image-20200624231757237.png)

![](https://raw.githubusercontent.com/limchen233/picgo/master/img/image-20200625201600434.png)