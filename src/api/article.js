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

// 举报文章
export const reqReportArticle = (target, type, remark = '') => request({
  method: 'post',
  url: '/v1_0/article/reports',
  data: {
    target, // 举报的文章id
    type, // 举报类型： 0-其他问题，1-标题夸张，2-低俗色情，3-错别字多，4-旧闻重复，5-广告软文，6-内容不实，7-涉嫌违法犯罪，8-侵权'
    remark //   其他问题 的附加说明
  }
})
