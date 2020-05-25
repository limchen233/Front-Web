`JSONP`主要是利用了`script`标签没有跨域限制的这个特性来完成的。

缺点是只支持GET方法，如果想使用完整的REST接口，请使用`CORS`或者其它代理方式。

使用流程：

1.前端定义解析函数（例如jsonpCallback=function(){}）

2.通过`params`形式包装请求函数，并且声明执行函数（例如cb=jsonpCallback）

3.后端获取前端声明的函数，并带上参数调用执行函数的方式传递给后端

- 普通JS示例(只提供前端代码)

```javascript
<script type="text/javascript">
  window.jsonpCallback = function(res){
    console.log(res)
	}
</script>

<script type="text/javascript" src="http://localhost:8080/api/jsonp?msg=hello&cb=jsonpCallback"></script>
```

- JQuery Ajax示例

```javascript
<script src="https://cdn.bootcss.com/jquery/3.5.0/jquery.min.js"></script>

<script>
  $.ajax({
  	url:'http://localhost:8080/api/jsonp',
  	dataType:'jsonp',
  	type:'get',
  	data:{
      msg:'hello'
    },
  	jsonp:'cb',
  	success:function(data){
      console.log(data)
    }
	})
</script>
```

