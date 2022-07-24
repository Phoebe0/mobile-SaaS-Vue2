import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import channels from './modules/channels'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    // 挂载模块
    user,
    channels
  }
})
