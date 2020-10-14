function test(){
  // 局部变量
  var message = 'hello world'
  console.log(message) // hello world
}
test()

console.log(message) // 报错，ReferenceError: message is not defined 因为test()函数执行完后，局部变量被销毁了

function test1(){
  message = 'hello'
  console.log(message) // hello
}
test()
console.log(messsage) // hello