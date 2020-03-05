今天做项目碰到一个需求，一个父组件里有两个兄弟组件，当一个子组件的一个方法执行完成后让另外个子组件里的其中一个函数也执行。

假设父组件 parent

	<div>
	  <childA></childA>
	  <childB></childB>
	</div>

子组件 childA，A里有一个方法

	<script>
	  methods:{
	    testA(){
	      console.log('我是childA里的方法')
	    }
	  }
	</script>

子组件 childB，B里有一个方法	

	<script>
	  methods:{
	    testB(){
          console.log('我是childB里的方法')
        }
      }
	</script>

需求：当childA里的testA()执行完成后，childB里的testB()也执行。

解决思路：

利用ref属性，给childB组件添加一个ref属性，父组件通过this.$refs.xxx.xxxx调用子组件childB的testB()，然后childA组件用$.emit触发父组件的事件，父组件去监听。

parent组件

	<div>
	  <childA @parentFn="updateChildB"></childA> // 4、父组件所监听的updateChildB函数去调用子组件childB的testB()，从而实现兄弟组件方法的互调
	  <childB ref="childB"></childB> // 1、添加ref属性
	</div>
	<script>
	  // 父组件里的方法
	  updateChildB(){
	    this.$refs.childB.testB() // 2、父组件调用childB子组件的testB()
	  }
	</script>

childA组件

	<script>
	  methods:{
	    testA(){
	      console.log('我是childA里的方法')
	      this.$emit('parentFn') // 3、用$emit触发父组件的事件
	    }
	  }
	</script>

