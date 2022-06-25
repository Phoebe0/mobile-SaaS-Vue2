<template>
  <div class="home-container">
    <!-- tab选项卡 -->
    <van-tabs v-model="active" type="line" color="#3a9422" swipeable>
      <van-tab v-for="item in channels" :key="item.id" :title="item.name">
        <!-- 抽离文章列表组件 -->
        <ArticleList :channel="item"></ArticleList>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { reqGetUserChannel } from '@/api/channels'
import ArticleList from './components/ArticleList.vue'
export default {
  name: 'Home',
  components: {
    ArticleList
  },
  data () {
    return {
      active: 0,
      channels: []
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
