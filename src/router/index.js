import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/Login'
import Layout from '@/views/Layout'
// 二级路由组件导入
import Home from '@/views/Layout/components/Home'
import Question from '@/views/Layout/components/Question'
import User from '@/views/Layout/components/User'
import Video from '@/views/Layout/components/Video'

Vue.use(VueRouter)

const router = new VueRouter({
  // 路由规则
  routes: [
    { path: '/login', component: Login },
    {
      path: '/',
      redirect: '/home',
      component: Layout,
      children: [
        { path: '/home', component: Home },
        { path: '/question', component: Question },
        { path: '/video', component: Video },
        { path: '/user', component: User }
      ]
    }
  ]
})

export default router
