// 文章相关的接口
import request from '@/utils/request'

// 对文章不感兴趣
export const reqDislikeArticle = target => request({
  method: 'post',
  url: '/v1_0/article/dislikes',
  data: {
    target // 不喜欢的文章id
  }
})
