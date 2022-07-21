在echarts中rich主要是用于设置用户自定样式，我们可以在title，[legend](https://so.csdn.net/so/search?q=legend&spm=1001.2101.3001.7020)中使用rich，比如下面这个需求的label就可以用rich属性来实现。

![https://img-blog.csdnimg.cn/52a93e40906e480a9362c9f85bf9a07f.png](https://img-blog.csdnimg.cn/52a93e40906e480a9362c9f85bf9a07f.png)

label实现代码：

```javascript
series: [
	{
	    type: 'pie',
		radius: ['40%', '60%'],
		avoidLabelOverlap: false,
		itemStyle: {
			borderRadius: 4,
			borderColor: '#fff',
			borderWidth: 2
		},
		label: {
			show: true,
			position: 'outside',
			lineHeight: 18,// 行高
			formatter: (params) => {
                     // a,b为rich属性中定义的样式名，相当于css中的class
				const arr = [
					`{a|${params.name}}`,
					`{b|${that.change(params.value)}万}`,
					`{b|${params.percent}%}`
				]
			    return arr.join('\n') // 数组转成字符串并换行
			},
			rich: {
				a: {
					color: '#333',
					fontWeight: 'bold',
					fontSize: 14,
					fontFamily: 'Microsoft YaHei'
				    },
				b: {
					color: '#666',
					fontSize: 13,
					align: 'left'
				    }
			    }
		    },
			labelLine: {
				show: true
			},
			data: data
	}
]
```

tooltip中没有rich属性，故不能使用rich改变样式。我们可以直接在formatter属性中重写样式：

```js
tooltip: {
	trigger: 'item',
	formatter: (params) => {
		// 定义样式
		const tooltip_title = `font-size: 13px;color: \#333;font-weight:bold`
		const tooltip_text = `font-size: 13px;color: \#666;margin-left:12px;`
        
        // change是自己定义的处理函数
		const str = `${params.marker} <span style="${tooltip_title}">${params.name}</span>
		            <br/> <span style="${tooltip_text}">${that.change(params.value)}万      
                    </span>
		            <br/> <span style="${tooltip_text}">${params.percent}%</span>`
		return str
	}
},
```

我们的echarts容器有时候可能比较小，标签可能会显示不完整，会被遮挡住。我们可以调整扇区的最小角度和起始角度来调整位置。

```js
series: [
	{
		type: 'pie',
		radius: ['50%', '70%'],
		avoidLabelOverlap: false,
		minAngle: 15,//扇区最小角度
		startAngle: 190, //扇区起始角度
		itemStyle: {
			borderRadius: 4,
			borderColor: '#fff',
			borderWidth: 2
		},
    }
]
```

