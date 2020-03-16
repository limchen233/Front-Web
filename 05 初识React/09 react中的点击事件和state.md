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

## 修改 state

在 React 中，如果想要修改 state 中的数据，推荐使用 this.setState({}),例如：this.setState({msg:'123'})

> 注意事项：

> 1、在 setState 中，只会把对应的 state 状态更新，而不会覆盖其它的 state 状态

> 2、this.setState()是异步的，如果想拿到更新后的值，应该调用 this.setState({},callback),
> 例如：this.setState({msg:'123},function(){console.log(this.state.msg)})