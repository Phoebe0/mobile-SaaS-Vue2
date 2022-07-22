import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 按需导入过滤器方法
import { relTime } from '@/utils/filters'

// 导入axios实例
import request from './utils/request'

// 导入注册vant组件的模块
import '@/utils/vant-ui'

// 导入全局样式文件  要写在vant-ui下面
import '@/styles/index.scss'

// 导入amfe-flexible文件，处理html标签的font-size大小
import 'amfe-flexible'

Vue.filter('relTime', relTime)

Vue.config.productionTip = false
// 创建事件中心
Vue.prototype.bus = new Vue()

// 将axios实例挂载到Vue原型上  （目的是 数据和属性的共享）
Vue.prototype.$request = request

new Vue({
  // 挂载Vue的配置对象
  router,
  store,
  render: h => h(App)
}).$mount('#app')
