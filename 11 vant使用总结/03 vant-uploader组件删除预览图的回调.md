`van-uploader`属性

![](https://github.com/limchen233/picgo/blob/master/img/image-20201117144350751.png?raw=true)



![](https://github.com/limchen233/picgo/blob/master/img/image-20201117144434937.png?raw=true)

```
// 删除图片前的回调，可以返回Promise
delImg (file, detail) {
  return new Promise((resolve, reject) => {
    this.$dialog.confirm({
      message: '确认删除图片？'
    }).then(() => {
      this.refProp.value.splice(detail.index, 1)
      this.$toast.success('删除成功')
      resolve()
    }).catch(error => {
      this.$toast.fail('已取消')
      reject(error)
    })
  })
},
```

