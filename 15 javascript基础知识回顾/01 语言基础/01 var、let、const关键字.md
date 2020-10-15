###  一、var关键字

var是用来定义变量的操作符

```javascript
var message; // 现在只是定义，并没有初始化。此时的值为undefined.
```

这行代码定义了一个名为`message`的变量，可以用它保存任何类型的值。

`ECMAScript`实现变量的初始化，可以同时定义变量并赋值：

```
var message = 'hello world';
```

这里，`message`被定义为一个保存字符串值`hello world`的变量。**像这样初始化变量不会将它标识为字符串类型，它只是一个简单的赋值而已。**随后，不仅可以改变保存的值，也可以改变值的类型：

```
var message = 'hello world';
message = 100; //合法，但不推荐
```

1、`var`的声明作用域

使用`var`操作符定义的变量会成为包含它的函数的局部变量。即使用`var`在一个函数内部定义一个变量，该变量将在函数退出时被销毁：

```
function test(){
  var message = 'hello world'; //局部变量
}
test();
console.log(message) //报错，ReferenceError: message is not defined
```

2、`var`的声明提升

```
function foo(){
  console.log(age);
  var age = 18;
}
foo(); // undefined
```

上面的函数并不会报错，这是因为**`var`声明的的变量会自动提升到函数作用域顶部**，等价于：

```
function foo(){
  var age;
  console.log(age);
  age = 18;
}
foo(); // undefined
```

这就是所谓的“提升”（hoist），也就是把所有变量声明都拉到函数作用域的顶部。此外，反复多次使用 var 声明同一个变量也没有问题：

```
function foo() {
  var name = '张三';
  var name = '李四';
  var name = '王五';
  console.log(name);
}
foo(); // 王五
```

