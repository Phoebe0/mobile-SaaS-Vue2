// 关于频道的模块
// 关于用户的模块

const state = {
  // 用户token信息
  tokenInfo: {}
}
const mutations = {
  // 将用户token存储到 vuex中的mutation
  setTokenInfo (state, tokenObj) {
    state.tokenInfo = tokenObj
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
