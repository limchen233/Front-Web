## 项目需求：页面显示用户名，给后端传参时传用户的 id

先介绍下Object.keys()方法，此方法会返回一个由一个给定对象的自身可枚举属性组成的数组，数组中属性名的排列顺序和使用 for...in 循环遍历该对象时返回的顺序一致 ，且数组中的每一项都为字符串。

例如：

第一种情况：传入一个数组arr，返回一个arr数组的索引组成的数组，且数组中的每一项都为字符串

    let arr = ['a','b','c']
	console.log(Object.keys(arr)) // [ '0', '1', '2' ]

第二种情况，传入一个对象，返回一个由此对象的属性名组成的数组

    let obj = {name:'张三',age:'18'}
	console.log(Object.keys(obj)) // [ 'name', 'age' ]

#### 扩展，Object.values() 返回 keys 所对应的值
	console.log(Object.values(obj)) // [ '张三', '18' ]

现在的需求：页面显示用户名，给后端传参时传用户的 id，如图：

![](https://i.imgur.com/6q5fgj9.png)

点击下拉选会出现负责人的一个列表，选中其中一个就可以按人名查询数据，选中其中一个人名时，给后端传的参数是这个人名所对应的 id 而不是传英文名字，先准备下数据：

    let leaders = [{'cc':'01'}, {'lucy':'02'}, {'jack':'03'}, {'mike':'04'}]

然后循环遍历此数组，赋值给下拉选，如图：（下拉选用的是element组件）
![](https://i.imgur.com/EMRh7x0.png)

item 是数组里的每一项，绑定的 label 就是页面显示的用户名，value 就是绑定的 userId 的值，也就是传给后端的参数值


    解析：循环遍历leaders，当下标为 0 时，
	item = {'cc':'01'}
	Object.keys(item) // ['cc'], 返回的是对象属性名组成的数组

	Object.keys(item)[0] // cc, 取数组中的第一个值
	Object.values(item)[0] // 01

	当下标为 1 时
	item = {'lucy':'02'}
	Object.keys(item)[0] // lucy
	Object.values(item)[0] // 02

	以此类推...

这样就大功告成了