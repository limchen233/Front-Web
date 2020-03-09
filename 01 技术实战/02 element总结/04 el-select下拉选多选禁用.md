项目中有个下拉选多选功能，需求：选择了 '无'，其它选项就不可选。如果选了不是 '无' 的选项，则 '无' 不可选。

解决方法：

先把'无' 当作一个默认选项，其它选项为另一组选项。然后利用数组的some()方法得出 disabled 是 true 还是 false

![](https://i.imgur.com/tyAumJr.png)

实现效果：

![](https://i.imgur.com/w5nSDRb.png)

![](https://i.imgur.com/dziaQza.png)