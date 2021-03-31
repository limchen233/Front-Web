说明：我用的版本是1.4.3

首先找到`Ueditor.all.js`文件，搜索`fontfamily`，定位到如下代码:

![](https://img-blog.csdnimg.cn/20210331172409514.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2NoZW5saW04Nw==,size_16,color_FFFFFF,t_70)

将`fontsize`的代码修改为如下代码：

```
fontsize:[
	{ name: '\u516d\u53f7', val: 10},
 	{ name: '\u5c0f\u4e94', val: 12},
  { name: '\u4e94\u53f7', val: 14},
  { name: '\u5c0f\u56db', val: 16},
  { name: '\u56db\u53f7', val: 18},
  { name: '\u5c0f\u4e09', val: 20},
  { name: '\u4e09\u53f7', val: 21},
  { name: '\u5c0f\u4e8c', val: 24},
  { name: '\u4e8c\u53f7', val: 29},
  { name: '\u5c0f\u4e00', val: 32},
  { name: '\u4e00\u53f7', val: 34},
  { name: '\u5c0f\u521d', val: 48},
  { name: '\u521d\u53f7', val: 56}
]
```

上面的UNICODE直接用中文字符串也可以。比如：

```
fontsize:[
	{ name: '六号', val: 10},
 	{ name: '小五', val: 12},
  { name: '五号', val: 14},
  { name: '小四', val: 16}
]
```

然后继续搜索`editorui.fontsize`，定位到如下代码：

![](https://img-blog.csdnimg.cn/20210331173548337.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2NoZW5saW04Nw==,size_16,color_FFFFFF,t_70)

修改成如下代码：

![](https://img-blog.csdnimg.cn/20210331173658926.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2NoZW5saW04Nw==,size_16,color_FFFFFF,t_70)

修改后代码：

```
for (var i = 0; i < list.length; i++) {
    var sizename = list[i].name;
    var size = list[i].val + 'px';
    items.push({
         label:sizename,
         value:size,
         theme:editor.options.theme,
         renderLabelHtml:function () {
              return '<div class="edui-label %%-label" style="line-height:2;font-size:' +
              this.value + '">' + (this.label || '') + '</div>';
         }
    });
}

```

