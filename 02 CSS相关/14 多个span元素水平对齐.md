实现效果如下图：

![image-20210621092034504](https://github.com/limchen233/picgo/blob/master/img/image-20210621092034504.png?raw=true)



两个同一行的 `span`水平对齐。

按正常不加特殊样式应该是这样的，第二个`span`和前面内容换行后的第二行文字对齐了：

![image-20210621092250456](https://github.com/limchen233/picgo/blob/master/img/image-20210621092250456.png?raw=true)



其实很简单，给第二个`span`元素加上`vertical-align:top`就行了。

