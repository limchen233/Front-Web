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
> （2）当你关联了两个多个仓库、有多个分支时，git push可能会报错，因为它不知道要上传代码到哪里去；而`git push origin main:main`指定仓库和分支，就不会报错。

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

#### 九、删除分支

```js
// 删除本地分支
git branch -d 分支名
 
// 删除远程分支
git push origin -d 远程分支名
```

> 如果不确定分支名，删除前可以先查看所有分支，`git branch -a`会列出所有分支：
>
> ![](https://img-blog.csdnimg.cn/0e5a34bcc94c42508ea703145d489175.png)
>
> 以`remotes`开头的就是远程分支，其它为本地分支，*号代表当前所在的分支
>
> 比如删除远程分支`master：git push origin -d master`

#### 十、删除某条commit记录

```js
1、git reflog // 得到最近的提交记录，能获取commitId
```

![img](https://img-blog.csdnimg.cn/91c6958f31d2497a81fb63ad1a07b9f9.png)

```js
2、git rebase -i commitID // 比如 git rebase -i 9efb5ce
```

执行完这个命令后，就可以看到 `9efb5ce` 的 commit 记录。如下图,默认是使用 vim 编辑器打开了commit log list。然后我们就可以针对我们不需要的某些 log 进行删除。把原本的 pick 单词修改为 drop 就表示该ID对应的 commit log 我们需要删除。vim保存退出。

![img](https://img-blog.csdnimg.cn/149dda2624fb4e8094b91549d2a1a53c.png)

```js
3、合并冲突并提交
git add .                   # 冲突时使用
git commit -m "new commit"  # 冲突时使用
git rebase --continue       # 冲突时使用
git push origin 远程分支名 -f  // -f 强制推送
```

然后现在去查看远程分支的此commit就没了。

#### 十一、撤销commit

```js
// 撤销最近一次的提交
git reset --soft(或--hard) HEAD^
```

> HEAD^的意思是上一个版本，也可以写成HEAD~1
>
> 如果你进行了2次commit，想都撤回，可以使用HEAD~2
>
> --mixed
>
> 意思是：不删除工作空间改动代码，撤销commit，并且撤销git add . 操作
>
> 这个为默认参数,git reset --mixed HEAD^ 和 git reset HEAD^ 效果是一样的。
>
> --soft
>
> 不删除工作空间改动代码，撤销commit，不撤销git add . 
>
> --hard
>
> 删除工作空间改动代码，撤销commit，撤销git add . 
>
> 注意完成这个操作后，就恢复到了上一次的commit状态。

#### 十二、修改commit信息

```js
git commit --amend
 
此时会进入默认vim编辑器，修改注释完毕后保存就好了。
```

#### 十三、下载git私有仓库

```js
git clone https://用户名:token@github.com/用户名/仓库名.git

// 例如：
git clone https://limchen233:hyeyh778@github.com/limchen233/yuwell_prodLine.git
```

#### 十四、给仓库打tag

`github`上只有在工程首次创建tag时可以使用`github`界面生成tag，之后就要通过命令行啦。

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

#### 十五、fork项目更新

```js
线上fork别人项目后，将fork的项目clone到本地，进入本地项目，设置远程源项目地址

git remote -v  // 查看本地仓库关联的所有远程仓库地址

// 添加关联远程仓库地址
git remote add upstream(可以取其它名称) 源仓库地址
git remote -v // 查看是否关联成功

// 删除关联远程项目
git remote remove 仓库名（默认origin）  例：git remote remove upstream

1、拉取更新
// 拉取源仓库更新
git fetch upstream

// 将源仓库更新合并到本地代码
git merge upstream/分支名

// 更新合并自己远程仓库代码
git pull origin 分支名

// 向自己远程仓库推送合并源仓库后的代码
git push

2、提交更新
本地仓库代码改变后，提交到自己远程仓库，然后在自己远程仓库创建`merge request`
进入远程仓库，左边菜单找到`Merge Requests`

```

![image-20230119152658681](https://raw.githubusercontent.com/limchen233/picgo/master/img/image-20230119152658681.png)

选择`New merge request`

![image-20230119152801813](https://raw.githubusercontent.com/limchen233/picgo/master/img/image-20230119152801813.png)

下一步：

![image-20230119153118015](https://raw.githubusercontent.com/limchen233/picgo/master/img/image-20230119153118015.png)

创建成功后源仓库的管理员会收到一个merge请求，检查后合并就OK了。
