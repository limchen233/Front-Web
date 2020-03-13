##  CSS 在 react 中的应用
### 一、行内样式

（一）基本用法

在 react 中的 JSX 语法中是不能像 vue 中那样，直接在标称上以字符串在形式书写 CSS 样式，它会报错：

![](https://i.imgur.com/K6nZvfz.png)

![](https://i.imgur.com/hC2WS1A.png)

由图上报错内容可知，在 JSX 中书写行内样式要以对象的形式，不能用字符串：

![](https://i.imgur.com/A7GQaU5.png)

![](https://i.imgur.com/NEmt2jc.png)

样式成功显示！

> 注意：
> 
> 1、样式中的第一个 {} 代表要开始写 JS 代码了，第二个 {} 代表对象。样式的值要用 '' 号包裹，除纯数字外。

> 2、多个样式以逗号隔开，之前属性名带横线的 ‘-’ 用驼峰命名法。

![](https://i.imgur.com/uL3s4Qg.png)

![](https://i.imgur.com/HiFDSWT.png)

（二）抽离样式

1、在标签行内写样式太占空间，而且不美观，我们可以将它抽离出来。

![](https://i.imgur.com/eAK3taW.png)

![](https://i.imgur.com/EF4n291.png)

2、抽离为单独的样式文件

> 在 component 文件夹里新建一个 hello.js 文件，然后在 hello.js 文件里用对象的形式写上 CSS 样式，最后在组件中导入 hello.js 并引用即可。

![](https://i.imgur.com/m3djAWj.png)

![](https://i.imgur.com/IXCrgi1.png)

![](https://i.imgur.com/f0JK2FZ.png)

3、如果想引入 .css 格式的文件，要先安装 style-loader、css-loader，详情说明请参考本项目的《使用webpack4创建项目》

4、 启用 css-modules

    1. 修改 `webpack.config.js`这个配置文件，为 `css-loader` 添加参数：

      ```js
      { test: /\.css$/, use: ['style-loader', 'css-loader?modules'] } // 为 .css 后缀名的样式表  启用 CSS 模块化
      ```

    2. 在需要的组件中，`import`导入样式表，并接收模块化的 CSS 样式对象：

      ```js
      import cssObj from '../css/CmtList.css' 
      ```

    3. 在需要的HTML标签上，使用`className`指定模块化的样式：

      ```jsx
      <h1 className={cssObj.title}>评论列表组件</h1>
      ```

5、 使用`localIdentName`自定义生成的类名格式，可选的参数有：

   - [path]  表示样式表 `相对于项目根目录` 所在路径
   - [name]  表示 样式表文件名称
   - [local]  表示样式的类名定义名称
   - [hash:length]  表示32位的hash值
   - 例子：`{ test: /\.css$/, use: ['style-loader', 'css-loader?modules&localIdentName=[path][name]-[local]-[hash:5]'] }`

6、 使用 `:local()` 和 `:global()`

   - `:local()`包裹的类名，是被模块化的类名，只能通过`className={cssObj.类名}`来使用

     同时，`:local`默认可以不写，这样，默认在样式表中定义的类名，都是被模块化的类名；

   - `:global()`包裹的类名，是全局生效的，不会被 `css-modules` 控制，定义的类名是什么，就是使用定义的类名`className="类名"`

7、 注意：只有`.title`这样的类样式选择器，才会被模块化控制，类似于`body`这样的标签选择器，不会被模块化控制