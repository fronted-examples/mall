import Vue from 'vue'
import Router from 'vue-router'
// webpack中配置@指向src
import Home from '@/views/Home/index'
import Layout from '@/layout/index'

Vue.use(Router)

const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onResolve, onReject) {
  if (onResolve || onReject) {
    return originalPush.call(this, location, onResolve, onReject)
  }
  return originalPush.call(this, location).catch(err => err)
}
export function createRouter () {
  return new Router({
    // 同构应用不能使用 hash 路由，应该使用 history 模式，兼容前后端
    mode: 'history',
    routes: [
        {
            path: '/',
            component: Layout,
            redirect: '/home',
            children: [{
                path: '/home',
                name: 'Home',
                component: Home
            }],
        }, {
            path: '/about',
            component: Layout,
            redirect: '/about',
            children: [{
                path: '/about',
                name: 'About',
                // 懒加载路由 按需加载，异步的
                component: ()=> import('@/views/About/index')
            }],
        }, {
            path: '/posts',
            component: Layout,
            redirect: '/posts',
            children: [{
                path: '/posts',
                name: 'Posts',
                component: ()=> import('@/views/Posts/index')
            }]
        }
    ]
  })
}