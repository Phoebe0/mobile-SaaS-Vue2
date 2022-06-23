// 关于频道管理的接口
import request from '@/utils/request'
// 获取用户频道
export const reqGetUserChannel = () => request({
  method: 'get',
  url: '/v1_0/user/channels'
})
