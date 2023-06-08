import Vue from 'vue'
import Router from 'vue-router'

// webpack中配置@指向src
import Layout from '@/layout/index'

const Home = resolve => require(['@/views/home/index'], resolve)
const Follow = resolve => require(['@/views/home/follow/index'], resolve)
const Recommended = resolve => require(['@/views/home/recommend/index'], resolve)
const Fronted = resolve => require(['@/views/home/fronted/index'], resolve)
const Backend = resolve => require(['@/views/home/backend/index'], resolve)
const Android = resolve => require(['@/views/home/android/index'], resolve)
const IOS = resolve => require(['@/views/home/ios/index'], resolve)

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

export const homeChildren = [{
  path: `${process.env.BASE_URL}/follow`,
  name: 'follow',
  component: Follow,
  meta: {
    parentRoute: `${process.env.BASE_URL}`,
    title: '关注',
    icon: 'follow',
    keywords: '关注',
    description: '描述关注'
  }
}, {
  path: `${process.env.BASE_URL}/recommended`,
  name: 'recommended',
  component: Recommended,
  meta: {
    parentRoute: `${process.env.BASE_URL}`,
    title: '综合',
    icon: 'nav',
    keywords: '综合',
    description: '综合'
  }
}, {
  path: `${process.env.BASE_URL}/backend`,
  name: 'backend',
  component: Backend,
  meta: {
    parentRoute: `${process.env.BASE_URL}`,
    title: '后端',
    icon: 'backend',
    keywords: '后端',
    description: '后端'
  }
}, {
  path: `${process.env.BASE_URL}/fronted`,
  name: 'fronted',
  component: Fronted,
  meta: {
    parentRoute: `${process.env.BASE_URL}`,
    title: '前端',
    icon: 'fronted',
    keywords: '前端',
    description: '前端'
  }
}, {
  path: `${process.env.BASE_URL}/android`,
  name: 'android',
  component: Android,
  meta: {
    parentRoute: `${process.env.BASE_URL}`,
    title: 'Android',
    icon: 'android',
    keywords: 'Android',
    description: 'Android'
  }
}, {
  path: `${process.env.BASE_URL}/iOS`,
  name: 'ios',
  component: IOS,
  meta: {
    parentRoute: `${process.env.BASE_URL}`,
    title: 'iOS',
    icon: 'ios',
    keywords: 'iOS',
    description: 'iOS'
  }
}]

export const constantRoutes = [
  {
    path: `${process.env.BASE_URL}`,
    component: Layout,
    redirect: `${process.env.BASE_URL}/`,
    meta: {
      title: '首页',
      icon: 'user',
      keywords: '首页',
      description: '首页'
    },
    children: [{
      path: `${process.env.BASE_URL}/`,
      name: `${process.env.BASE_URL}/`,
      component: Home,
      redirect: `${process.env.BASE_URL}/recommended`,
      meta: {
        parentRoute: `${process.env.BASE_URL}`,
        title: '首页',
        icon: 'user',
        keywords: '首页',
        description: '首页'
      },
      children: homeChildren
    }]
  },
  {
    path: `${process.env.BASE_URL}/boiling`,
    component: Layout,
    redirect: `${process.env.BASE_URL}/boiling`,
    meta: {
      title: '沸点',
      icon: 'user',
      keywords: '沸点',
      description: '沸点'
    },
    children: [{
      path: `${process.env.BASE_URL}/boiling`,
      name: 'boiling',
      component: Boiling,
      meta: {
        parentRoute: `${process.env.BASE_URL}/boiling`,
        title: '沸点',
        icon: 'user',
        keywords: '沸点',
        description: '沸点'
      },
    }]
  },
  {
    path: `${process.env.BASE_URL}/subjects`,
    component: Layout,
    redirect: `${process.env.BASE_URL}/subjects`,
    meta: {
      title: '课程',
      icon: 'user',
      keywords: '课程',
      description: '课程'
    },
    children: [{
      path: `${process.env.BASE_URL}/subjects`,
      name: 'subjects',
      component: Subjects,
      meta: {
        parentRoute: `${process.env.BASE_URL}/subjects`,
        title: '课程',
        icon: 'user',
        keywords: '课程',
        description: '课程'
      },
    }]
  },
  {
    path: `${process.env.BASE_URL}/activity`,
    component: Layout,
    redirect: `${process.env.BASE_URL}/activity`,
    meta: {
      title: '活动',
      icon: 'user',
      keywords: '活动',
      description: '活动'
    },
    children: [{
      path: `${process.env.BASE_URL}/activity`,
      name: 'activity',
      component: Activity,
      meta: {
        parentRoute: `${process.env.BASE_URL}/activity`,
        title: '活动',
        icon: 'user',
        keywords: '活动',
        description: '活动'
      },
    }]
  },
  {
    path: `${process.env.BASE_URL}/editor`,
    name: 'editor',
    component: Editor,
    meta: {
      title: '写文章',
      icon: 'user',
      hidden: true
    }
  },
  {
    path: `${process.env.BASE_URL}/forbidden`,
    component: Forbidden,
    meta: {
      title: '403',
      icon: 'user',
      hidden: true
    }
  },
  {
    path: `${process.env.BASE_URL}/*`,
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