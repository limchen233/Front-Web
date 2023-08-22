1、登录`UD`在线客服系统

登录地址：https://yuwell.udesk.cn/entry/manage/custom_plugin/ticket_plugin

文档地址：https://udesk.udesk.cn/hc/articles/48358

2、点击管理中心--辅助组件

![image-20230822101348510](https://raw.githubusercontent.com/limchen233/picgo/master/img/image-20230822101348510.png)

3、辅助组件有几种类型，我们以`客户`类型为例， 点击右上角的`客户`，会看到`客户`类型的辅助组件列表

![image-20230822102534272](https://raw.githubusercontent.com/limchen233/picgo/master/img/image-20230822102534272.png)

4、点击`新增`按钮即可添加新的辅助组件（必须是`https`请求）,比如`https://xxx.xxx.xxx.xxx?sourceId=UD`。

`sourceId`是标识，代表来源，可自己是否需要。`https://xxx`就是组件的访问地址或项目访问地址。

如果是嵌套在别的项目并且有权限控制的，辅助组件地址可直接写成登录页面，跳转后作单点登录。

5、组件创建成功后，可点编辑按钮进行权限编辑和配置请求参数

![image-20230822103434066](https://raw.githubusercontent.com/limchen233/picgo/master/img/image-20230822103434066.png)

需要选择`参数名称` 和 `参数字段`，

![image-20230822105409301](https://raw.githubusercontent.com/limchen233/picgo/master/img/image-20230822105409301.png)

6、发送请求时，`UD`会默认添加一些参数：

![image-20230822104900358](https://raw.githubusercontent.com/limchen233/picgo/master/img/image-20230822104900358.png)

7、请求成功后，我们可以获取这些信息：

```js
// 使用url值,获取ticket
export function getUrl() {
  const url = decodeURI(window.location.href)
  const thisUrl = {}
  const index = url.indexOf('?')
  if (index != -1) {
    const str = url.substring(index + 1, url.length)
    const strs = str.split('&')
    for (let i = 0; i < strs.length; i++) {
      thisUrl[strs[i].split('=')[0]] = decodeURI(strs[i].split('=')[1])
    }
  }
  return thisUrl
}

// import { getUrl } from '@/utils/index'
if (sourceId) {
     if (sourceId == 'UD') {
        const UD = {
          sourceId: sourceId, // 侧边栏入口
          timestamp: getUrl().timestamp,
          sign: getUrl().sign,
          agent_email: getUrl().agent_email, // 用户邮箱
          agent_phone_number: getUrl().agent_phone_number, // 用户手机号
          type: getUrl().type,
          customer_id: getUrl().customer_id // 客户ID
        }
        localStorage.setItem('sourceId', JSON.stringify(UD))
        const params = { phone: getUrl().agent_phone_number }
        this.handleLoginOA(params) //自动登录
     }
}
```

