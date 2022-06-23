<template>
  <div class="layout-container">

    <!-- 导航头部 -->
    <van-nav-bar fixed>
      <template #left>
        <div class="logo">
          <h2>哦吼新闻</h2>
        </div>
      </template>
      <template #right>
        <van-button
          @click="$router.push('/search')"
          class="search-btn"
          round
          type="info"
          size="small"
          icon="search">
          搜索
        </van-button>
      </template>
    </van-nav-bar>
    <!-- 二级路由出口 -->
    <router-view />
    <!-- 导航底部 -->
    <van-tabbar v-model="active" route fixed>
      <van-tabbar-item icon="home-o" to="/home">首页</van-tabbar-item>
      <van-tabbar-item icon="question-o" to="/question" dot>问答</van-tabbar-item>
      <van-tabbar-item icon="video-o" to="/video">视频</van-tabbar-item>
      <van-tabbar-item icon="smile-o" to="/user">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'Layout',
  data () {
    return {
      active: 0
    }
  }
}
</script>

<style lang="scss" scoped>
.layout-container {
  padding-top: 46px;
  padding-bottom: 50px;
  // logo区域
  .logo {
    // 在样式中要是别@ 需要在@前面加~
    background: url("~@/assets/logo.gif") no-repeat;
    background-size: cover;
    width: 100px;
    height: 30px;
    line-height: 0;
    color: rgba(50, 50, 85, 0.498)
  }
  // 搜索按钮
  .search-btn {
    background-color: rgb(44, 180, 13);
    width: 100px;
    border: 1px solid #ccc;
    font-size: 14px;
    .van-icon {
      color: #fff;
    }
  }
}
</style>
