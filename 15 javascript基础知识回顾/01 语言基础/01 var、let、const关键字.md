###  一、var关键字

var是用来定义变量的操作符

```javascript
var message; // 现在只是定义，并没有初始化。此时的值为undefined.
```

这行代码定义了一个名为`message`的变量，可以用它保存任何类型的值。

`ECMAScript`实现变量的初始化，可以同时定义变量并赋值：

```javascript
var message = 'hello world';
```

这里，`message`被定义为一个保存字符串值`hello world`的变量。**像这样初始化变量不会将它标识为字符串类型，它只是一个简单的赋值而已。** 随后，不仅可以改变保存的值，也可以改变值的类型：

```javascript
var message = 'hello world';
message = 100; //合法，但不推荐
```

1、`var`的声明作用域

使用`var`操作符定义的变量会成为包含它的函数的局部变量。即使用`var`在一个函数内部定义一个变量，该变量将在函数退出时被销毁：

```javascript
function test(){
  var message = 'hello world'; //局部变量
}
test();
console.log(message) //报错，ReferenceError: message is not defined
```

2、`var`的声明提升

```javascript
function foo(){
  console.log(age);
  var age = 18;
}
foo(); // undefined
```

上面的函数并不会报错，这是因为 **`var`声明的的变量会自动提升到函数作用域顶部** ，等价于：

```javascript
function foo(){
  var age;
  console.log(age);
  age = 18;
}
foo(); // undefined
```

这就是所谓的“提升”（hoist），也就是把所有变量声明都拉到函数作用域的顶部。此外，反复多次使用 var 声明同一个变量也没有问题：

```javascript
function foo() {
  var name = '张三';
  var name = '李四';
  var name = '王五';
  console.log(name);
}
foo(); // 王五
```

### 二、let声明

`let` 跟 `var` 的作用差不多，但有着非常重要的区别。最明显的区别是， **`let` 声明的范围是块作用域，而 `var`声明的范围是函数作用域。** 

```javascript
if(true){
  var name = 'jack';
  console.log(name); // jack
}
console.log(name); // jack
```

```javascript
if(true){
  let age = 20;
  console.log(age); // 20
}
console.log(age); // ReferenceError: age没有定义
```

在这里， `age`变量之所以不能在`if`块外部被引用，是因为它的作用域仅限于该块内部。 **块作用域是函数作用域的子集**  , 因此适用于 `var` 的作用域限制同样也适用于 `let` 。

`let`不允许同一个块作用域中重复声明：

```javascript
let name;
let name; // SyntaxError；标识符age已经声明过了

// 对声明冗余报错不会因混用 let 和 var 而受影响
var gender;
let gender;  // SyntaxError

let age;
var age;  // SyntaxError
```

1、暂时性死区

`let`与`var`的另一个重要区别就是 **`let`声明的变量不会在作用域中被提升。**

```javascript
console.log(name); // undefined,name会被提升
var name = 'jack';

console.log(age); // ReferenceError:age没有定义
let age = 20;
```

在解析代码时，`JavaScript`引擎也会注意出现在块后面的`let` 声明，只不过在此之前不能以任何方式来引用未声明的变量。在let 声明之前的执行瞬间被称为“暂时性死区”（temporal dead zone），在此阶段引用任何后面才声明的变量都会抛出`ReferenceError` 。

2、全局声明

`let`在全局作用域中声明的变量不会成为`window`对象的属性，但`var`声明的变量则会。

```
var name = '小明';
console.log(window.name); // 小明

let age = 20;
console.log(window.age); // undefined
```

3、for循环中的`let`声明 

在 let 出现之前， for 循环定义的迭代变量会渗透到循环体外部：

```javascript
for(var i=0;i<5;i++){
  // 执行逻辑
}
console.log(i); // 5
```

改成使用 let 之后，这个问题就消失了，因为迭代变量的作用域仅限于 for 循环块内部：

```javascript
for (let i = 0; i < 5; ++i) {
  // 循环逻辑
}
console.log(i);  // ReferenceError: i没有定义
```

在使用 var 的时候，最常见的问题就是对迭代变量的奇特声明和修改：

```javascript
for (var i = 0; i < 5; ++i) {
  setTimeout(() => console.log(i), 0)
}
// 你可能以为会输出0、1、2、3、4
// 实际上会输出5、5、5、5、5
```

之所以会这样，是因为在退出循环时，迭代变量保存的是导致循环退出的值：5。在之后执行超时逻辑时，所有的 i 都是同一个变量，因而输出的都是同一个最终值。而在使用 let 声明迭代变量时，JavaScript引擎在后台会为每个迭代循环声明一个新的迭代变量。每个 `setTimeout` 引用的都是不同的变量实例，所以 `console.log` 输出的是我们期望的值，也就是循环执行过程中每个迭代变量的值。

```javascript
for (let i = 0; i < 5; ++i) {
  setTimeout(() => console.log(i), 0)
}
// 会输出0、1、2、3、4
```

### 三、`const`声明

`const` 的行为与 `let` 基本相同，唯一一个重要的区别是用它声明变量时必须同时初始化变量，且尝试修改 `const` 声明的变量会导致运行时错误。