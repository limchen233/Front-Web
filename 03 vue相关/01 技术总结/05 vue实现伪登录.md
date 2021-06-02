需求：从一个项目跳转到另一个项目，免密码登录

1、首先，在要跳转到的项目里添加白名单路由并添加到总路由

![](https://img-blog.csdnimg.cn/20200323155321945.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2NoZW5saW04Nw==,size_16,color_FFFFFF,t_70)

![](https://img-blog.csdnimg.cn/20200323155502968.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2NoZW5saW04Nw==,size_16,color_FFFFFF,t_70)



2、可以在白名单路由页面（伪登录页）设置显示的内容

![](https://img-blog.csdnimg.cn/20200323163359230.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2NoZW5saW04Nw==,size_16,color_FFFFFF,t_70)



3、在需要跳转的项目里添加一个按钮点击事件，打开伪登录页面同时传一个 id 参数过去，这个 id 参数登录时要用

![](https://img-blog.csdnimg.cn/20200323160321524.png)



4、在伪登录页加载完成时调用后端免登录接口

![](https://img-blog.csdnimg.cn/20200323155911129.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2NoZW5saW04Nw==,size_16,color_FFFFFF,t_70)



参数是路由跳转时传过来的。
接口请求成功后，将用户信息保存到 session 中，`jumpUrl` 是要跳转的路径，`toDoList` 是跳转成功后，默认显示的页面。跳转成功后可以根据需要去路由守卫进行其他设置。