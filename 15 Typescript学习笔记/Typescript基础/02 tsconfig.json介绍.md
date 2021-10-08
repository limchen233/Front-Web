## 一、tsconfig.json 简介

### 1. 什么是 tsconfig.json

TypeScript 使用 tsconfig.json 文件作为其配置文件，当一个目录中存在 tsconfig.json 文件，则认为该目录为 TypeScript 项目的根目录。

通常 tsconfig.json 文件主要包含两部分内容：**指定待编译文件**和**定义编译选项**。

目前 tsconfig.json 文件有以下几个顶层属性：

- compileOnSave
- compilerOptions
- exclude
- extends
- files
- include
- references
- typeAcquisition

### 2、为什么使用tsconfig.json

通常我们可以使用 `tsc` 命令来编译少量 TypeScript 文件：

```
/*
  参数介绍：
  --outFile // 编译后生成的文件名称
  --target  // 指定ECMAScript目标版本
  --module  // 指定生成哪个模块系统代码
  index.ts  // 源文件
*/
$ tsc --outFile leo.js --target es3 --module amd index.ts
```

但如果实际开发的项目，很少是只有单个文件，当我们需要编译整个项目时，就可以使用 tsconfig.json 文件，将需要使用到的配置都写进 tsconfig.json 文件，**这样就不用每次编译都手动输入配置，另外也方便团队协作开发**。

## 二、使用 tsconfig.json

目前使用 tsconfig.json 有2种操作：

**1.初始化tsconfig.json**

初始化操作，也有 2 种方式：

1. 手动在项目根目录（或其他）创建 tsconfig.json 文件并填写配置；
2. 在根目录通过执行 `tsc --init` 初始化 tsconfig.json 文件。

**2.指定需要编译的目录**

**在不指定输入文件的情况下**执行 `tsc` 命令，默认从当前目录开始编译，编译所有 `.ts` 文件，并且从当前目录开始查找 tsconfig.json 文件，并逐级向上级目录搜索。

```
$ tsc
```

另外也可以为 `tsc` 命令指定参数 `--project` 或 `-p` 指定需要编译的目录，该目录需要包含一个 tsconfig.json 文件，如：

```
/*
  文件目录：
  ├─src/
  │  ├─index.ts
  │  └─tsconfig.json
  ├─package.json
*/
$ tsc --project src
```

**注意，tsc 的命令行选项具有优先级，会覆盖 tsconfig.json 中的同名选项。**



## 三、tsconfig.json配置介绍

### 1. compileOnSave

`compileOnSave` 属性作用是**设置保存文件的时候自动编译，但需要编译器支持**。

```json
{
    // ...
  "compileOnSave": false,
}
```

### 2. compilerOptions

