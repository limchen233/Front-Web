今天做项目，领导说可能以后要改颜色，所以就想用sass定义全局变量，在单文件中定义是可以使用的，可在引入到其它文件的时候报错了。我们需要安装一个解析器`sass-resources-loader`

`cnpm i sass-resources-loader -D`

安装好后，打开`build/utils.js`文件, `scss`改成以下形式



![image-20200716171605995](https://raw.githubusercontent.com/limchen233/picgo/master/img/image-20200716171605995.png)

重新启动项目，Ok！

需要用到的地方直接引入定义的变量名就可以了，例如：定义了一个全局变量`$activeColor:#fff;`

```scss
div{
  color:$activeColor;
}
```

