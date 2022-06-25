// 关于频道管理的接口
import request from '@/utils/request'
// 获取用户频道
export const reqGetUserChannel = () => request({
  method: 'get',
  url: '/v1_0/user/channels'
})

// 获取文章新闻推荐
export const reqGetArticleLists = (channelId, timestamp) => request({
  method: 'get',
  url: '/v1_0/articles',
  params: {
    channel_id: channelId, // 频道id
    timestamp // 时间戳  请求新的推荐数据传当前的时间戳，请求历史推荐传指定的时间戳
  }
})
