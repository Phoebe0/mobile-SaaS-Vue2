// 关于用户的模块
import { setToken, getToken } from '@/utils/storage'
const state = {
  // 取到用户token信息 取不到就赋值为{}
  tokenInfo: getToken()
}
const mutations = {
  // 将用户token存储到 vuex中的mutation
  setTokenInfo (state, tokenObj) {
    state.tokenInfo = tokenObj
    // 本地存储
    setToken(tokenObj)
  }
}
const actions = {}
const getters = {}
export default {
  state,
  mutations,
  actions,
  getters,
  // 防止命名冲突 开启命名空间
  namespaced: true
}
