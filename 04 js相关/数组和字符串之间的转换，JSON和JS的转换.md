最近项目碰到了数组和字符串转换的问题,简单总结下：
![](https://img-blog.csdnimg.cn/20191015232822353.png)

需求是把下拉选的值传给后端，有多个值的话中间用逗号分开，参数类型是string。

这里用的是iview框架，当用户点击下拉选后会出现一个下拉列表，选中的值会存放到一个数组中。注意，这里的数据是数组，需求中需要的参数类型是string，所以要先把数组转换成string才能传参。

比如将选中的值存放到headmanArray这个数组里：

     headmanArray.toString() //将数组转成字符串，默认以逗号分割

转换后的值的类型就是string了。

另一个需求是把后端返回的数据回显在页面中，后端返回的是字符串类型，前端页面是以数组存放的，所以这时候又需要转换一下。比如后端返回的值是headmanString，

    headmanString.split(',') //以逗号为分割点，将字符串转换成数组

##   JSON拓展：

 javascript中的JSON.parse() 是用于把存储了JSON文本格式的字符串解析为javascript中的数据结构，JSON.stringify() 是做相反的转换