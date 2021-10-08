`ECMAScript`为数组提供了两个归并方法：`reduce()`和`reduceRight()`。这两个方法都会迭代数组的所有项，并在此基础上构建一个最终返回值。

`reduce()`方法从数组第一项开始遍历到最后一项。

`reduceRight()`从最后一项开始遍历至第一项。

接收两个参数：

1.对每一项都会运行的的归并函数

2.归并起点的起始值（可选）

#### 语法：

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

#### 描述：

`reduce`为数组中的每一个元素依次执行`callback`函数，不包括数组中被删除或从未被赋值的。

回调函数第一次执行时，`accumulator` 和`currentValue`的取值有两种情况：如果调用`reduce()`时提供了`initialValue`，`accumulator`取值为`initialValue`，`currentValue`取数组中的第一个值；如果没有提供 `initialValue`，那么`accumulator`取数组中的第一个值，`currentValue`取数组中的第二个值。

```javascript
let values = [1,2,3,4,5]
let sum = values.reduce((prev,cur,index,array)=>prev + cur)
console.log(sum) // 15
```

因为没有可选的第二个参数，所以第一次执行归并函数时，`prev`是1,`cur`是2。第二次执行时，`prev`是3（1+2），`cur`是3（数组第三项）。如此递进，直到把所有项都遍历一次，最后返回归并结果。

> **注意：**
>
> 1、如果没有提供`initialValue`，reduce 会从索引1的地方开始执行 callback 方法，跳过第一个索引。如果提供`initialValue`，从索引0开始。
>
> 2、如果数组为空且没有提供`initialValue`，会抛出[`TypeError`] 。如果数组仅有一个元素（无论位置如何）并且没有提供`initialValue`， 或者有提供`initialValue`但是数组为空，那么此唯一值将被返回并且`callback`不会被执行。



#### `reduce`如何运行

```javascript
[0, 1, 2, 3, 4].reduce(function(accumulator, currentValue, currentIndex, array){
  return accumulator + currentValue;
});
```

callback 被调用四次，每次调用的参数和返回值如下表：

| callback    | **accumulator** | **`currentValue`** | **`currentIndex`** |  **array**  | **return value** |
| :---------- | :-------------: | :----------------: | :----------------: | :---------: | :--------------: |
| first call  |        0        |         1          |         1          | [0,1,2,3,4] |        1         |
| second call |        1        |         2          |         2          | [0,1,2,3,4] |        3         |
| third call  |        3        |         3          |         3          | [0,1,2,3,4] |        6         |
| fourth call |        6        |         4          |         4          | [0,1,2,3,4] |        10        |

由`reduce`返回的值将是最后一次回调返回值（10）。

如果你提供一个初始值作为`reduce()`方法的第二个参数，以下是运行过程及结果：

```javascript
[0, 1, 2, 3, 4].reduce((accumulator, currentValue, currentIndex, array) => {
    return accumulator + currentValue
}, 10)
```

| callback    | **accumulator** | **`currentValue`** | **`currentIndex`** |  **array**  | **return value** |
| ----------- | :-------------: | :----------------: | :----------------: | :---------: | :--------------: |
| first call  |       10        |         0          |         0          | [0,1,2,3,4] |        10        |
| second call |       10        |         1          |         1          | [0,1,2,3,4] |        11        |
| third call  |       11        |         2          |         2          | [0,1,2,3,4] |        13        |
| fourth call |       13        |         3          |         3          | [0,1,2,3,4] |        16        |
| fifth call  |       16        |         4          |         4          | [0,1,2,3,4] |        20        |

这种情况下`reduce()`返回的值是`20`。

可以使用`箭头函数`来代替完整的函数。

```javascript
[0, 1, 2, 3, 4].reduce((prev, curr) => prev + curr );
```

`reduceRight()`方法与之类似，只是方向相反。

```javascript
let values = [1,2,3,4,5]
let sum = values.reduceRight(function(prev,cur,index,array){
	return prev + cur
})
console.log(sum) // 15
```

在这里，第一次调用归并函数时`prev`是5，而`cur`是4。当然，最终结果相同，因为归并操作都是简单的加法。

