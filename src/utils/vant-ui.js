// 是一个工具模块，只做vant组件的注册

import Vue from 'vue'
import { Button } from 'vant'
// 在注册vue组件，内部是执行了一个install函数
Vue.use(Button)
