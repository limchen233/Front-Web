### 对象相等判定

在`ECMAScript6`之前，有些特殊情况即使是`===`操作符也无能为力：

```js
// 符合预期的情况
console.log(true === 1) // false
console.log({} === {}) // false
console.log('1' === 1) // false

// 不同的JavaScript引擎中表现不同，但仍被认为相等
console.log(+0 === -0) // true
console.log(+0 === 0) // true
console.log(-0 === 0) // true

// 要确定NaN的相等性，必须使用isNaN()
console.log(NaN === NaN) // false
console.log(isNaN(NaN)) // true
```

为改善这类情况，`ECMAScript 6`规范新增了`Object.is()`，这个方法与===很像，但同时也考虑到了上述边界情形。这个方法必须接收两个参数：

```js
console.log(Object.is(true,1)) // false
console.log(Object.is({},{})) // false
console.log(Object.is('1',1)) // false
// 正确的0、+0、-0相等判定
console.log(Object.is(+0,-0)) // false
console.log(Object.is(+0,0)) // true
console.log(Object.is(-0,0)) // false

// 正确的NaN相等判定
console.log(Object.is(NaN,NaN)) // true
```

