## Map

`ECMAScript 6`以前，在JavaScript中实现“键/值”式存储可以使用Object来方便高效地完成，也就是使用对象属性作为键，再使用属性来引用值。但这种实现并非没有问题，为此`TC39`委员会专门为“键/值”存储定义了一个规范。作为`ECMAScript 6`的新增特性，Map是一种新的集合类型，为这门语言带来了真正的键/值存储机制。Map的大多数特性都可以通过Object类型实现，但二者之间还是存在一些细微的差异。具体实践中使用哪一个，还是值得细细甄别。

#### 1、创建Map

使用new关键字和Map构造函数可以创建一个空映射：

```javascript
const m = new Map()
```

如果想在创建的同时初始化实例，可以给Map构造函数传入一个可迭代对象，需要包含键/值对数组。可迭代对象中的每个键/值对都会按照迭代顺序插入到新映射实例中：

```javascript
// 使用嵌套数组初始化映射
const m1 = new Map([
  ['key1','val1'],
  ['key2','val2'],
  ['key3','val3']
])
alert(m1.size) // 3
```

#### 2、Map的`API`

初始化之后，可以使用set()方法再添加键/值对。另外，可以使用get()和has()进行查询，可以通过size属性获取映射中的键/值对的数量，还可以使用delete()和clear()删除值。

```javascript
const m = new Map()
console.log(m.has('firstName')) // false
console.log(m.get('firstName')) // undefined
console.log(m.size) // 0

m.set('firstName','Xiaolong')
	.set('lastName','Li')
console.log(m.has('firstName')) // true
console.log(m.get('firstName')) // Xiaolong
console.log(m.size) // 2

// 删除键值对
m.delete('firstName')
console.log(m.has('firstName')) // false
console.log(m.has('lastName')) // true
console.log(m.size) // 1

// 清除实例中的所有键值对
m.clear()
console.log(m.has('firstName')) // false
console.log(m.has('lastName')) // false
console.log(m.size) // 0
```

#### 3、Map键的类型

与Object只能使用数值、字符串或符号作为键不同，Map可以使用任何JavaScript数据类型作为键。

```javascript
const m = new Map()
const functionKey = function(){}
const symbolKey = Symbol()
const objectKey = new Object()
m.set(functionKey,'functionValue')
m.set(symbolKey,'symbolValue')
m.set(objectKey,'objectValue')

console.log(m.get(functionKey)) // functionValue
console.log(m.get(symbolKey)) // symbolValue
console.log(m.get(objectKey)) // objectValue
```

Map内部使用`SameValueZero`比较操作（`ECMAScript`规范内部定义，语言中不能使用），基本上相当于使用严格对象相等的标准来检查键的匹配性。与Object类似，映射的值是没有限制的。