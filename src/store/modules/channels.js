// 关于频道的模块

const state = {
  channels: [] // 我的频道的数据
}
const mutations = {
  // 设置我的频道的数据
  setChannels (state, channels) {
    state.channels = channels
  }
}
const actions = {}
const getters = {}
export default {
  state,
  mutations,
  actions,
  getters,
  namespaced: true
}
