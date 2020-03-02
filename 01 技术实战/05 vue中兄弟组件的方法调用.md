今天做项目碰到一个需求，一个父组件里有两个兄弟组件childA和childB，当childA的一个方法执行完成后让childB里的其中一个函数也执行。

解决思路：

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

子组件 childA，B里有一个方法	

	<script>
		methods:{
			testB(){
			console.log('我是childB里的方法')
			}
		}
	</script>
