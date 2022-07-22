#### 一、将本地项目/分支上传到git远程仓库

```js
// 1、本地项目创建好后，初始化git
git init
 
// 2、将本地仓库和远程仓库关联（如果没有远程仓库就创建一个）
git remote add origin 远程仓库地址 // （在远程仓clone地址）（远程库的名字就是origin，这是Git默认的叫法，也可以改成别的。）
 
// 3、将本地代码上传到远程
git push -u origin 远程仓库名 //（-u参数，Git不但会把本地的分支内容推送的远程新的分支，还会把本地的分支和远程的分支关联起来）
```

#### 二、查看配置的远程仓库

```js
git remote -v
```

#### 三、删除本地指定的远程地址

```
git remote remove origin
```

> 有时我们在将本地仓库关联远程仓库时会报错，可以使用上面两步查看已关联的远程仓库，移除关联关系后，重新关联。

#### 四、查看所有分支

```js
git branch -a
```

#### 五、创建新分支

```js
git branch 新分支 // 创建新分支
 
git checkout -b 新分支 // 创建并切换到新分支
 
git switch -b 新分支 // 创建并切换到新分支
```

#### 六、切换到某个分支

```js
git checkout 分支名
或
git switch 分支名
```

#### 七、合并分支

```js
// 先切换到要合并的分支
git checkout 要合并的分支
 
// 执行合并
git merge 被合并的分支
```

> 例如：将b分支合并到a分支，而我当前在b分支
>
> git checkout a
>
> git merge b
>
> git push 推送到远程

合并时有时会报错：

> ```js
> fatal: refusing to merge unrelated histories（拒绝合并不相关的历史）
> ```
>
> 出现这个问题的最主要原因在于本地仓库和远程仓库实际上是独立的两个仓库。
>
> 解决方法：
>
> ```js
> git pull origin 远程分支名 --allow-unrelated-histories  // 将远程仓库的文件拉取到本地仓库
>  
> // 比如上面b合并到a报错，可以这样操作：(在a分支中执行)
> git pull origin b --allow-unrelated-histories
>  
> // 然后执行提交操作(有冲突要先解决冲突)
> git add .
> git commit -m 'xxx'
> git push <远程主机名> <本地分支名>:<远程分支名> 或 git push
> 
> // 例如
> git push origin main:main
> ```
>
> 假如我之前是直接clone的方式在本地建立起远程`github`仓库的克隆，本地仓库就不会有这问题了。
>
> `git push是git push origin main:main`的一种简写形式
>
> （1）当只关联一个远程，只有一个分支时，这两个命令没什么区别。
>
> （2）当你关联了两个多个仓库、有多个分支时，git push可能会报错，因为它不知道要上传代码到哪里去；而git push origin main:main指定仓库和分支，就不会报错。

#### 八、修改分支名

```js
// 1、还没有推送到远程
git branch -m oldName newName
 
// 2、已经推送到远程
（1）git branch -m oldName newName // 修改本地分支名
（2）git push origin newName // 上传新命名的本地分支到远程仓库（会创建新的远程分支）
（3）git push -u origin newName // 将本地分支和远程仓库关联起来
（4）git push origin -d oldName // 删除远程旧的分支
```

