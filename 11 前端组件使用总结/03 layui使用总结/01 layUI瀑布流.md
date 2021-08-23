项目里有两个列表，原来是用表格加载的，现在需求要改为以流的形式加载。自然而然就想到了layUI的流加载--信息流。
使用方法也很简单，首先要引入`layUI`的依赖文件`layui.js`和`layui.css`，文件去官网下载就好。[layUI官方文档](https://www.layui.com/doc/modules/flow.html)

1、文件引用完之后在页面创建一个容器

```html
<ul id="demo"></ul>
```

2、`js`代码

```javascript
// 加载列表
function loadList() {
    layui.use('flow', function () {
      var flow = layui.flow
      flow.load({
        elem: '#demo', // 列表容器
        scrollElem:'#demo', // 滚动条所在的容器（默认是document）
        end: '没有更多了', // 用于显示末页内容，可传入任意HTML字符。默认为：没有更多了
        done: function (page, next) { // page默认为 1
          // 请求后台数据，因为项目需要，这里使用了ajax异步请求。不需要异步请求时，正常请求就可以。
          // 后台接口参数：{page：当前页码，rows：每页显示的数量}
          var resultData = Tool_Ajax_Async('<%=request.getContextPath()%>/uniflow/getTodoWorks.do', {page:page,rows:5}, 'json')
          var lis = [] // 存放列表数据
          var html = ''
          resultData.done(function (data) {
          	// 此时的data为后台接口返回的数据
            if (data.rows.length === 0) {
              // 列表长度为0说明没有数据，给默认值
              html = '<span style="display:inline-block;margin: 10px 15px;">暂时没有新的数据</span>'
              lis.push(html)
            } else {
              layui.each(data.rows, function (index, item) {
                var title = item.applyTitle + ' - ' + item.nodeName
                // 拼接 html 字符串
                html = '<li><a>' + title + '</a><span class="dateSty">' + new Date(item.createTime).toLocaleString() + '</span></li>'
                lis.push(html)
              })
            }
            // 总页数（后台返回）
            var pages = data.page.totalPage
            // 将数据渲染到容器,当前页小于总页数时，会自动触发done函数
            next(lis.join(''), page < pages)
          })
        }
      })
    })
  }
```

这样就可以加载出列表了。
但是有个问题，现在只能点击`加载更多`按钮才能加载下一页的数据，滚动则无效果。
解决方法：给指定的列表容器加个高度和滚动条

```css
#demo{
  height: 100px;
  overflow-y: auto;
}
```

OK，大功告成！