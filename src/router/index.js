import Vue from 'vue'
import Router from 'vue-router'

// webpack中配置@指向src
import Layout from '@/layout/index'

const Home = resolve => require(['@/views/home/index'], resolve)
const Activity = resolve => require(['@/views/activity/index'], resolve)
const Subjects = resolve => require(['@/views/subjects/index'], resolve)
const Boiling = resolve => require(['@/views/boiling/index'], resolve)

const Editor = resolve => require(['@/views/editor/index'], resolve)

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
      icon: 'user',
      keywords: '首页',
      description: '首页'
    },
    children: [{
      path: '/mall/',
      name: 'home',
      component: Home,
      meta: {
        title: '首页',
        icon: 'user',
        keywords: '首页',
        description: '首页'
      },
    }]
  },
  {
    path: '/mall/boiling',
    component: Layout,
    redirect: '/mall/boiling',
    meta: {
      title: '沸点',
      icon: 'user',
      keywords: '沸点',
      description: '沸点'
    },
    children: [{
      path: '/mall/boiling',
      name: 'boiling',
      component: Boiling,
      meta: {
        title: '沸点',
        icon: 'user',
        keywords: '沸点',
        description: '沸点'
      },
    }]
  },
  {
    path: '/mall/subjects',
    component: Layout,
    redirect: '/mall/subjects',
    meta: {
      title: '课程',
      icon: 'user',
      keywords: '课程',
      description: '课程'
    },
    children: [{
      path: '/mall/subjects',
      name: 'subjects',
      component: Subjects,
      meta: {
        title: '课程',
        icon: 'user',
        keywords: '课程',
        description: '课程'
      },
    }]
  },
  {
    path: '/mall/activity',
    component: Layout,
    redirect: '/mall/activity',
    meta: {
      title: '活动',
      icon: 'user',
      keywords: '活动',
      description: '活动'
    },
    children: [{
      path: '/mall/activity',
      name: 'activity',
      component: Activity,
      meta: {
        title: '活动',
        icon: 'user',
        keywords: '活动',
        description: '活动'
      },
    }]
  },
  {
    path: '/mall/editor',
    name: 'editor',
    component: Editor,
    meta: {
      title: '写文章',
      icon: 'user',
      hidden: true
    }
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