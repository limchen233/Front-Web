## 生命周期相关问题

#### 1.`vue`组件有哪些生命周期函数？

- `beforeCreate`、`created`、`beforeMount`、`mounted`、`beforeUpdate`、`updated`、`beforeDestroy`、`destroyed`
- `<keep-alive>`有自己独立的钩子函数`activated`和`deactivated`,当引入`keep-alive` 的时候，页面第一次进入，钩子的触发顺序`created`-> `mounted`-> `activated`，退出时触发`deactivated`。当再次进入（前进或者后退）时，只触发`activated`。`keep-alive`的作用是用于**保存组件的渲染状态**。

#### 2.`vue`的父组件和子组件生命周期钩子执行顺序是什么？

- **渲染过程**

  父组件挂载一定是等子组件都挂载完成后，才算是父组件挂载完成，所以父组件的`mounted`在子组件的`mounted`之后

  父`beforeCreate` -> 父`created `-> 父`beforeMount `-> 子`beforeCreate `-> 子`created `-> 子`beforeMount `-> 子`mounted `-> 父`mounted`

- **更新过程**

  父`beforeUpdate `-> 子`beforeUpdate`->子`updated `-> 父`updated`

- **销毁过程**

  父`beforeDestroy `-> 子`beforeDestroy `-> 子`destroyed `-> 父`destroyed`

- 不管是哪种情况，都一定是父组件等待子组件完成后，才会执行自己对应完成的钩子

#### 3.`vue`路由生命周期函数？

全局的

- `router.beforeEach(to,from,next)` 前置守卫
- `router.beforeResolve` 解析守卫
- `router.afterEach(to,from)` 后置钩子,不会接受 `next` 函数，也不会改变导航本身

单个路由独享的

- `beforeEnter(to,from,next)` 与全局前置守卫的方法参数是一样的

组件级的

- `beforeRouteEnter`
- `beforeRouteUpdate`
- `beforeRouteLeave`



## 相关属性的作用&相似属性对比

#### 1.`v-show`和`v-if`的区别？

- `v-if`会在切换过程中对条件块的事件监听器和子组件进行销毁和重建，如果初始条件是`false`，则什么都不做，直到条件第一次为`true`时才开始渲染模块。

- `v-show`是基于`css`进行切换，元素始终会被渲染并保留在 DOM 中。不管初始条件是什么，都会渲染

- `v-if`切换的开销大，`v-show`初始渲染开销大。

#### 2.`computed`和`watch/methods`的区别？

`computed`计算属性，是依赖其它属性的计算值，并且有缓存，只有当依赖的值变化时才会更新。

`watch`是监听的属性发生变化时，在回调中执行一些逻辑。

`computed`是基于他们的响应式依赖进行缓存的，只有在依赖发生变化时，才会计算求值，而使用 `methods`，每次都会执行相应的方法。

所以，`computed` 适合在模板渲染中，某个值是依赖了其他的响应式对象甚至是计算属性计算而来，而 `watch` 适合监听某个值的变化去完成一段复杂的业务逻辑。

#### 3.`keep-alive`有什么作用？

在 `Vue` 中，每次切换组件时，都会重新渲染。如果有多个组件切换，又想让它们保持原来的状态，避免重新渲染，这个时候就可以使用 `keep-alive`。 `keep-alive` 可以使被包含的组件保留状态，或避免重新渲染。

#### 4.`$route`和`$router`的区别？

`$route` 是当前路由信息对象，包括`path`，`params`，`hash`，`query`，`fullPath`，`matched`，`name` 等路由信息参数。

`$router` 是路由实例对象，包括了路由的跳转方法，钩子函数等

#### 5.`vue-loader`是什么？使用它的用途？

- `vue-loader`是解析`.vue`文件的一个加载器，将`template/js/style`转换成 `js `模块。
- 用途：`js`可以写 `es6`、`style `样式可以用 `scss `或 `less`；`template `可以加 `jade `等。

#### 6.`vue`中hash模式和history模式的区别

- 相同点：都不会请求服务器，不会重新加载页面。
- hash模式下，请求地址带#，history不带。hash模式背后的原理是`onhashchange`事件，由于hash发生变化的`url`都会被浏览器记录下来，所以浏览器的前进后退可以使用。
- hash 模式下，使用 URL 的 hash 来模拟一个完整的 URL，仅 hash 符号之前的内容会被包含在请求中，如 `http://www.abc.com`，因此对于后端来说，即使没有做到对路由的全覆盖，也不会返回 404 错误。
- history 模式下，这种模式充分利用 `history.pushState API` 来完成 URL 跳转而无须重新加载页面。前端的 URL 必须和实际向后端发起请求的 URL 一致，如 `http://www.abc.com/book/id`。如果后端缺少对/book/id 的路由处理，将返回 404 错误。
- 兼容性。hash 可以支持低版本浏览器和 IE。

