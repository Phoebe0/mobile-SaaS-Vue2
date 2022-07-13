<template>
  <div class="home-container">
    <!-- tab选项卡 -->
    <van-tabs v-model="active" type="line" color="#3a9422" swipeable>
      <van-tab v-for="item in channels" :key="item.id" :title="item.name">
        <!-- 抽离文章列表组件 -->
        <ArticleList
        ref="articleListRef"
        :channel="item"
        @showMore="showMore"
        @closePop="show=false"
        ></ArticleList>
      </van-tab>
    </van-tabs>

    <van-popup v-model="show">
      <!-- 抽离弹出框内容子组件 -->
      <MoreAction @disLike="disLike"></MoreAction>
    </van-popup>
  </div>
</template>

<script>
import { reqGetUserChannel } from '@/api/channels'
import ArticleList from './components/ArticleList.vue'
import MoreAction from './components/MoreAction.vue'
export default {
  name: 'Home',
  components: {
    ArticleList,
    MoreAction
  },
  data () {
    return {
      active: 0,
      channels: [], // 用户频道列表
      show: false, // 控制对话框显示与隐藏
      channelId: '' // 传递的频道id
    }
  },
  created () {
    this.getUserChannel()
  },
  methods: {
    // 获取用户频道
    async getUserChannel () {
      const { data: { data: { channels } } } = await reqGetUserChannel()
      console.log(channels)
      // 将用户频道列表存储
      this.channels = channels
    },
    // 删除时显示弹出框
    showMore (boo, channelId) {
      // 展示弹出框
      this.show = boo
      this.channelId = channelId
    },
    // 不感兴趣
    disLike () {
      console.log('不感兴趣')
      // 通知文章列表删除不感兴趣那一个新闻（父组件直接调用子组件的方法）
      // console.log(this.$refs.articleListRef)
      // this.$refs.articleListRef 是一个数组，数组第0项才有removeList方法
      // 是数组的原因：
      // 因为ArticleList组件在循环里面，很多页面都有ArticleList这个组件，所以把这些数据存到了一个数组中
      // 在 this.$refs.articleListRef 中寻找激活频道的id和当前点击的id相等的那一项，返回它的index
      const index = this.$refs.articleListRef.findIndex(item => item.channel.id === this.channelId)
      // console.log(index)
      this.$refs.articleListRef[index].removeList()
    }
  }
}
</script>

<style lang="scss">
.home-container {
  padding-top: 44px;
  height: calc(100vh - 46px - 50px); // 100vh 代表整个大容器高度
  // 再消除内外边距的影响
  box-sizing: border-box;
  .van-tabs {
    height: 100%;
    .van-tabs__wrap{
      position: fixed;
      top: 46px;
      left: 0;
      width: 100%; // 定位的元素不设置宽度 默认由内容撑开
    }
    .van-tabs__content {
      height: 100%;
      // 给每个面板设置单独滚动条
      .van-tab__pane {
        height: 100%;
        overflow: scroll;
      }

    }
  }
}
</style>
