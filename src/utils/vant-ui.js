// 是一个工具模块，只做vant组件的注册

import Vue from 'vue'
import { Button, CellGroup, Field, NavBar, Popup, Toast, Form, Tabbar, TabbarItem, Tab, Tabs, List, Cell } from 'vant'

// 在注册vue组件，内部是执行了一个install函数
Vue.use(Button)
  .use(NavBar)
  .use(CellGroup)
  .use(Field)
  .use(Popup)
  .use(Toast) // 注册后会自动挂载到原型上 $toast
  .use(Form)
  .use(Tabbar)
  .use(TabbarItem)
  .use(Tab)
  .use(Tabs)
  .use(List)
  .use(Cell)
