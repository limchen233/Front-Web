## react 中的按钮点击事件

1、事件的名称都是React的提供的，因此名称的首字母必须大写`onClick`、`onMouseOver`

2、为事件提供的处理函数，必须是如下格式

    onClick= { function } //注意： = 号后面不是双引号，而是{}
    <button onClick={function(){console.log('ok)}}>按钮</button>

![](https://i.imgur.com/tswh4hx.png)

3、在按钮上直接写匿名函数太麻烦，我们可以把函数提取出来

![](https://i.imgur.com/Ri2u5Kq.png)

4、在 react 点击事件中，我们通常使用箭头函数

    <button onClick={()=> {this.myclickHandler()}}></button>