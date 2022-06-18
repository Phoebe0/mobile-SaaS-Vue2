// 关于axios的配置
import axios from 'axios'

// 创建axios实例，对axios进行配置

const request = axios.create({
  baseURL: 'http://10.10.13.166:8000',
  timeout: 5000 // 请求服务5s没有响应，终止请求
})

export default request
