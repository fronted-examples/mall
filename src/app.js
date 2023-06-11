import Vue from "vue"
import App from "./App.vue"
import VueMeta from 'vue-meta'
import { createRouter } from "./router"
import { createStore } from './store/index'
// 服务端渲染不做客户端全局导航守卫，否则会导致只有首页服务端渲染
// import { routerGuard } from './router-guard'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import 'mavon-editor/dist/css/index.css'

import 'github-markdown-css/github-markdown.css'

import '@/icons'
import '@/styles/index.scss' // 全局scss样式

import Cookies from 'js-cookie'

import HeadMixin from '@/utils/head'

if (process.env.VUE_ENV === 'client') {
  require('reset-css')

  const mavonEditor = require('mavon-editor')
  Vue.use(mavonEditor)
}


Vue.use(VueMeta)
Vue.use(ElementUI)
Vue.mixin(HeadMixin)

Vue.prototype.$cookies = Cookies

// 需要返回一个应用程序工厂: 返回Vue实例和Router实例
export function createApp (cookie) {
  // 处理首屏，就要先处理路由跳转
  const store = createStore()
  const router = createRouter()

  // routerGuard(router, store)

  const app = new Vue({
    router,
    store,
    render: (h) => h(App),
  })

  return { app, router, store }
}
