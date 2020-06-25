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
