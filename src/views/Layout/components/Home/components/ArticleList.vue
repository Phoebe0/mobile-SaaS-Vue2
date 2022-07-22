<template>
  <div class="articlelist">
    <!--
      1. loading 是控制加载状态的布尔值，默认为false
      2. finished是加载结束的状态，默认是false，加载数据没有了需要手动设置为true
      3. finished-text 没有数据的提示文本
      4. @load事件是默认上来看数据是否占满屏幕，没有沾满就执行一次，如果屏幕没有沾满继续执行内部自动将loading设置为true,需要手动将loading改为false
      触底也会执行load事件
     -->
    <van-pull-refresh
      v-model="isRefresh"
      success-text="刷新成功"
      @refresh="onRefresh"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="已经看到人家底部了~"
        @load="onLoad"
      >
        <van-cell v-for="item in list" :key="item.art_id" :title="item.title">
          <!-- cell组件内置的具名插槽 label 可以自定义标题下方的内容 -->
          <template #label>
            <!-- 图片 -->
              <van-grid :column-num="item.cover.type">
                <van-grid-item v-for="(imgUrl,index) in item.cover.images" :key="index">
                  <van-image lazy-load :src="imgUrl" />
                </van-grid-item>
              </van-grid>
            <span>{{ item.aut_name }} </span>
            <span>{{ item.comm_count }}评论 </span>
            <span>{{ item.pubdate | relTime }}</span>
            <!-- 只有登录的用户, 才能看见这个 x 按钮 -->
            <span class="close" @click="showMoreAction(item)" v-if="$store.state.user.tokenInfo.token">
              <van-icon name="cross"></van-icon>
            </span>
          </template>
        </van-cell>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { reqGetArticleLists } from '@/api/channels'
import { reqDislikeArticle, reqReportArticle } from '@/api/article'
export default {
  name: 'ArticleList',
  props: {
    channel: {
      type: Object,
      required: true
    }

  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      timestamp: '', // 时间戳，第一次请求之前为空
      isRefresh: false, // 下拉刷新的状态
      disLikeId: '' // 不感兴趣传递的id
    }
  },
  methods: {
    // 持续触发
    async onLoad () {
      // 异步更新数据
      // 因为load事件上来就执行，所以将请求写在这里面

      // 处理第一次请求数据携带最新的时间戳
      if (this.timestamp === '') {
        this.timestamp = +new Date()
      }
      try {
        const { data: { data: { results, pre_timestamp: timestamp } } } = await reqGetArticleLists(this.channel.id, this.timestamp)

        this.list = [...this.list, ...results]
        this.timestamp = timestamp // 存储指定时间的时间戳
        // loading时间内部会将loading设置为true， 手动改为false
        this.loading = false
      } catch {
        // 如果接口没数据了，则显示finished-text文本
        this.finished = true
      }
    },
    // 下拉刷新
    // 下拉刷新期间，会自动将isRefresh设置为true，下拉结束后需要手动设置为false
    async onRefresh () {
      console.log('xiala')
      // 请求最新数据，请求结束后isRefresh设置为false
      // 携带数据 数据1：频道id  数据2：最新的时间戳
      const { data: { data: { results, pre_timestamp: timestamp } } } = await reqGetArticleLists(this.channel.id, +new Date())
      // console.log(res)
      // 拿到最新的数据直接覆盖原来数据
      this.list = results
      // 下一次滑动请求返回指定的时间戳赋值
      this.timestamp = timestamp
      this.isRefresh = false
    },
    // 子传父   点击删除按钮显示弹出框
    showMoreAction (item) {
      this.disLikeId = item.art_id.toString()
      this.$emit('showMore', true, this.channel.id)
    },
    // 不感兴趣 ———— 截取新闻列表
    async removeList () {
      console.log('移除新闻')
      // 拿着disLikeId找索引，然后截取文章列表
      this.list = this.list.filter(item => item.art_id.toString() !== this.disLikeId)
      // 发请求不感兴趣此类文章，不再推荐
      await reqDislikeArticle(this.disLikeId)
      // 通知父组件请求发送成功之后关闭弹框
      this.$emit('closePop')
    },
    // 举报文章
    async reportList (value) {
      this.list = this.list.filter(item => item.art_id.toString() !== this.disLikeId)
      const res = await reqReportArticle(this.disLikeId, value)
      console.log('举报文章🍄', res)
    }
  }
}
</script>

<style lang="scss">
.close{
      float: right;
      margin-top: 4px;
    }
</style>
