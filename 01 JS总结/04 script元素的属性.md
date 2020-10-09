## ＜script＞元素的属性

将`javascript`插入`html`的主要方法是使用`<script>`元素。这个元素是由网景公司创造出来的，主要有8个属性。

- `async`：可选。表示应该立即开始下载脚本，但不能阻止其它页面动作，比如下载资源或等待其它脚本执行。即不会阻止`Dom`渲染，会和`DOM`渲染一起进行。如果有多个，不一定是按照顺序执行。

- `defer`：可选。表示在文档解析和显示完成后再执行脚本。只对外部脚本文件有效。如果有多个，会按照顺序执行。

- `charset`：可选。使用`src`属性指定的代码字符集。这个属性很少用，因为大多数浏览器不在乎它的值。

- `crossorigin`：可选。配置相关请求的`CORS`(跨源资源共享)设置。默认不使用`CORS`。

  `crossorigin="anonymous"`配置文件请求不必设置凭据标志。

  `crossorigin="use-credentials"`设置凭据标志，意味着出站请求会包含凭据。

- `src`：可选。表示包含要执行的代码的外部文件。

- `type`：可选。代替`language`,表示代码块中脚本语言的内容类型（也称MIME类型）。按照惯例，这个值始终都是`text/javascript`。目前`text/javascript`和`text/ecmascript`都已经废弃了。`Javascript`文件的MIME类型通常是`application/x-javascript`，不过给type属性这个值 有可能导致脚本被忽略。在非IE的浏览器中有效的其他值还 有 `application/javascript` 和 `application/ecmascript` 。如果这个值是 module ，则代码会被当成`ES6`模块， 而且只有这时候代码中才能出现 import 和 export 关键字。

- `integrity `：可选。允许比对接收到的资源和指定的加密签名 以验证子资源完整性（SRI，Subresource Intergrity）。如果接收到 的资源的签名与这个属性指定的签名不匹配，则页面会报错，脚 本不会执行。这个属性可以用于确保内容分发网络（CDN， Content Delivery Network）不会提供恶意内容。 

- `language`：废弃。最初用于表示代码块中的脚本语言 （如 "JavaScript" 、 "JavaScript 1.2" 或 "VBScript" ）。大多数浏览器都会忽略这个属性， 不应该再使用它。

常用的有`src、type、async、defer`。

1. <script src="script.js"></script>

   没有 `defer` 或 `async`，浏览器会立即加载并执行指定的脚本，“立即”指的是在渲染该 `script` 标签之下的文档元素之前，也就是说不等待后续载入的文档元素，读到就加载并执行。

2. <script async src="script.js"></script>

   有 `async`，加载和渲染后续文档元素的过程将和 `script.js` 的加载与执行并行进行（异步）。async还是一个乱序执行的主，反正对它来说脚本的加载和执行是紧紧挨着的，所以不管你声明的顺序如何，只要它加载完了就会立刻执行。

3. <script defer src="myscript.js"></script>

   有 `defer`，加载后续文档元素的过程将和 `script.js` 的加载并行进行（异步），但是 `script.js` 的执行要在所有元素解析完成之后，`DOMContentLoaded` 事件触发之前完成。

   defer会根据声明的顺序执行。

然后从实用角度来说呢，首先把所有脚本都丢到 `</body>` 之前是最佳实践，因为对于旧浏览器来说这是唯一的优化选择，此法可保证非脚本的其他一切元素能够以最快的速度得到加载和解析。
