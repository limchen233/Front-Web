### node-sass安装失败解决方法：

1.首先要确定电脑系统没问题。（之前我的就是电脑系统有问题，死活装不上。重装系统，按照安装失败提示操作，最后安装成功）
2.按照提示安装python，要python2版本。
3.报错信息：

```
gyp verb could not find "msbuild.exe" in PATH - finding location in registry
gyp info spawn C:\Windows\Microsoft.NET\Framework\v4.0.30319\msbuild.exe
```

在C盘找不到这个文件，我去C盘看了下，有这个文件，但是名字是大写`MSBuild.exe`，修改成小写，安装成功！

![](C:\Users\arron\Pictures\810FCB13-0F72-4465-88E0-CD3021D8F432.png)

4.修改文件名时需要管理员权限，右键C盘，属性-安全，编辑用户权限。如果编辑不了，点高级，更改所有者后再编辑。具体可以百度一下。
