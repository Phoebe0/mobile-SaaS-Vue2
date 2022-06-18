// 封装关于用户的接口

import request from '@/utils/request'

// 登录接口
export const reqLogin = (mobile, code) => request({
  method: 'post',
  url: '/v1_0/authorizations',
  data: {
    mobile,
    code
  }
})

// 发送验证码
export const reqSendCode = (mobile) => request({
  method: 'get',
  url: '/app/v1_0/sms/codes/:mobile',
  params: {
    mobile
  }
})
