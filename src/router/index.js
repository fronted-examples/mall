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
    path: '/mall',
    component: Layout,
    redirect: '/mall/',
    meta: {
      title: '首页',
      icon: 'user'
    },
    children: [{
      path: '/mall/',
      name: 'home',
      component: Home
    }]
  },
  {
    path: '/mall/boiling',
    component: Layout,
    redirect: '/mall/boiling',
    meta: {
      title: '沸点',
      icon: 'user'
    },
    children: [{
      path: '/mall/boiling',
      name: 'boiling',
      component: Boiling,
    }]
  },
  {
    path: '/mall/subjects',
    component: Layout,
    redirect: '/mall/subjects',
    meta: {
      title: '课程',
      icon: 'user'
    },
    children: [{
      path: '/mall/subjects',
      name: 'subjects',
      component: Subjects,
    }]
  },
  {
    path: '/mall/activity',
    component: Layout,
    redirect: '/mall/activity',
    meta: {
      title: '活动',
      icon: 'user'
    },
    children: [{
      path: '/mall/activity',
      name: 'activity',
      component: Activity,
    }]
  },
  {
    path: '/mall/forbidden',
    component: Forbidden,
    meta: {
      title: '403',
      icon: 'user',
      hidden: true
    }
  },
  {
    path: '/mall/*',
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