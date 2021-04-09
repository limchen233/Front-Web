**setTimeout()**：在指定的时间后执行一段代码。**只执行一次**。

**setInterval()**：以固定的时间间隔，重复运行一段代码。**可执行多次**。

**requestAnimationFrame()**：setInterval()的现代版本;在浏览器下一次重新绘制显示之前执行指定的代码块，从而允许动画在适当的帧率下运行，而不管它在什么环境中运行。**可运行多次**。

它们都是异步函数，在主线程运行之后才执行。

## setTimeout

**语法：**

```javascript
let timerId = setTimeout(func|code,[delay],[arg1],[arg2],...)
```

**参数说明**：

```javascript
func|code：想要执行的函数或代码字符串。 一般传入的都是函数。由于某些历史原因，支持传入代码字符串，但是不建议这样做。
delay：执行前的延时，以毫秒为单位，默认值是0。
arg1,arg2：要传入被执行函数（或代码字符串）的参数列表（IE9 以下不支持）。
```

例如，在下面这个示例中，`sayHi()` 方法会在 1 秒后执行：

```javascript
function sayHi(){
  alert('hello')
}
setTimeout(sayHi,1000) // 注意，这里传入的是函数名，不带括号。因为 setTimeout 期望得到一个对函数的引用，而不是函数执行后的结果。
```

带参数的情况：

```
function sayHi(param1,param2){
  alert(param1 + ' ' + param2)
}
setTimeout(sayHi,1000,'Hello','jack') // Hello jack
```

可以使用普通函数或箭头函数：

```javascript
setTimeout(function(){alert('hello')},1000)
或
setTimeout(() => {alert('hello')},1000)
```

**取消定时器**

`setTimeout`在调用时会返回一个`定时器标识符`，也就是上方的`timerId`，我们可以使用`clearTimeout`，并将标识符作为参数来取消执行。

取消定时器的语法：

```javascript
let timerId = setTimeout(...)
clearTimeout(timerId)
```



## setInerval

`setInterval` 方法和 `setTimeout` 的语法相同：

```javascript
let timerId = setInterval(func|code, [delay], [arg1], [arg2], ...)
```

