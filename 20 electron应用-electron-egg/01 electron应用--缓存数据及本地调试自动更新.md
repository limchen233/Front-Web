#### 缓存位置

```
缓存位置：C:\Users\Administrator\AppData\Roaming\yuwell
数据库和缓存数据都在此文件夹  data数据库 log日志

安装包缓存位置：C:\Users\Administrator\AppData\Local\yuwell-updater
或 C:\Users\Administrator\AppData\Local\yuwell
```

#### 本地调试更新

如果想在本地环境调试更新，只检查是否有更新是可以的，但是在下载时会报错找不到`dev-app-update.yml`文件，我们可以在根目录(或报错时显示的目录下)手动新建一个`dev-app-update.yml`，然后将打包成功后生成的`out\win-unpacked\resources\app-update.yml`里的内容复制到`dev-app-update.yml`就可以了。

> 还有的说`dev-app-update.yml`内容用打包后生成的`latest.yml`文件内容。我试了一下这两个文件都可以，只不过下载成功后生成的安装包缓存文件夹名不一样。使用`app-update.yml`的内容生成的文件夹名是`productName-updater`，使用`latest.yml`生成的文件夹名是`productName`。例如：`yuwell-updater`和`yuwell`

#### 检查更新

检查更新时如果**有可用更新**会触发`update-available`方法。**无可用更新**会触发`update-not-available`，然后校验我们上传到下载服务器地址中的`latest.yml`文件中的`version`字段，自动和本地版本作比较。这两个方法都会将`latest.yml`中的信息封装成一个对象并返回，信息如下：

```json
info: {
  version: '1.0.2',
  files: [
    {
      url: 'yuwell-win-1.0.2-x64.exe',
      sha512: 'OwAZtKnmY9S8ODOPIdvM1KIiX1dvULcwJ4YN3JkfoVzsTBjIZvQtQ2oJuTMMm5ANAF6ACj6jaS1XpFLewmeRgA==',
      size: 70303044
    }
  ],
  path: 'yuwell-win-1.0.2-x64.exe',
  sha512: 'OwAZtKnmY9S8ODOPIdvM1KIiX1dvULcwJ4YN3JkfoVzsTBjIZvQtQ2oJuTMMm5ANAF6ACj6jaS1XpFLewmeRgA==',
  releaseDate: '2023-01-13T06:45:49.032Z'
}
```

`latest.yml`文件的内容：

```yaml
version: 1.0.2
files:
  - url: yuwell-win-1.0.2-x64.exe
    sha512: OwAZtKnmY9S8ODOPIdvM1KIiX1dvULcwJ4YN3JkfoVzsTBjIZvQtQ2oJuTMMm5ANAF6ACj6jaS1XpFLewmeRgA==
    size: 70303044
path: yuwell-win-1.0.2-x64.exe
sha512: OwAZtKnmY9S8ODOPIdvM1KIiX1dvULcwJ4YN3JkfoVzsTBjIZvQtQ2oJuTMMm5ANAF6ACj6jaS1XpFLewmeRgA==
releaseDate: '2023-01-13T06:45:49.032Z'
```

我们可以设置一个`status`或其它字段来标识是否有可用更新，将这个字段返回给前台。

#### 自动更新本地配置

1、修改本地配置文件`config/config.default.js`

```js
/* 应用自动升级 (可选) */
  config.autoUpdate = {
    windows: true, // windows平台
    macOS: false, // macOs 需要签名验证
    linux: false, // linux平台
    options: {
      provider: 'generic', // or github, s3, bintray
      url: 'http://127.0.0.1:8082/' //正式环境换要换成正式地址
    },
    force: false // 强制更新（运行软件时，检查新版本并后台下载安装）
  }
```

2、首先本地要安装`nginx`。见网上安装教程。

3、根据自己的需要修改`nginx.conf`配置文件。

```yaml
server {
    listen       8082; # 上面的端口要一致
    server_name  localhost;
    location / {
        root   home; # 根路径
        index  index.html index.htm;
    }
}
```

4、将打包后的安装包及升级文件放在根目录`home`下，如图：

![image-20230516152449791](https://raw.githubusercontent.com/limchen233/picgo/master/img/image-20230516152449791.png)

`latest.yml`是比较版本的文件，切记要上传。每次都要上传两个文件，`latest.yml`和`.exe`安装包。同名文件会覆盖。
