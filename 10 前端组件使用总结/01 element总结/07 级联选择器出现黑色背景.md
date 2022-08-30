最近做项目时用到了级联选择器，就出现了这个bug。以前用没有出现过这个情况，不知道和框架有没有关系。框架自带的element版本上2.8.0，我以为是版本问题，升级到最新版本项目直接报错。。。。后来退了一个版本(2.15.6)项目可以运行了，但hover时黑色背景依然存在。

仔细查看元素后，发现是列表`ul`中的`svg`的`path`出了问题，把它隐藏就好了。

```css
<style lang="scss">
    .el-cascader-menu__hover-zone path {
          display: none;
    }
</style>
```

> 注意：不能使用scoped