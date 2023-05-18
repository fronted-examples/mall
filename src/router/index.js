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

export const constantRoutes = [
  {
    path: '/',
    component: Layout,
    redirect: '/',
    meta: {
      title: '首页',
      icon: 'user'
    },
    children: [{
      path: '/',
      name: 'home',
      component: Home
    }]
  },
  {
    path: '/boiling',
    component: Layout,
    redirect: '/boiling',
    meta: {
      title: '沸点',
      icon: 'user'
    },
    children: [{
      path: '/boiling',
      name: 'boiling',
      component: Boiling,
    }]
  },
  {
    path: '/subjects',
    component: Layout,
    redirect: '/subjects',

    meta: {
      title: '课程',
      icon: 'user'
    },
    children: [{
      path: '/subjects',
      name: 'subjects',
      component: Subjects,
    }]
  },
  {
    path: '/activity',
    component: Layout,
    redirect: '/activity',
    meta: {
      title: '活动',
      icon: 'user'
    },
    children: [{
      path: '/activity',
      name: 'activity',
      component: Activity,
    }]
  },
  {
    path: '/forbidden',
    component: Forbidden,
    meta: {
      title: '403',
      icon: 'user',
      hidden: true
    }
  },
  {
    path: '*',
    component: NotFound,
    meta: {
      title: '404',
      icon: 'user',
      hidden: true
    }
  }
]

export function createRouter () {
  return new Router({
    // 同构应用不能使用 hash 路由，应该使用 history 模式，兼容前后端
    mode: 'history',
    routes: constantRoutes
  })
}