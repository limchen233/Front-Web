### 第一种创建组件的方式：构造函数

    function Hello(){}

这样我们就创建了一个组件，创建好后怎么使用呢？直接以标签的形式放到页面中即可！（不需要注册，vue中组件要注册才能使用）

    ReactDom.render(
      <div>
        测试组件
        {/*直接把组件以标签的形式放到页面中*/}
        <Hello></Hello>
      </div>,document.getElementById('app')
    )

然后运行 npm run dev,结果和我们预想的有点不一样，页面报错了！

![](https://i.imgur.com/qc5sVcO.png)

组件应该返回个状态（需要个 return 语句），那么我们把 Hello 组件修改一下

    function Hello(){
      return null
    }

然后再运行，OK了，页面成功显示！

![](https://i.imgur.com/l2SXQiH.png)

现在我们在 Hello 组件里返回点东西

    function Hello(){
      return <div>这是Hello组件</div>
    }

![](https://i.imgur.com/rMt1KtU.png)

![](https://i.imgur.com/vwPumGH.png)

