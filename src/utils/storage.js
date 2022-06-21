// 本地存储的模块
// 存储token
const TOKEN_KEY = 'token-info'
export const setToken = obj => {
  localStorage.setItem(TOKEN_KEY, JSON.stringify(obj))
}
// 获取token
export const getToken = () => JSON.parse(localStorage.getItem(TOKEN_KEY)) || {}
// 移除token
export const removeToken = () => {
  localStorage.removeItem(TOKEN_KEY)
}
