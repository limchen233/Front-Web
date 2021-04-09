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

**取消调度（定时器）**

`setTimeout`在调用时会返回一个`标识符`，也就是上方的`timerId`，我们可以使用`clearTimeout`，并将标识符作为参数来取消执行。

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

所有参数的意义也是相同的。不过与 `setTimeout` 只执行一次不同，`setInterval` 是每间隔给定的时间周期性执行。

想要阻止后续调用，我们需要调用 `clearInterval(timerId)`。

下面的例子将每间隔 2 秒就会输出一条消息。5 秒之后，输出停止：

```javascript
// 每 2 秒重复一次
let timerId = setInterval(() => alert('tick'), 2000);

// 5 秒之后停止
setTimeout(() => { clearInterval(timerId); alert('stop'); }, 5000);
```

> 在大多数浏览器中，包括 Chrome 和 Firefox，在显示 `alert/confirm/prompt` 弹窗时，内部的定时器仍旧会继续“嘀嗒”。
>
> 所以，在运行上面的代码时，如果在一定时间内没有关掉 `alert` 弹窗，那么在你关闭弹窗后，下一个 `alert` 会立即显示。两次 `alert` 之间的时间间隔将小于 2 秒。
>
> **使用 `setInterval` 时，`func` 函数的实际调用间隔要比代码中设定的时间间隔要短！**
>
> 因为 `func` 的执行所花费的时间“消耗”了一部分间隔时间。

周期性调度有两种方式。一种是使用 `setInterval`，另外一种就是嵌套的 `setTimeout`。

我们可以使用嵌套的`setTimeout`来模拟`setInterval`

```javascript
/**
let timerId = setInterval(() => alert('tick'), 2000);
*/

let timerId = setTimeout(function tick() {
  alert('tick');
  timerId = setTimeout(tick, 2000); // (*)
}, 2000);
```

上面这个 `setTimeout` 在当前这一次函数执行完时 ，立即调度下一次调用。

嵌套的 `setTimeout` 要比 `setInterval` 灵活得多。采用这种方式可以根据当前执行结果来调度下一次调用，因此下一次调用可以与当前这一次不同。

例如，我们要实现一个服务（server），每间隔 5 秒向服务器发送一个数据请求，但如果服务器过载了，那么就要降低请求频率，比如将间隔增加到 10、20、40 秒等。

```javascript
let delay = 5000;
let timerId = setTimeout(function request() {
  ...发送请求...
  if (request failed due to server overload) {
    // 下一次执行的间隔是当前的 2 倍
    delay *= 2;
  }
  timerId = setTimeout(request, delay);
}, delay);
```

**嵌套的`setTimeout`和`setInterval`相比：**

**嵌套的 `setTimeout` 能够精确地设置两次执行之间的延时，也就是间隔相同；而 `setInterval` 却不能。**

