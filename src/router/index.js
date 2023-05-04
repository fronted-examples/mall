import Vue from 'vue'
import Router from 'vue-router'

// webpack中配置@指向src
import Layout from '@/layout/index'

const Home = resolve => require(['@/views/home/index'], resolve)
const Activity = resolve => require(['@/views/activity/index'], resolve)
const Subjects = resolve => require(['@/views/subjects/index'], resolve)
const Boiling = resolve => require(['@/views/boiling/index'], resolve)

const NotFound = resolve => require(['@/views/not-found/index'], resolve)
const Forbidden = resolve => require(['@/views/forbidden/index'], resolve)

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
          name: 'home',
          component: Home
        }]
      },
      {
        path: '/boiling',
        component: Layout,
        redirect: '/boiling',
        children: [{
          path: '/boiling',
          name: 'boiling',
          component: Boiling
        }]
      },
      {
        path: '/subjects',
        component: Layout,
        redirect: '/subjects',
        children: [{
          path: '/subjects',
          name: 'subjects',
          component: Subjects
        }]
      },
      {
        path: '/activity',
        component: Layout,
        redirect: '/activity',
        children: [{
          path: '/activity',
          name: 'activity',
          component: Activity
        }]
      },
      {
        path: '/forbidden',
        hidden: true,
        component: Forbidden
      },
      {
        path: '*',
        hidden: true,
        component: NotFound
      }
    ]
  })
}