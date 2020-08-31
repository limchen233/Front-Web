## 使用vue-cli初始化项目及打包发布步骤

### 1.全局安装vue-cli工具

```
npm i vue-cli -g 老版本
```

```
npm i @vue/cli -g 新版本
```

如果你已经全局安装了旧版本的 `vue-cli` (1.x 或 2.x)，你需要先通过 `npm uninstall vue-cli -g` 或 `yarn global remove vue-cli` 卸载它。

### 2.初始化一个项目
​    `vue init -y/vue init webpack 项目名` (vue-cli2.xx的方式)

​	`vue create 项目名`(vue/cli3xx的方式)

> **项目名不能有大写字母**
>
> 如果是用的 vue init -y 直接在项目根目录下初始化就好了，如果是用的 `vue init webpack 项目名`  或者是 `vue create 项目名`，则要按提示操作。在gitbash下，按上下箭头选择会无效。官方文档中解释：
>
> 如果你在 Windows 上通过 minTTY 使用 Git Bash，交互提示符并不工作。你必须通过 `winpty vue.cmd create hello-world` 启动这个命令。不过，如果你仍想使用 `vue create hello-world`，则可以通过在 `~/.bashrc` 文件中添加以下行来为命令添加别名。 `alias vue='winpty vue.cmd'` 你需要重新启动 Git Bash 终端会话以使更新后的 bashrc 文件生效。
>
> bashrc文件在安装git的目录中。比如：D:\Program Files\Git\etc
>
> 在`bashrc`文件最后加上`alias vue='winpty vue.cmd`就可以了。注意：=号两边不能有空格

### 3.启动项目

```
npm run dev
```

### 4.生产环境打包

```
 npm run build
```

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

