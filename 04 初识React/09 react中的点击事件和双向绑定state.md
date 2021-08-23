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

## 为文本框实现双向绑定 state

在 Vue 中，默认提供了 v-model 指令，可以很方便的实现数据的双向绑定；但是，在 React 中，默认只是单向数据流，也就是只能把 state 上的数据绑定到页面上，无法把页面中数据的变化自动同步回 state ； 如果需要把页面上数据的变化，保存到 state，则需要我们手动监听onChange事件，拿到最新的数据，手动调用this.setState({ }) 更改回去。

实现双向绑定的步骤：

1、手动监听文本框的 onChange 事件

2、在 onChange 事件中，拿到文本框的值
> onChange 事件中，获取文本框的值有两种方案：

> 1、通过事件参数 e 来获取 onChange=((e)=>{})

> 2、和 Vue 中差不多，vue 为页面上的元素提供了 ref 的属性，如果想要获取元素引用，则需要使用this.$refs.引用名称。在 React 中，也有 ref, 如果要获取元素的引用 this.refs.引用名称。

3、调用 this.setState({}),把最新的值同步到 state 中

**通过事件参数 e 来获取文本值：**

![](https://i.imgur.com/5dfCbeu.png)

**通过 ref 引用获取文本值**

![](https://i.imgur.com/O8RDfZ6.png)