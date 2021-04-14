`echarts`在渲染时，如果后台返回的数据为空，页面会一片空白，这样对用户很不友好。我们可以稍微处理一下。
在`option`里配置`title`属性：

```
var option = {
    title: { // 无数据时占位用
        show: companies.length === 0, // 判断有没有数据，没有则show为true
        textStyle: {
          color: '#ccc',
          fontSize: 18
        },
        text: "暂无数据",
        left: "center",
        top: "center"
    }
}

```

根据后台返回的数据`companies`来设置`title`的`show`属性的值
效果如下：

![](https://img-blog.csdnimg.cn/20210408135930811.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2NoZW5saW04Nw==,size_16,color_FFFFFF,t_70)

还可以使用`showLoading()`来展示：

```
if(companies.length === 0) {
    myChart.showLoading({
       	text: '暂无数据',
        fontSize: 18,
        color: 'transparent', // loading颜色，设置成透明或白色，不然会显示loading状态
        textColor: '#ccc',// 文字颜色
        maskColor: 'rgba(255, 255, 255, 0.2)' // 背景色
    })
 }

```

