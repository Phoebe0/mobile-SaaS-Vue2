<template>
  <div class="more-action">
    <!-- 这个组件有两种视图状态 (通过 v-if 切换)： -->
    <!-- 状态一 -->
    <van-cell-group v-if="!isReport">
      <van-cell @click="disLike">不感兴趣</van-cell>
      <van-cell is-link @click="isReport=true">反馈垃圾内容</van-cell>
      <van-cell>拉黑作者</van-cell>
    </van-cell-group>
    <!-- 状态二 反馈-->
    <van-cell-group v-else>
      <van-cell icon="arrow-left" @click="isReport=false">返回</van-cell>
      <van-cell v-for="item in reports" :key="item.value">{{item.label}}</van-cell>
    </van-cell-group>
  </div>
</template>

<script>
import reports from '@/constant/report'
export default {
  name: 'MoreAction',
  data () {
    return {
      isReport: false, // 是否是处于状态二：反馈
      reports
    }
  },
  methods: {
    disLike () {
      this.$emit('disLike')
    }
  }

}
</script>

<style lang="scss" scoped>
  .more-action {
  border-radius: 4px;
}

</style>