`compilerOptions` 属性作用是**配置编译选项**。
若 `compilerOptions` 属性被忽略，则编译器会使用默认值，可以查看[《官方完整的编译选项列表》](https://www.typescriptlang.org/docs/handbook/compiler-options.html)。
编译选项配置非常繁杂，有很多配置，这里只列出常用的配置

```json
{
  // ...
  "compilerOptions": {
    "incremental": true, // TS编译器在第一次编译之后会生成一个存储编译信息的文件，第二次编译会在第一次的基础上进行增量编译，可以提高编译的速度
    "tsBuildInfoFile": "./buildFile", // 增量编译文件的存储位置
    "diagnostics": true, // 打印诊断信息 
    "target": "ES5", // 目标语言的版本
    "module": "CommonJS", // 生成代码的模板标准
    "outFile": "./app.js", // 将多个相互依赖的文件生成一个文件，可以用在AMD模块中，即开启时应设置"module": "AMD",
    "lib": ["DOM", "ES2015", "ScriptHost", "ES2019.Array"], // TS需要引用的库，即声明文件，es5 默认引用dom、es5、scripthost,如需要使用es的高级版本特性，通常都需要配置，如es8的数组新特性需要引入"ES2019.Array",
    "allowJS": true, // 允许编译器编译JS，JSX文件
    "checkJs": true, // 允许在JS文件中报错，通常与allowJS一起使用
    "outDir": "./dist", // 指定输出目录
    "rootDir": "./", // 指定输出文件目录(用于输出)，用于控制输出目录结构
    "declaration": true, // 生成声明文件，开启后会自动生成声明文件
    "declarationDir": "./file", // 指定生成声明文件存放目录
    "emitDeclarationOnly": true, // 只生成声明文件，而不会生成js文件
    "sourceMap": true, // 生成目标文件的sourceMap文件
    "inlineSourceMap": true, // 生成目标文件的inline SourceMap，inline SourceMap会包含在生成的js文件中
    "declarationMap": true, // 为声明文件生成sourceMap
    "typeRoots": [], // 声明文件目录，默认时node_modules/@types
    "types": [], // 加载的声明文件包
    "removeComments":true, // 删除注释 
    "noEmit": true, // 不输出文件,即编译后不会生成任何js文件
    "noEmitOnError": true, // 发送错误时不输出任何文件
    "noEmitHelpers": true, // 不生成helper函数，减小体积，需要额外安装，常配合importHelpers一起使用
    "importHelpers": true, // 通过tslib引入helper函数，文件必须是模块
    "downlevelIteration": true, // 降级遍历器实现，如果目标源是es3/5，那么遍历器会有降级的实现
    "strict": true, // 开启所有严格的类型检查
    "alwaysStrict": true, // 在代码中注入'use strict'
    "noImplicitAny": true, // 不允许隐式的any类型
    "strictNullChecks": true, // 不允许把null、undefined赋值给其他类型的变量
    "strictFunctionTypes": true, // 不允许函数参数双向协变
    "strictPropertyInitialization": true, // 类的实例属性必须初始化
    "strictBindCallApply": true, // 严格的bind/call/apply检查
    "noImplicitThis": true, // 不允许this有隐式的any类型
    "noUnusedLocals": true, // 检查只声明、未使用的局部变量(只提示不报错)
    "noUnusedParameters": true, // 检查未使用的函数参数(只提示不报错)
    "noFallthroughCasesInSwitch": true, // 防止switch语句贯穿(即如果没有break语句后面不会执行)
    "noImplicitReturns": true, //每个分支都会有返回值
    "esModuleInterop": true, // 允许export=导出，由import from 导入
    "allowUmdGlobalAccess": true, // 允许在模块中全局变量的方式访问umd模块
    "moduleResolution": "node", // 模块解析策略，ts默认用node的解析策略，即相对的方式导入
    "baseUrl": "./", // 解析非相对模块的基地址，默认是当前目录
    "paths": { // 路径映射，相对于baseUrl
      // 如使用jq时不想使用默认版本，而需要手动指定版本，可进行如下配置
      "jquery": ["node_modules/jquery/dist/jquery.min.js"]
    },
    "rootDirs": ["src","out"], // 将多个目录放在一个虚拟目录下，用于运行时，即编译后引入文件的位置可能发生变化，这也设置可以虚拟src和out在同一个目录下，不用再去改变路径也不会报错
    "listEmittedFiles": true, // 打印输出文件
    "listFiles": true// 打印编译的文件(包括引用的声明文件)
  }
}
```

### 3. exclude

`exclude` 属性作用是**指定编译器需要排除的文件或文件夹。**默认排除 `node_modules` 文件夹下文件。

```json
{
    // ...
  "exclude": [
    "src/lib" // 排除src目录下的lib文件夹下的文件不会编译
  ]
}
```

和 `include` 属性一样，支持 glob 通配符：

- `*` 匹配0或多个字符（不包括目录分隔符）
- `?` 匹配一个任意字符（不包括目录分隔符）
- `**/` 递归匹配任意子目录

### 4. extends

`extends` 属性作用是**引入其他配置文件，继承配置**。默认包含当前目录和子目录下所有 TypeScript 文件。

```json
{
    // ...
  // 把基础配置抽离成tsconfig.base.json文件，然后引入
    "extends": "./tsconfig.base.json"
}
```

### 5. files

`files` 属性作用是**指定需要编译的单个文件列表**。默认包含当前目录和子目录下所有 TypeScript 文件。

```json
{
    // ...
  "files": [
    // 指定编译文件是src目录下的leo.ts文件
    "scr/leo.ts"
  ]
}
```

### 6. include

`include` 属性作用是**指定编译需要编译的文件或目录**。

```json
{
    // ...
  "include": [
    // "scr" // 会编译src目录下的所有文件，包括子目录
    // "scr/*" // 只会编译scr一级目录下的文件
    "scr/*/*" // 只会编译scr二级目录下的文件
  ]
}
```

### 7. references

`references` 属性作用是**指定工程引用依赖。**
在项目开发中，有时候我们为了方便将前端项目和后端`node`项目放在同一个目录下开发，两个项目依赖同一个配置文件和通用文件，但我们希望前后端项目进行灵活的分别打包，那么我们可以进行如下配置：

```json
{
    // ...
  "references": [ // 指定依赖的工程
     {"path": "./common"}
  ]
}
```

### 8. typeAcquisition

`typeAcquisition` 属性作用是**设置自动引入库类型定义文件(.d.ts)相关。**
包含 3 个子属性：

- `enable` : 布尔类型，是否开启自动引入库类型定义文件(.d.ts)，默认为 false；
- `include` : 数组类型，允许自动引入的库名，如：["jquery", "lodash"]；
- `exculde` : 数组类型，排除的库名。

```json
{
    // ...
  "typeAcquisition": {
    "enable": false,
    "exclude": ["jquery"],
    "include": ["jest"]
  }
}
```

