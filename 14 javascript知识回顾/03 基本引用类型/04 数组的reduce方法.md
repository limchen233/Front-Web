`ECMAScript`为数组提供了两个归并方法：`reduce()`和`reduceRight()`。这两个方法都会迭代数组的所有项，并在此基础上构建一个最终返回值。

`reduce()`方法从数组第一项开始遍历到最后一项。

`reduceRight()`从最后一项开始遍历至第一项。

接收两个参数：

1.对每一项都会运行的的归并函数

2.归并起点的起始值（可选）

语法：

```
arr.reduce(callback(accumulator, currentValue[, index[, array]])[, initialValue])
```

- **`callback`**

	执行数组中每个值 (如果没有提供 `initialValue则第一个值除外`)的函数，包含四个参数：

	- **`accumulator`** 

		累计器累计回调的返回值; 它是上一次调用回调时返回的累积值，或`initialValue`（见于下方）。

	- **`currentValue`**

		数组中正在处理的元素。

	- **`index` (可选)**

		数组中正在处理的当前元素的索引。 如果提供了`initialValue`，则起始索引号为0，否则从索引`1`起始。

	- **`array`(可选)**

		调用`reduce()`的数组。

- **`initialValue`(可选)**

描述：

`reduce`为数组中的每一个元素依次执行`callback`函数，不包括数组中被删除或从未被赋值的。

回调函数第一次执行时，`accumulator` 和`currentValue`的取值有两种情况：如果调用`reduce()`时提供了`initialValue`，`accumulator`取值为`initialValue`，`currentValue`取数组中的第一个值；如果没有提供 `initialValue`，那么`accumulator`取数组中的第一个值，`currentValue`取数组中的第二个值。

```javascript
let values = [1,2,3,4,5]
let sum = values.reduce((prev,cur,index,array)=>prev + cur)
console.log(sum) // 15
```

因为没有可选的第二个参数，所以第一次执行归并函数时，`prev`是1,`cur`是2。第二次执行时，`prev`是3（1+2），`cur`是3（数组第三项）。如此递进，直到把所有项都遍历一次，最后返回归并结果。

`reduceRight()`方法与之类似，只是方向相反。

```javascript
let values = [1,2,3,4,5]
let sum = values.reduceRight(function(prev,cur,index,array){
	return prev + cur
})
console.log(sum) // 15
```

在这里，第一次调用归并函数时`prev`是5，而`cur`是4。当然，最终结果相同，因为归并操作都是简单的加法。
