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
