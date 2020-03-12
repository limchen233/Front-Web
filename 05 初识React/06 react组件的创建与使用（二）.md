## react组件的创建与使用（二）

### 创建react组件的第二种方法--使用 class 关键字创建组件

**1、class 关键字介绍**

> class 关键字是 ES6 中实现面向对象的新形式

> 每一个 class 中，都有一个构造器，如果我们没有手动指定构造器，可以认为类内部有个隐形的空构造器，类似于 constructor(){}

> 在 class 中，通过 new 出来的实例访问的属性叫做实例属性，通过类名访问的属性叫做静态属性；静态属性和方法可用 static 修饰

> 构造器的作用：每当 new 这个类的时候，必然会优先执行构造器中的代码


创建一个动物类

    class Animal{
      
    }
    
    const a1 = new Animal() // 这时候a1是一个空的Animal对象

给类传递参数

    class Animal{
      constructor(name,age){
        //实例属性
        this.name = name
        this.age = age
      }
      
      say(){} // 实例方法
      static msg = 'hello' //静态属性
      static show(){} // 静态方法
    }
    
    const a1 = new Animal('大黄', 2)
    console.log(a1) // {name:'大黄', age:2}
    console.log(Animal.msg) // hello 静态属性只能通过类名访问

**2、class 注意点**

> 在 class 的 {} 区间内，只能写构造器、实例方法、静态方法和静态属性

> class 关键字内部还是用的构造函数实现的，所以我们把 class 关键字称作语法糖

**3、类中的继承**

> 在 class 中，可以使用 extends 关键字，实现子类继承父类

![](https://i.imgur.com/AvXSKXk.png)

> 在父类中定义一个方法,子类可以通过实例访问到这个方法

![](https://i.imgur.com/LPekIym.png)

> 如果一个子类通过 extends 继承了父类，那么如果我们在子类中手动写了构造器，则在 constructor(){} 构造器中**必须先调用** super() 方法

> super()是一个函数，而且它是父类的构造器；子类中的 super() 其实就是父类中 constructor构造器的引用

![](https://i.imgur.com/qBzQUQw.png)

> 如果一个子类中有属性是独有的，则该属性应该挂载在所属的子类中，而非父类构造器中，因为挂载到父类中所有继承该父类的子类都将获得此属性。挂载后需要在子类构造器中分配一下，this.xxx = xxx

![](https://i.imgur.com/COkXJfK.png)

4、使用 class 关键字创建组件

> 基本语法：

> 1、使用 class 关键字创建组件，必须继承 React.Component

> 2、组件内部必须有 render 函数

> 3、render 函数中，要有返回的 JSX 虚拟 DOM 元素

    class 组件名称 extends React.Component {
        render(){
           return <div>这是 class 创建的组件</div>
        }
    }

![](https://i.imgur.com/puhWbu5.png)

![](https://i.imgur.com/CRfbmn1.png)

5、给 class 创建的组件传参

> 使用 class 关键字创建的组件，如果想使用外界传过来的 props 参数，不需要接收，直接通过 this.props.xxx 访问即可。

![](https://i.imgur.com/zJWLZpg.png)