> 这儿有一种特殊的用法：`setTimeout(func, 0)`，或者仅仅是 `setTimeout(func)`。
>
> 这样调度可以让 `func` 尽快执行。但是只有在当前正在执行的脚本执行完成后，调度程序才会调用它。
>
> 在浏览器环境下，嵌套定时器的运行频率是受限制的。根据 [HTML5 标准](https://html.spec.whatwg.org/multipage/timers-and-user-prompts.html#timers) 所讲：“经过 5 重嵌套定时器之后，时间间隔被强制设定为至少 4 毫秒”。
>
> 当一个函数传入 `setInterval/setTimeout` 时，将为其创建一个内部引用，并保存在调度程序中。这样，即使这个函数没有其他引用，也能防止垃圾回收器（GC）将其回收。
>
> ```javascript
> // 在调度程序调用这个函数之前，这个函数将一直存在于内存中
> setTimeout(function() {...}, 100);
> ```
>
> 对于 `setInterval`，传入的函数也是一直存在于内存中，直到 `clearInterval` 被调用。
>
> 这里还要提到一个副作用。如果函数引用了外部变量（闭包），那么只要这个函数还存在，外部变量也会随之存在。它们可能比函数本身占用更多的内存。因此，当我们不再需要调度函数时，最好取消它，即使这是个（占用内存）很小的函数。



## requestAnimationFrame

`requestAnimationFrame()`是一个专门的循环函数，旨在浏览器中高效运行动画。它基本上是现代版本的`setInterval()` —— 它在浏览器重新加载显示内容之前执行指定的代码块，从而允许动画以适当的帧速率运行，不管其运行的环境如何。

它是针对`setInterval()` 遇到的问题创建的，比如 `setInterval()`并不是针对设备优化的帧率运行，有时会丢帧。还有即使该选项卡不是活动的选项卡或动画滚出页面等问题 。

该方法将重新加载页面之前要调用的回调函数作为参数。比如：

```javascript
function draw() {
  // Drawing code goes here
  requestAnimationFrame(draw);
}

draw();
```

这个想法是要定义一个函数，在其中更新动画 (例如，移动精灵，更新乐谱，刷新数据等)，然后调用它来开始这个过程。在函数的末尾，以 `requestAnimationFrame()` 传递的函数作为参数进行调用，这指示浏览器在下一次显示重新绘制时再次调用该函数。然后这个操作连续运行， 因为`requestAnimationFrame()` 是递归调用的。

> **注意**: 如果要执行某种简单的常规DOM动画, CSS 动画可能更快，因为它们是由浏览器的内部代码计算而不是JavaScript直接计算的。但是，如果您正在做一些更复杂的事情，并且涉及到在DOM中不能直接访问的对象(such as [2D Canvas API](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API) or [WebGL](https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API) objects), `requestAnimationFrame()` 在大多数情况下是更好的选择。

动画的平滑度直接取决于动画的帧速率，并以每秒帧数（fps）为单位进行测量。这个数字越高，动画看起来就越平滑。

由于大多数屏幕的刷新率为60Hz，因此在使用web浏览器时，可以达到的最快帧速率是每秒60帧（FPS）。然而，更多的帧意味着更多的处理，这通常会导致卡顿和跳跃-也称为丢帧或跳帧。

如果您有一个刷新率为60Hz的显示器，并且希望达到60fps，则大约有16.7毫秒（1000/60）来执行动画代码来渲染每个帧。这提醒我们，我们需要注意每次通过动画循环时要运行的代码量。

`requestAnimationFrame()` 总是试图尽可能接近60帧/秒的值，当然有时这是不可能的如果你有一个非常复杂的动画，你是在一个缓慢的计算机上运行它，你的帧速率将更少。`requestAnimationFrame()` 会尽其所能利用现有资源提升帧速率。

我们来看一下`requestAnimationFrame()` 方法与前面介绍的其他方法的区别.。下面让我们看一下代码:

```javascript
function draw() {
   // Drawing code goes here
   requestAnimationFrame(draw);
}

draw();
```

使用`setInterval()`:

```javascript
function draw() {
   // Drawing code goes here
}

setInterval(draw, 17);
```

如前所述，我们没有为`requestAnimationFrame()`;指定时间间隔；它只是在当前条件下尽可能快速平稳地运行它。如果动画由于某些原因而处于屏幕外浏览器也不会浪费时间运行它。

 另一方面`setInterval()`需要指定间隔。我们通过公式1000毫秒/60Hz得出17的最终值，然后将其四舍五入。四舍五入是一个好主意，浏览器可能会尝试运行动画的速度超过60fps，它不会对动画的平滑度有任何影响。如前所述，60Hz是标准刷新率。

**取消requestAnimationFrame**

`requestAnimationFrame()`可用与之对应的`cancelAnimationFrame()`方法“撤销”（不同于“set…”类方法的“清除”，此处更接近“撤销”之意）。

该方法以`requestAnimationFrame()`的返回值为参数，此处我们将该返回值存在变量 `raf` 中：

```javascript
cancelAnimationFrame(raf);
```



## 浏览器支持

`setTimeout、setInterval`：世面上的浏览器几乎都支持

`requestAnimationFrame`：大部分现代浏览器支持，谷歌10--92，firfox4--89，Edge，IE10及以上