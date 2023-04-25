import Vue from 'vue'
import Router from 'vue-router'
// webpack中配置@指向src
import Home from '@/views/Home/index'

Vue.use(Router)

export function createRouter () {
  return new Router({
    // 同构应用不能使用 hash 路由，应该使用 history 模式，兼容前后端
    mode: 'history',
    routes: [
        {
            path: '/vue-ssr/',
            name: 'Home',
            component: Home
        },{
            path: '/vue-ssr/about',
            name: 'About',
             // 懒加载路由 按需加载，异步的
            component: ()=> import('@/views/About/index')
        },{
            path: '/vue-ssr/posts',
            name: 'Posts',
            component: ()=> import('@/views/Posts/index')
        },{
            path: '*',
            name: 'error404',
            component: ()=> import('@/views/404/index')
        }
    ]
  })
}