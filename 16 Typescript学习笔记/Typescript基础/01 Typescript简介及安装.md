TypeScript是一种开源的编程语言，该语言项目由微软进行维护和管理。TypeScript不仅包含JavaScript的语法，而且还提供了静态类型检查以及使用看起来像基于类的面向对象编程语法操作Prototype。（来自维基百科）

简单来说Typescript是JavaScript 的超集，扩展了JavaScript 的语法，具有可选的类型并可以编译为纯JavaScript。从技术上讲TypeScript就是具有静态类型的 JavaScript 。

#### **Typescript的优势：**

- 可以避免经典的错误 `'undefined' is not a function.`
- 在不严重破坏代码的情况下，重构代码更容易。
- 使大型、复杂的应用程序源码更易阅读。

#### **Typescript的特性：**

1、类型系统

`类型`是其最核心的特性。

Javascript一门非常灵活的编程语言：

- 它没有类型约束，一个变量可能初始化时是字符串，使用时又被赋值为数字。
- 由于隐式类型转换的存在，有的变量的类型很难在运行前就确定。
- 基于原型的面向对象编程，使得原型上的属性或方法可以在运行时被修改。
- 函数是 JavaScript 中的一等公民 [【1】](https://llh911001.gitbooks.io/mostly-adequate-guide-chinese/content/ch2.html#%E4%B8%BA%E4%BD%95%E9%92%9F%E7%88%B1%E4%B8%80%E7%AD%89%E5%85%AC%E6%B0%91)，可以赋值给变量，也可以当作参数或返回值。

这种灵活性就像一把双刃剑，一方面使得 JavaScript 蓬勃发展，无所不能；另一方面也使得它的代码质量参次不起，维护成本高，运行时错误多。

而 TypeScript 的类型系统，在很大程度上弥补了 JavaScript 的缺点。

**TypeScript 是静态类型**，类型系统按照类型检查的时机来分类，可以分为动态类型和静态类型。

动态类型是指在运行时才会进行类型检查，这种语言的类型错误往往会导致运行时错误。JavaScript 是一门解释型语言，没有编译阶段，所以它是动态类型，以下这段代码在运行时才会报错：

```javascript
let foo = 1;
foo.split(' ');
// Uncaught TypeError: foo.split is not a function
// 运行时会报错（foo.split 不是一个函数），造成线上 bug
```

静态类型是指编译阶段就能确定每个变量的类型，这种语言的类型错误往往会导致语法错误。TypeScript 在运行前需要先编译为 JavaScript，而在编译阶段就会进行类型检查，所以 **TypeScript 是静态类型**，这段 TypeScript 代码在编译阶段就会报错了：

```typescript
let foo = 1;
foo.split(' ');
// Property 'split' does not exist on type 'number'.
// 编译时会报错（数字没有 split 方法），无法通过编译
```

你可能会奇怪，这段 TypeScript 代码看上去和 JavaScript 没有什么区别呀。

没错！大部分 JavaScript 代码都只需要经过少量的修改（或者完全不用修改）就变成 TypeScript 代码，这得益于 TypeScript 强大的[类型推论][]，即使不去手动声明变量 `foo` 的类型，也能在变量初始化时自动推论出它是一个 `number` 类型。

完整的 TypeScript 代码是这样的：

```typescript
let foo: number = 1;
foo.split(' ');
// Property 'split' does not exist on type 'number'.
// 编译时会报错（数字没有 split 方法），无法通过编译
```

**Typescript是弱类型**，类型系统按照「是否允许隐式类型转换」来分类，可以分为强类型和弱类型。

以下这段代码不管是在 JavaScript 中还是在 TypeScript 中都是可以正常运行的，运行时数字 `1` 会被隐式类型转换为字符串 `'1'`，加号 `+` 被识别为字符串拼接，所以打印出结果是字符串 `'11'`。

```javascript
console.log(1 + '1');
// 打印出字符串 '11'
```

TypeScript 是完全兼容 JavaScript 的，它不会修改 JavaScript 运行时的特性，所以**它们都是弱类型**。



### 安装Typescript

```javascript
npm i typescript -g // 全局安装
```

这条命令会在全局环境下安装`tsc`命令，安装好后我们就可以在任何地方执行`tsc`命令了。

我们创建一个typescript文件，把js文件的后缀改为ts即可，比如`hello.ts`。见`demo/hello.ts`

```typescript
function sayHello(person: string) {
  return 'Hello, ' + person;
}

let user = 'Tom';
console.log(sayHello(user));
```

在`demo`文件夹下的命令窗口输入`tsc hello.ts`即可执行`ts`文件。（执行js文件用`node hello.js`）执行成功会生成一个编译好的js文件`hello.js`。

```typescript
function sayHello(person) {
  return 'Hello, ' + person;
}
var user = 'Tom';
console.log(sayHello(user));
```

![](https://github.com/limchen233/picgo/blob/master/img/image-20210430112423809.png?raw=true)

执行成功后，`ts`文件可能会报错：

<img src="https://github.com/limchen233/picgo/blob/master/img/image-20210430112631940.png?raw=true" style="zoom:80%;" />

在项目根路径创建一个`tsconfig.json`文件就好了。（空文件也行）

![](https://github.com/limchen233/picgo/blob/master/img/image-20210430113308875.png?raw=true)

在 TypeScript 中，我们使用 `:` 指定变量的类型，`:` 的前后有没有空格都可以。

上述例子中，我们用 `:` 指定 `person` 参数类型为 `string`。但是编译为 js 之后，并没有什么检查的代码被插入进来。

这是因为 **TypeScript 只会在编译时对类型进行静态检查，如果发现有错误，编译的时候就会报错**。而在运行时，与普通的 JavaScript 文件一样，不会对类型进行检查。

如果我们需要保证运行时的参数类型，还是得手动对类型进行判断：

```typescript
function sayHello(person: string) {
    if (typeof person === 'string') {
        return 'Hello, ' + person;
    } else {
        throw new Error('person is not a string');
    }
}

let user = 'Tom';
console.log(sayHello(user));
```

下面尝试把这段代码编译一下：

```typescript
function sayHello(person: string) {
    return 'Hello, ' + person;
}

let user = [0, 1, 2];
console.log(sayHello(user));
```

编辑器中会提示错误，编译的时候也会出错：

```typescript
hello.ts:6:22 - error TS2345: Argument of type 'number[]' is not assignable to parameter of type 'string'.
```

虽然报错，但是还是会生成`JS`文件。

如果要在报错的时候终止 js 文件的生成，可以在 `tsconfig.json` 中配置 `noEmitOnError` 即可。关于 `tsconfig.json`，请参阅[官方手册](http://www.typescriptlang.org/docs/handbook/tsconfig-json.html)（[中文版](https://zhongsp.gitbooks.io/typescript-handbook/content/doc/handbook/tsconfig.json.html)）。

```json
{
	"compilerOptions": {
		"noEmitOnError": true
	}
}

```



#### TypeScript 中的常用类型

原始数据类型、任意值、类型推论、联合类型、对象的类型--接口、数组的类型、函数的类型、类型断言、声明文件、内置对象。