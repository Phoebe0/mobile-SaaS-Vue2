// 关于axios的配置
import axios from 'axios'
import store from '@/store'

// 创建axios实例，对axios进行配置

const request = axios.create({
  baseURL: 'http://toutiao.itheima.net/',
  timeout: 5000 // 请求服务5s没有响应，终止请求
})

// 添加请求拦截器

request.interceptors.request.use(function (config) {
  // config就是当前请求的配置信息对象，其中有一个headers可以自定义
  console.log('经过了请求拦截器')
  // 只要使用axios向服务器发送请求，都会经过请求拦截器
  const token = store.state.user.tokenInfo.token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})
export default request
