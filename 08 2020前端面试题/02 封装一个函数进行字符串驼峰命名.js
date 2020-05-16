// 面试题：封装一个函数进行字符串驼峰命名,比如：str = 'get_element_by_id'
// 分析
// 1.获取字符串
let str = 'get_element_by_id'

// 2.将字符串转换成数组
let arr = str.split('_')
console.log(arr) // ['get','element','by','id']

// 3.将除第一个单词外的其它单词的首字母变成大写（驼峰命名第一个单词不用大写）
let str1 = arr[1].charAt(0).toUpperCase() // E

// 4.将首字母和其它小写字母连接起来
let str2 = str1 + arr[1].substr(1) // Element

// 5.以此类推，其它的单词也要变成大写。3,4步可以用一个for循环
for(let i = 1; i < arr.length; i++) { //因为数组内第一个单词的首字母不用大写，所以下标从1开始
  arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].substr(1)
}
console.log(arr) // ['get', 'Element', 'By', 'Id']

// 6.将数组拼接成字符串
arr = arr.join('')
console.log(arr) // getElementById


// 将以上逻辑封装成函数
function toUpper(str){
  let arr = str.split('_')
  for(let i=1; i<arr.length; i++) {
    arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].substr(1)
  }
  return arr.join('')
}