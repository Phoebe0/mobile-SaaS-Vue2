<template>
  <div class="articlelist">
    <!--
      1. loading 是控制加载状态的布尔值，默认为false
      2. finished是加载结束的状态，默认是false，加载数据没有了需要手动设置为true
      3. finished-text 没有数据的提示文本
      4. @load事件是默认上来看数据是否占满屏幕，没有沾满就执行一次，如果屏幕没有沾满继续执行内部自动将loading设置为true,需要手动将loading改为false
      触底也会执行load事件
     -->
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="已经看到人家底部了~"
      @load="onLoad"
    >
      <van-cell v-for="item in list" :key="item.art_id" :title="item.title" />
    </van-list>
  </div>
</template>

<script>
import { reqGetArticleLists } from '@/api/channels'
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
      timestamp: '' // 时间戳，第一次请求之前为空
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

        this.list.push(...results) // 将数据展开push存储
        this.timestamp = timestamp // 存储指定时间的时间戳
        // loading时间内部会将loading设置为true， 手动改为false
        this.loading = false
      } catch {
        // 如果接口没数据了，则显示finished-text文本
        this.finished = true
      }
    }
  }
}
</script>

<style lang="scss">

</style>
