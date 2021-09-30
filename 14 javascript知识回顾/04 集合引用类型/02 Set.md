## Set

ECMAScript 6新增的Set是一种新集合类型，为这门语言带来集合数据结构。Set在很多方面都像是加强的Map，这是因为它们的大多数API和行为都是共有的。

#### 1、基本API

使用new关键字和Set构造函数可以创建一个空集合：

```javascript
const m = new Set()
```

可在创建的同时初始化实例

```javascript
const s = new Set(['val1','val2','val3'])
```

初始化之后，可以使用add()增加值，使用has()查询，通过size取得元素数量，以及使用delete()和clear()删除元素:

```javascript
const s = new Set()
console.log(s.has('Mazz')) // false
console.log(s.size) // 0

s.add('Matt')
	.add('Asd')
console.log(s.has('Mazz')) // true
console.log(s.size) // 2

s.delete('Asd') // 删除某个值
s.clear() // 销毁集合实例中的所有值
```

与Map类似，Set可以包含任何JavaScript数据类型作为值。集合也使用SameValueZero操作（ECMAScript内部定义，无法在语言中使用），基本上相当于使用严格对象相等的标准来检查值的匹配性。

add()和delete()操作是幂等的。**不能添加重复的值**。delete()返回一个布尔值，表示集合中是否存在要删除的值：

```javascript
const s = new Set()
s.add('foo')
console.log(s.size) // 1
s.add('foo')
console.log(s.size) // 1

// 集合里有这个值
console.log(s.delete('foo')) // true
// 集合里没有这个值
console.log(s.delete('foo')) // false
```

Set实例不是一个真正的数组，而是类数组，可以使用[`Array.from()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/from)变为真数组。

> 因Set实例不能添加重复的值，所以可用来对数组去重。
>
> ```js
> let arr = [2, 3, 4, 2, 5]
> 
> let set = new Set(arr)
> // 转为数组
> set = Array.from(set)
> console.log(set) // [2,3,4,5]
> ```
>
> 

#### 2、顺序与迭代

Set会维护值插入时的顺序，因此支持按顺序迭代。

集合实例可以提供一个迭代器（Iterator），能以插入顺序生成集合内容。可以通过values()方法及其别名方法keys()（或者Symbol.iterator属性，它引用values()）取得这个迭代器：

```javascript
const s = new Set(['val1','val2','val3'])
alert(s.values === s[Symbol.iterator]) // true
alert(s.keys === s[Symbol.iterator]) // true

for(let value of s.values()){
  console.log(value)
}
// val1
// val2
// val3
```

