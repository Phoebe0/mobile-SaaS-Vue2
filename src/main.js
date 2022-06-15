import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 导入axios实例
import request from './utils/request'

// 导入注册vant组件的模块
import '@/utils/vant-ui'

// 导入amfe-flexible文件，处理html标签的font-size大小
import 'amfe-flexible'

Vue.config.productionTip = false

// 将axios实例挂载到Vue原型上  （目的是 数据和属性的共享）
Vue.prototype.$request = request

new Vue({
  // 挂载Vue的配置对象
  router,
  store,
  render: h => h(App)
}).$mount('#app')
