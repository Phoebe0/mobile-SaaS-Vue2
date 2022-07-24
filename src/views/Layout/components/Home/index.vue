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
      <!-- 频道列表开关 通过定位 -->
      <div class="bar-btn" @click="showChannel = true">
        <van-icon name="wap-nav"/>
      </div>
      <!-- 频道管理的弹出层 -->
      <van-action-sheet v-model="showChannel" title="频道管理">
        <!-- 频道管理内容子组件 -->
        <ChannelEdit></ChannelEdit>
      </van-action-sheet>
    </van-tabs>

    <van-popup v-model="show">
      <!-- 抽离弹出框内容子组件 -->
      <MoreAction ref="moreActionRef" @disLike="disLike"></MoreAction>
    </van-popup>
  </div>
</template>

<script>
import { reqGetUserChannel } from '@/api/channels'
import ArticleList from './components/ArticleList.vue'
import MoreAction from './components/MoreAction.vue'
import ChannelEdit from './components/ChannelEdit.vue'
import { mapMutations, mapState } from 'vuex'
export default {
  name: 'Home',
  components: {
    ArticleList,
    MoreAction,
    ChannelEdit
  },
  data () {
    return {
      active: 0,
      show: false, // 控制对话框显示与隐藏
      channelId: '', // 传递的频道id
      showChannel: false // 频道管理面板的显示与隐藏
    }
  },
  computed: {
    ...mapState('channels', ['channels'])
  },
  mounted () {
    this.getUserChannel()
    // 订阅事件
    this.bus.$on('reportArt', value => {
      // vlaue是举报文章的类型，存到父组件中，通过属性绑定传递给ArticleList
      // this.value = value
      // 使用ArticleList组件中截取数据的方法
      const index = this.$refs.articleListRef.findIndex(item => item.channel.id === this.channelId)
      // console.log(index)
      this.$refs.articleListRef[index].reportList(value)
      // 关闭弹层之前，将子组件的isReport改为初始值false
      // 组件还没有渲染出来，是异步的，所以要用$nextTick(() => {})
      this.$nextTick(() => {
        this.$refs.moreActionRef.isReport = false
      })
      // 父组件直接关闭弹层
      this.show = false
    })
  },
  methods: {
    ...mapMutations('channels', ['setChannels']),
    // 获取用户频道
    async getUserChannel () {
      const { data: { data: { channels } } } = await reqGetUserChannel()
      console.log(channels)
      // 将用户频道列表存储
      // 提交一个mutation，将我的频道的数据存储在vuex中
      this.setChannels(channels)
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
      right: 37px;
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
    // 频道管理的开关按钮
    .bar-btn {
      position: fixed;
      right: 5px;
      top: 57px;
      display: flex;
      align-items: center;
      background-color: #fff;
      opacity: 0.8;
      z-index:1;
      .van-icon-wap-nav{
        font-size: 20px;
      }
    }
  }
}
</style>
