在`webpack`中可以配置`proxy`来快速获得接口代理的能力。

webpack4:

```javascript
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: {
    index: "./index.js",
  },
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  devServer: {
    port: 8000,
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
      }
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "webpack.html"
    }),
  ],
};
```

修改前端接口请求方式，改为不带域名。（因为现在是同域请求了）

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>dmeo</title>
</head>
<body>
<button id="getlist">获取列表</button>
<button id="login">登录</button>
<script src="https://cdn.bootcss.com/axios/0.19.2/axios.min.js"></script>
<script>
    axios.defaults.withCredentials = true;
    getlist.onclick = () => {
      axios.get('/api/corslist').then(res => {console.log(res.data)});
    }
    login.onclick = () => {
      axios.post('/api/login');
    }
</script>
</body>
</html>
```

