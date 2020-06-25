## 使用vue-cli初始化项目步骤

### 1.全局安装vue-cli工具
​    npm/cnpm i vue-cli -g
### 2.初始化一个项目
​    vue init -y/vue init webpack 项目名

> **项目名不能有大写字母**
> 
> 如果是用的 vue init -y 直接在项目根目录下初始化就好了，如果是用的 vue init webpack 项目名，则要按提示操作

### 3.启动项目
   npm start/npm run dev
### 4.生产环境打包

  npm run build

  执行成功后会在项目根目录下生成一个dist文件夹

### 5.生产环境发布
 安装serve包

    npm i serve -g

执行

    serve dist

### 6.打包发布后图片不显示

有时候我们项目打包后可能会出点小问题，就是我们放在`assets`下的图片打包上传后没有显示出来，不用急，修改下路径就可以了。

找到`config/index.js`文件，打开`index.js`找到`build`属性下的`assetsPublicPath：'/'`，修改为`assetsPublicPath：'./'`就可以了。

![](https://raw.githubusercontent.com/limchen233/picgo/master/img/image-20200625194725907.png)

