第一次做移动端的项目使用了`vant-ui`，在用`grid`组件的时候出了个bug。

![](https://img-blog.csdnimg.cn/20200817172221512.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2NoZW5saW04Nw==,size_16,color_FFFFFF,t_70#pic_center)

当刷新页面或页面发生错误时，九宫格布局会变成下图这样

![](https://img-blog.csdnimg.cn/20200817172237168.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2NoZW5saW04Nw==,size_16,color_FFFFFF,t_70#pic_center)

图标突然变小，随便点击一下其它页面就又恢复正常。出现的原因不是太清楚。但是找到了解决方法。
把图片放到slot里就可以了。

```javascript
// 原来的代码
<van-grid-item text="巡察实施" to="/inspection">
   <img src="../../assets/巡查实施.svg" alt />
</van-grid-item>

// 修改后的代码
<van-grid-item text="巡察实施" to="/inspection">
    <div slot="default">
    	<img src="../../assets/巡查实施.svg" alt />
    </div>
</van-grid-item>
```

