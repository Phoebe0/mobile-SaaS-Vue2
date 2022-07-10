
// 导入日期处理
import dayjs from 'dayjs'
// 1. 导入相对时间的包
import relativeTime from 'dayjs/plugin/relativeTime'
// 3. 导入汉化包
import 'dayjs/locale/zh-cn'
// 2. 需要给dayjs添加扩展包
dayjs.extend(relativeTime)
// 4. 全局使用
dayjs.locale('zh-cn')
// 使用过滤器处理时间
// Vue.filter('relativeTime', value => dayjs(value).fromNow())
// 按需导出过滤器
export const relTime = (value) => dayjs(value).fromNow()
