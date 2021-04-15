市面上电脑种类很多，每个人的电脑屏幕分辨率又不一样，这就造成了同一个页面在不同的电脑上显示的不一样。这对前端来说是比较头疼的。那怎么让页面根据屏幕分辨率自适应呢？首先我们不能给要处理的容器设置固定高度，其次借助视口`（viewport）`和`calc()`函数来设置高度。

视口通常与浏览器窗口相同，但不包括浏览器的`UI`， 菜单栏等——即指你正在浏览的文档的那一部分。

```css
整个视口的高和宽是 100vh、100vw
1vh = 1% * 视口高度，1vw = 1% * 视口宽度
vh、vw就是相对视口的长度单位，它是相对单位。即高和宽不是一个固定的值。
```

`calc()`函数允许在声明 `CSS` 属性值时执行一些计算。用一个表达式作为它的参数，用这个表达式的结果作为值。这个表达式可以是`+、-、*、/`操作符的组合。

```css
/* property: calc(expression) */
width: calc(100% - 80px);
```

**注：`calc()`函数运算符的两边必须要有空白字符。**

我们来看个示例：

![](https://github.com/limchen233/picgo/blob/master/img/%E7%A4%BA%E4%BE%8B1.png?raw=true)

![](https://github.com/limchen233/picgo/blob/master/img/%E7%A4%BA%E4%BE%8B2.png?raw=true)

这是同一个页面在不同分辨率下的显示，上面三个容器和下方三个容器都是固定高度，第二张图下方明显多出了一片空白。这就是固定高度造成的。

这个页面还一个需求是不同角色的人登录进来页面显示是不一样的，有的人上面三个`Echarts`图表是看不到的，所以此时下方的三个容器的高度就要铺满整个窗口。所以我们给固定高度是不行的。



```javascript
mounted () {
// 页面渲染好后获取对应的元素
    let backlogDiv = document.getElementById('backlogDiv')
    let readDiv = document.getElementById('readDiv')
    let noticeDiv = document.getElementById('noticeDiv')
		
    // 角色判断
    if (this.orgType === 'PROVINCE' || this.orgType === 'CITY') {
      // 设置元素高度
      backlogDiv.style.height = 'calc(100vh - 440px)'
      readDiv.style.height = 'calc(100vh - 440px)'
      noticeDiv.style.height = 'calc(100vh - 440px)'

      // 渲染echart图表
      this.getList()
      this.getDCLCommitteeImpWork()
      this.getDCLCommitteeMembers()

      //根据浏览器大小改变大小
      window.onresize = () => {
        this.chartData1.resize();
        this.chartData2.resize();
        this.chartData3.resize();
      }
    } else {
      // 设置元素高度，没有echarts表时的高度
      backlogDiv.style.height = 'calc(100vh - 170px)'
      readDiv.style.height = 'calc(100vh - 170px)'
      noticeDiv.style.height = 'calc(100vh - 170px)'
    }
}
```

OK，现在页面在不同的分辨率下表现就一致了。

