**1、下载git私有仓库**

```js
git clone https://用户名:token@github.com/用户名/仓库名.git

// 例如：
git clone https://limchen233:hyeyh778@github.com/limchen233/yuwell_prodLine.git
```

**2、给仓库打tag**

`github`上只有在工程首次创建tag时可以使用github界面生成tag，之后就要通过命令行啦。

命令：

```js
// 查看所有tag
git tag

// 用正则查看相匹配的tag
git tag -l "v1.0*"

// 添加tag
git tag -a tag_name -m "tag描述"

// 推送tag到远程
git push -u origin tag_name

// 删除tag
git tag -d tag_name

// tag重命名
git tag new_name old_name

// 删除远程旧tag
git push origin :refs/tags/old_name

// 推送新tag到远程
git push -u origin new_name

//tag删除后又出现，需要协同开发的人执行以下命令
git pull --prune --tags

```

