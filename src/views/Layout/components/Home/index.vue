<template>
  <div class="home-container">
    <!-- tab选项卡 -->
    <van-tabs v-model="active" type="line" color="#3a9422" swipeable>
      <van-tab v-for="item in channels" :key="item.id" :title="item.name">
        <p>内容</p>
        <p>内容</p>
        <p>内容</p>
        <p>内容</p>
        <p>内容</p>
        <p>内容</p>
        <p>内容</p>
        <p>内容</p>
        <p>内容</p>
        <p>内容</p>
        <p>内容</p>
        <p>内容</p>
        <p>内容</p>
        <p>内容</p>
        <p>内容</p>
        <p>内容</p>
        <p>内容</p>
        <p>内容</p>
        <p>内容</p>
        <p>内容</p>
        <p>内容</p>
        <p>内容</p>
        <p>内容</p>
        <p>内容</p>
        <p>内容</p>
        <p>内容</p>
        <p>内容</p>
        <p>内容</p>
        <p>内容</p>
        <p>内容</p>
        <p>内容</p>
        <p>内容</p>
        <p>内容</p>
        <p>内容</p>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { reqGetUserChannel } from '@/api/channels'
export default {
  name: 'Home',
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
  padding-top: 46px;
  .van-tabs__wrap{
    position: fixed;
    top: 46px;
    left: 0;
    width: 100%; // 定位的元素不设置宽度 默认由内容撑开
  }
}
</style>
