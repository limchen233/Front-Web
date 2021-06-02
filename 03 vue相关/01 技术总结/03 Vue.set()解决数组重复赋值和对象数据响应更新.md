在项目中有时我们会从一个后台接口返回的数组中遍历数据，然后把需要的 data 添加到一个新的数组中，用传统的 push 方法会有一个问题：两次请求这个接口时，新数组又 push 了一遍，所以数组就会重复。

解决方法一：在 push 前先清空新数组。

![](https://i.imgur.com/dxw7OMA.png)

解决方法二：利用 Vue 的 Vue.set()方法（vm.$set()）

Vue.set()接收三个参数 Vue.set(target,key,value)

参数类型：

target:{Object | Array}

key:{string | number}

value:{any}

![](https://i.imgur.com/Y1rRGp6.png)


Vue.set() 的另外用途：

在我们使用vue进行开发的过程中，可能会遇到一种情况：当生成vue实例后，当再次给数据赋值时，有时候并不会自动更新到视图上去； 当我们去看vue文档的时候，会发现有这么一句话：如果在实例创建之后添加新的属性到实例上，它不会触发视图更新。如下代码，给 student对象新增 age 属性:

    data () {
      return {
        student: {
          name: '',
          sex: ''
        }
      }
    },
    mounted () { // ——钩子函数，实例挂载之后
      this.student.age = 24
    }

受 ES5 的限制，Vue.js 不能检测到对象属性的添加或删除。因为 Vue.js 在初始化实例时将属性转为 getter/setter，所以属性必须在 data 对象上才能让 Vue.js 转换它，才能让它是响应的。

正确写法：this.$set(this.data,”key”,value'),如下：

    mounted () {
      this.$set(this.student,"age", 24)
    }

注意：Vue 不允许动态添加根级响应式属性。例如：

    const app = new Vue({
      data: {
        a: 1
      },
      render: h => h(Suduko)
        }).$mount('#app1')

      Vue.set(app.data, 'b', 2)

此时会报错：

![](https://i.imgur.com/bIzlUIy.png)

只可以使用 Vue.set(object, propertyName, value) 方法向嵌套对象添加响应式属性，例如：

    var vm=new Vue({
      el:'#test',
      data:{
        //data中已经存在info根属性
        info:{
          name:'小明';
        }
      }
    });
    //给info添加一个性别属性
    Vue.set(vm.info,'sex','男');


