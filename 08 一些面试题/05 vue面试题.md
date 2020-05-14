## 生命周期相关问题

#### 1.`vue`组件有哪些生命周期函数？

- `beforeCreate`、`created`、`beforeMount`、mounted、`beforeUpdate`、`updated`、`beforeDestroy`、`destroyed`
- <keep-alive>有自己独立的钩子函数`activated`和`deactivated`,当引入`keep-alive` 的时候，页面第一次进入，钩子的触发顺序`created`-> `mounted`-> `activated`，退出时触发`deactivated`。当再次进入（前进或者后退）时，只触发`activated`。

#### 2.`vue`的父组件和子组件生命周期钩子执行顺序是什么？

- **渲染过程**

  父组件挂载一定是等子组件都挂载完成后，才算是父组件挂载完成，所以父组件的mounted在子组件的mounted之后

  父`beforeCreate` -> 父`created `-> 父`beforeMount `-> 子`beforeCreate `-> 子`created `-> 子`beforeMount `-> 子`mounted `-> 父`mounted`

- **更新过程**

  父`beforeUpdate `-> 子`beforeUpdate`->子`updated `-> 父`updted`

- **销毁过程**

  父`beforeDestroy `-> 子`beforeDestroy `-> 子`destroyed `-> 父`destroyed`

- 不管是哪种情况，都一定是父组件等待子组件完成后，才会执行自己对应完成的钩子

#### 3.`vue`路由生命周期函数？

全局的

- `router.beforeEach(to,from,next)` 前置守卫
- `router.beforeResolve` 解析守卫
- `router.afterEach(to,from)` 后置钩子,不会接受 `next` 函数也不会改变导航本身：

单个路由独享的

- `beforeEnter(to,from,next)` 与全局前置守卫的方法参数是一样的

组件级的

- `beforeRouteEnter`
- `beforeRouteUpdate`
- `beforeRouteLeave`



## 相关属性的作用&相似属性对比

#### 1.`v-show`和`v-if`的区别？

`v-show`是基于`css`进行切换，不管初始条件是什么，都会渲染

`v-if`会在切换过程中对条件块的事件监听器和子组件进行销毁和重建，如果初始条件是`false`，则什么都不做，直到条件第一次为`true`时才开始渲染模块。

`v-if`切换的开销大，`v-show`初始渲染开销大。

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
- 用途：`js`可以写 `es6`、`style `样式可以 `scss `或 `less`；`template `可以加 `jade `等。

#### 6.`vue`中hash模式和history模式的区别

- 相同点：都不会重新加载页面

- hash模式下，请求地址带#，history不带

- ###### hash 模式下，使用 URL 的 hash 来模拟一个完整的 URL，仅 hash 符号之前的内容会被包含在请求中，如 [www.abc.com](http://www.abc.com)，因此对于后端来说，即使没有做到对路由的全覆盖，也不会返回 404 错误。

- ###### history 模式下，这种模式充分利用 `history.pushState API` 来完成 URL 跳转而无须重新加载页面。前端的 URL 必须和实际向后端发起请求的 URL 一致，如 [www.abc.com/book/id。(http://www.abc.com/book/id。如果后端缺少对/book/id 的路由处理，将返回 404 错误。

- 兼容性。hash 可以支持低版本浏览器和 IE。

#### 7.`v-if`和`v-for`能同时使用吗？为什么？

- 不推荐在同一元素上使用。

- 当它们处于同一节点，`v-for` 的优先级比 `v-if` 更高，这意味着 `v-if` 将分别重复运行于每个 `v-for` 循环中。影响性能。


#### 8.`nextTick()`解决了什么？

- `nextTick()`是将回调函数延迟在下一次`dom`更新数据后调用，简单的理解是：当数据更新了，在`dom`中渲染后，自动执行该函数。

#### 9.`v-for`中的key有什么用？

- 可以提高性能。`key` 是给每个 `vnode` 指定的唯一 `id`，在同级的 `vnode`  diff 过程中，可以根据 `key` 快速的对比，来判断是否为相同节点，并且利用 `key` 的唯一性可以生成 `map` 来更快的获取相应的节点。
- 另外指定 `key` 后，就不再采用“就地复用”策略了，可以保证渲染的准确性。

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

## `Vue`相关原理分析

#### 1.`vue`的响应式原理

`Vue `的响应式是通过 `Object.defineProperty` 对数据进行劫持，并结合观察者模式实现。 `Vue `利用 `Object.defineProperty` 创建一个 `observe` 来劫持监听所有的属性，把这些属性全部转为 `getter` 和 `setter`。`Vue `中每个组件实例都会对应一个 `watcher` 实例，它会在组件渲染的过程中把使用过的数据属性通过 `getter` 收集为依赖。之后当依赖项的 `setter` 触发时，会通知 `watcher`，从而使它关联的组件重新渲染。


![](https://raw.githubusercontent.com/limchen233/images/master/img/17062a3aa3acd499)

#### 2.对Virtual DOM的理解

虚拟DOM在`Vue.js`主要做了两件事：

- 提供与真实DOM节点所对应的虚拟节点`vnode`
- 将虚拟节点`vnode`和旧虚拟节点`oldVnode`进行对比，然后更新视图

**虚拟DOM的最终目标是将虚拟节点渲染到视图上。**

但是如果直接使用虚拟节点覆盖旧节点的话，会有很多不必要的操作。例如，一个`ul`标签下有很多个`li`标签,其中只有一个`li`有变化，这种情况下如果使用新的`ul`去替代旧的`ul`,因为这些不必要的DOM操作而造成了性能上的浪费。

为了实现高效的DOM操作，虚拟DOM在虚拟节点映射到视图的过程中，将虚拟节点与上一次渲染视图所使用的旧虚拟节点（`oldVnode`）做对比，**我们通过 patch 的核心—-`diff `算法，找出本次DOM需要更新的节点来更新，其他的不更新**。

**为何需要Virtual DOM？**

- 具备跨平台的优势

由于 Virtual DOM 是以 JavaScript 对象为基础而不依赖真实平台环境，所以使它具有了跨平台的能力，比如说浏览器平台、`Weex`、`Node `等。

- 操作DOM慢，`js`运行效率高。我们可以将DOM对比操作放在`JS`层，提高效率。

因为DOM操作的执行速度远不如`Javascript`的运算速度快，因此，把大量的DOM操作搬运到`Javascript`中，运用`diff`算法来计算出真正需要更新的节点，最大限度地减少DOM操作，从而显著提高性能。

Virtual DOM 本质上就是在 `JS `和 DOM 之间做了一个缓存。可以类比 CPU 和硬盘，既然硬盘这么慢，我们就在它们之间加个缓存：既然 DOM 这么慢，我们就在它们 `JS `和 DOM 之间加个缓存。CPU（`JS`）只操作内存（Virtual DOM），最后的时候再把变更写入硬盘（DOM）

- 提升渲染性能

Virtual DOM的优势不在于单次的操作，而是在大量、频繁的数据更新下，能够对视图进行合理、高效的更新。

**`diff `算法的实现过程**

`diff `算法本身非常复杂，实现难度很大。粗略介绍以下两个核心函数实现流程：

- patch(`container`,`vnode`) :初次渲染的时候，将`VDOM`渲染成真正的DOM然后插入到容器里面。
- patch(`vnode`,`newVnode`):再次渲染的时候，将新的`vnode`和旧的`vnode`相对比，然后之间差异应用到所构建的真正的DOM树上。