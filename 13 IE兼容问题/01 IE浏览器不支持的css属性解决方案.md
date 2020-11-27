### IE9及IE9以上浏览器不支持的CSS属性

**1.flex(CSS3)**

用`float`属性代替或`poistion+transform`或者`table`布局

**2.transform**

```javascript
// 获取当前浏览器支持的transform兼容写法
function getTransform() {
    var transform = '',
        divStyle = document.createElement('div').style,
        // 可能涉及到的几种兼容性写法，通过循环找出浏览器识别的那一个
        transformArr = ['transform', 'webkitTransform', 'MozTransform', 'msTransform', 'OTransform'],

        i = 0,
        len = transformArr.length;

    for(; i < len; i++)  {
        if(transformArr[i] in divStyle) {
            // 找到之后立即返回，结束函数
            return transform = transformArr[i];
        }
    }

    // 如果没有找到，就直接返回空字符串
    return transform;
}
```

如果返回的为空字符串，则表示当前浏览器并不支持`transform`，这个时候我们就需要使用`left`，`top`值来改变元素的位置。

**3.inine-block**

在IE下可改使用`display: inline`代替

**4.transform:rotate()**

IE9中要想实现旋转的效果前面要加`-ms`前缀

```
-ms-transform: rotate(180deg);
```