#### 7.`v-if`和`v-for`能同时使用吗？为什么？

- 不推荐在同一元素上使用。

- 当它们处于同一节点，`v-for` 的优先级比 `v-if` 更高，这意味着 `v-if` 将分别重复运行于每个 `v-for` 循环中，影响性能。


#### 8.`nextTick()`作用？

- `nextTick()`是将回调函数延迟在下一次`dom`更新数据后调用，简单的理解是：当数据更新了，在`dom`中渲染后，自动执行该函数。
- `Vue`声明周期的created()钩子函数进行的DOM操作一定要放在`Vue.nextTick()`的回调函数中，因为created()执行的时候DOM实际上并未进行任何渲染，此时进行DOM操作无异于徒劳，所以此处一定要将DOM操作的`js`代码放进`Vue.nextTick()`的回调函数中。
- 在数据变化后要执行的某个操作，而这个操作需要使用随数据改变而改变的DOM结构的时候，这个操作应该放进`Vue.nextTick()`的回调函数中

#### 9.`v-for`中的key有什么用？

- 可以提高性能。`key` 是给每个 `vnode` 指定的唯一 `id`，在同级的 `vnode` diff 过程中，可以根据 `key` 快速的对比，来判断是否为相同节点，并且利用 `key` 的唯一性可以生成 `map` 来更快的获取相应的节点。

  另外指定 `key` 后，就不再采用“就地复用”策略了，可以保证渲染的准确性。

#### 10.`v-for`中为什么不要用index作为key？

- 更新DOM会出现性能问题

- 会发生一些状态bug

- 举个例子

  ```html
  <div>
    <div v-for="(item,index) in list" :key="index">
      {{item.name}}
    </div>
  </div>
  ```

  ```javascript
  const list = [
  	{
  		id:1,
  		name:'张三'
  	},
  	{
  		id:2,
  		name:'李四'
  	},
  	{
  		id:3,
  		name:'王五'
  	},
  	{
  		id:4,
  		name:'赵六'
  	},
  ]
  ```

  此时，删除最后一个`赵六`是正常的，因为前3个的`key`对应的数据没有变化，所以新生成的`Vnode`不会去渲染。但是如果删除`李四`就会有问题。

  删除前：

  | index |  id  | name | key  |
  | :---: | :--: | :--: | :--: |
  |   0   |  1   | 张三 |  0   |
  |   1   |  2   | 李四 |  1   |
  |   2   |  3   | 王五 |  2   |
  |   3   |  4   | 赵六 |  3   |

  删除后：

  | index |  id  | name | key  |
  | :---: | :--: | :--: | :--: |
  |   0   |  1   | 张三 |  0   |
  |   1   |  3   | 王五 |  1   |
  |   2   |  4   | 赵六 |  2   |

  删除李四后，除了张三外，剩下的与相应`key`的绑定关系有变化，所以被重新渲染，这会影响性能。

  假设有这样一个场景，`list`的`item`是select的选项，王五是被选中的。此时如果李四被删了，用`index`作为`key`的话，赵六就会变成选中的了，这就产生了bug。

#### 11.`vue`中`params`和`query`的区别？

- `params`只能用`name`引入路由，不能用`path`;`query`是`name`、`path`都可以。

- 使用`params`传参，要在路由后面加参数名，并且传参时，参数名要跟路由后面设置的参数名对应，`query`方式没有这种限制。

#### 12.`assets`和`static`的区别

- assets中的文件会经过`webpack`打包，重新编译，推荐该方式。而static中的文件，不会经过编译
- static中建议放一些外部第三方文件，自己的放到assets下，别人的放到static中。

#### 13.介绍一下`vuex`

- `vuex`是`vue`的状态管理模式。有`state`、`mutation`、`action`、`getter`、`module`属性。更改`store`中state属性的状态的唯一方法是提交`mutation`。

  > state:存放一些共享属性。
  >
  > mutation：一些能改变属性的方法，必须显示的提交mutation才能更改属性状态，过程		  是同步的。
  >
  > action：`action`提交的是mutation，而不是直接更改状态。action可以包含异步操作。
  >
  > ​		可以通过context.commit()直接提交mutation，也可以通过			       	    store.dispatch()来触发action以提交mutation。
  >
  > getter：相当于`store`的计算属性，getter的返回值会根据它的依赖被缓存起来，且只有    		当它的依赖发生了变化才会被重新计算。
  >
  > module：允许将store切割成模块（module），每个module拥有自己的state、mutation、action、getter。适用于复杂的应用。

