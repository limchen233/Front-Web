```
/** axios封装
 * 请求拦截、响应拦截、错误统一处理
 */
import axios from 'axios'
import QS from 'qs'
import {Toast} from 'vant'
import {clearUserToken} from '../utils/cache'

// 请求拦截器
axios.interceptors.request.use(
  config => {
    // 此请求头以普通表单的形式（键值对）发送数据，不适用于上传文件
    config.headers = {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' // 默认方式
    }
    config.timeout = 30000
    // 统一在http请求的header都加上cookie
    config.withCredentials = true

    return config
  }, error => {
    return Promise.error(error)
  }
)

// 响应拦截器
axios.interceptors.response.use(
  response => {
    if (response.status === 200) {
      // 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断，
      // 后端在token过期时如果没有直接返回错误状态码，而使用了重定向，我们是无法获取到302，
      // 也不会获取到错误状态码，只能等到浏览器重定向之后的url获取相应信息，
      // 因为重定向后的url请求是成功的（200），所以可以根据此url响应结果的状态码判断cookie是否过期。
      if (response.data.httpCode === 403) { // cookie过期
        // 清除用户token
        clearUserToken()
        setTimeout(() => {
          // window.location.href = '/' // 跳转到首页（路由前置钩子会转发到登录页）
          window.location.href = '/#/login' //直接跳转到登录页
        }, 1500)
      }
      return Promise.resolve(response)
    } else {
      return Promise.reject(response.data)
    }
  },
  // 服务器状态码不是200的情况
  error => {
    if (error && error.response) {
      switch (error.response.status) {
        // 401: 未登录
        // 未登录则跳转登录页面，并携带当前页面的路径
        // 在登录成功后返回当前页面，这一步需要在登录页操作。
        case 401:
          this.$router.replace({
            path: '/login',
            query: {
              redirect: this.$router.currentRoute.fullPath
            }
          })
          break
          // 403 token过期
          // 登录过期对用户进行提示
          // 清除本地token和清空vuex中token对象
          // 跳转登录页面
        case 403:
          Toast({
            message: '登录过期，请重新登录',
            duration: 1000,
            forbidClick: true
          })
          // 清除token
          clearUserToken()
          // 跳转登录页面，并将要浏览的页面fullPath传过去，登录成功后跳转需要访问的页面
          setTimeout(() => {
            this.$router.replace({
              path: '/login',
              query: {
                redirect: this.$router.currentRoute.fullPath
              }
            })
          }, 1000)
          break
          // 404请求不存在
        case 404:
          Toast({
            message: '请求地址不存在',
            duration: 1500,
            forbidClick: true
          })
          break
          // 其他错误，直接抛出错误提示
        default:
          Toast({
            // message: error.response.data.message,
            message: '请联系管理员',
            duration: 1500,
            forbidClick: true
          })
      }
      return Promise.reject(error.response)
    }
  })
/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export const get = (url, params) => {
  return new Promise((resolve, reject) => {
    axios.get(url, {params: params})
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        reject(err.data)
      })
  })
}
/**
 * post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export const post = (url, params) => {
  return new Promise((resolve, reject) => {
    axios.post(url, QS.stringify(params))
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        reject(err.data)
      })
  })
}

/**
 * post方法，对应post请求。文件上传如果是以流的形式上传，要单独封装
 * 请求头content-type是multipart/form-data(上传文件时无需设置，浏览器会自动添加)，参数会在请求体中，以标签为单元，用分隔符分开。
 * 可以上传键值对也可以上传文件。
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export const postUpload = (url, params = {body: {}}) => {
  return new Promise((resolve, reject) => {
    axios.post(url, params.body)
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        reject(err.data)
      })
  })
}

```

