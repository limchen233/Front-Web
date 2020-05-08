// 面试题目：给定一个数组，按升序排列

// 冒泡排序，封装一个函数
function bubble(arr){
  // i代表轮数，j代表每轮的比较次数
  // 经过分析可知，轮数为数组长度-1，每轮比较次数为数组长度-1-i
  for(let i=0; i<arr.length-1; i++){
    for(let j=0; j<arr.length-1-i; j++){
      if(arr[j] > arr[j+1]){
        // 利用解构赋值进行数值交换
        [arr[j],arr[j+1]] = [arr[j+1],arr[j]]
      }
    }
  }
  return arr
}
let arr = [2,45,8,5,7,1,78,6]
console.log(bubble(arr))