#### 14.`mutation`和`action`的区别?

- `action`主要处理异步操作，`mutaion`必须是同步执行
- `action`中不进行状态的直接更改，而是通过`commit`触发`mutation`去更改状态
- `mutation`的触发通过`store.commit`,`action`的触发通过`store.dispatch`进行

#### 15.有三个组件共享了`vuex`中`state`的状态，其中一个组件改变了状态，另外两个组件不改变怎么实现？

- 可以用深拷贝在需要改变的组件里拷贝一份源对象，然后重新赋值。let copy = JSON.parse(JSON.stringfy(sourceObject))

#### 16.为什么vuex的mutation必须是同步的？

- 同步的意义在于每个mutation执行完成后都会对应到一个新的状态变更，这样devtools就可以打个快照存下来，我们可以更好的调试。如果mutation支持异步操作，就没有办法知道状态是何时更新的，无法很好的进行状态的追踪，给调试带来困难。

#### 17.子组件为什么不能修改父组件传递的prop？

- vue提倡单向数据流，即父级props的更新会流向子组件，但是反过来则不行。这是防止意外的改变父组件状态，使得应用难以理解。

#### 18.localStorage与vuex的区别？

- vuex存储在内存，localStorage则以文件的方式存储在本地。localStorage和sessionStorage只能存储字符串类型，对于复杂的对象可以使用ECMAScript提供的JSON.stringify(obj)将其转成字符串，取出来时使用 JSON.parse(str)重新转成对象。
- vuex是响应式的

## `Vue`相关原理分析

#### 1.`vue`的响应式原理

`Vue `的响应式是通过 `Object.defineProperty` 对数据进行劫持，并结合观察者模式实现。 `Vue `利用 `Object.defineProperty` 创建一个 `observe` 来劫持监听所有的属性，把这些属性全部转为 `getter` 和 `setter`。`Vue `中每个组件实例都会对应一个 `watcher` 实例，它会在组件渲染的过程中把使用过的数据属性通过 `getter` 收集为依赖。之后当依赖项的 `setter` 触发时，会通知 `watcher`，从而使它关联的组件重新渲染。


![](https://raw.githubusercontent.com/limchen233/images/master/img/17062a3aa3acd499)

#### 2.对Virtual DOM的理解

虚拟DOM在`Vue.js`主要做了两件事：

- 提供与真实DOM节点所对应的虚拟节点`vnode`
- 将新的虚拟节点`vnode`和旧虚拟节点`oldVnode`进行对比，然后更新视图

**虚拟DOM的最终目标是将虚拟节点渲染到视图上。**

`diff`算法

如果直接使用虚拟节点覆盖旧节点的话，会有很多不必要的操作。例如，一个`ul`标签下有很多个`li`标签,其中只有一个`li`有变化，这种情况下如果使用新的`ul`去替代旧的`ul`,因为这些不必要的DOM操作而造成了性能上的浪费。

为了实现高效的DOM操作，虚拟DOM在虚拟节点映射到视图的过程中，将虚拟节点与上一次渲染视图所使用的旧虚拟节点（`oldVnode`）做对比，**我们通过 patch 的核心—-`diff `算法，找出本次DOM需要更新的节点来更新，其他的不更新**。

**为何需要Virtual DOM？**

- 具备跨平台的优势

  由于 Virtual DOM 是以 JavaScript 对象为基础而不依赖真实平台环境，所以使它具有了跨平台的能力，比如说浏览器平台、`Weex`、`Node `等。

- 操作DOM慢，`js`运行效率高。我们可以将DOM对比操作放在`JS`层，提高效率。

  因为DOM操作的执行速度远不如`Javascript`的运算速度快，因此，把大量的DOM操作搬运到`Javascript`中，运用`diff`算法来计算出真正需要更新的节点，最大限度地减少DOM操作，从而显著提高性能。

  Virtual DOM 本质上就是在 `JS `和 DOM 之间做了一个缓存。可以类比 CPU 和硬盘，既然硬盘这么慢，我们就在它们之间加个缓存：既然 DOM 这么慢，我们就在它们 `JS `和 DOM 之间加个缓存。CPU（`JS`）只操作内存（Virtual DOM），最后的时候再把变更写入硬盘（DOM）

- 提升渲染性能

  Virtual DOM的优势不在于单次的操作，而是在大量、频繁的数据更新下，能够对视图进行合理、高效的更新。

## vue项目优化

1.`vue`中设置路由懒加载

2.图片压缩、css压缩、js压缩