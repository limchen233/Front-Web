前段时间用vue写项目，报了个错，Duplicate keys detected:'0'.This may cause an update error，如下：
![](https://img-blog.csdnimg.cn/20191101143126949.png)

报错原因是有两个相同的for循环，他们的绑定的key值是相同的

![](https://img-blog.csdnimg.cn/20191101143325373.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2NoZW5saW04Nw==,size_16,color_FFFFFF,t_70)

解决方法：将外层的key值加上一个字符串就可以了。

![](https://img-blog.csdnimg.cn/2019110114360940.png)