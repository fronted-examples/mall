import Vue from 'vue'
import Router from 'vue-router'

// webpack中配置@指向src
import Layout from '@/layout/index'
import { async } from 'q'

const Recommend = resolve => require(['@/views/recommend/index'], resolve)
const Follow = resolve => require(['@/views/recommend/follow/index'], resolve)
const History = resolve => require(['@/views/recommend/history/index'], resolve)
const Novel = resolve => require(['@/views/recommend/novel/index'], resolve)
const Comics = resolve => require(['@/views/recommend/comics/index'], resolve)
const Film = resolve => require(['@/views/recommend/film/index'], resolve)

const Article = resolve => require(['@/views/article/index'], resolve)
const Book = resolve => require(['@/views/book/index'], resolve)

const Live = resolve => require(['@/views/live/index'], resolve)
const Plaza = resolve => require(['@/views/plaza/index'], resolve)
const Chat = resolve => require(['@/views/chat/index'], resolve)

const Editor = resolve => require(['@/views/editor/index'], resolve)

const NotFound = resolve => require(['@/views/error-page/404'], resolve)
const Forbidden = resolve => require(['@/views/error-page/403'], resolve)
const ServerError = resolve => require(['@/views/error-page/500'], resolve)

Vue.use(Router)

const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onResolve, onReject) {
  if (onResolve || onReject) {
    return originalPush.call(this, location, onResolve, onReject)
  }
  return originalPush.call(this, location).catch(err => err)
}

export const recommendChildren = [{
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
  path: `${process.env.BASE_URL}/novel`,
  name: 'novel',
  component: Novel,
  meta: {
    parentRoute: `${process.env.BASE_URL}`,
    title: '小说',
    icon: 'backend',
    keywords: '小说',
    description: '小说'
  }
}, {
  path: `${process.env.BASE_URL}/history`,
  name: 'history',
  component: History,
  meta: {
    parentRoute: `${process.env.BASE_URL}`,
    title: '历史',
    icon: 'nav',
    keywords: '历史',
    description: '历史'
  }
}, {
  path: `${process.env.BASE_URL}/comics`,
  name: 'comics',
  component: Comics,
  meta: {
    parentRoute: `${process.env.BASE_URL}`,
    title: '漫画',
    icon: 'fronted',
    keywords: '漫画',
    description: '漫画'
  }
}, {
  path: `${process.env.BASE_URL}/film`,
  name: 'film',
  component: Film,
  meta: {
    parentRoute: `${process.env.BASE_URL}`,
    title: '影视',
    icon: 'android',
    keywords: '影视',
    description: '影视'
  }
}]

export const constantRoutes = [
  {
    path: `${process.env.BASE_URL}`,
    component: Layout,
    redirect: `${process.env.BASE_URL}/`,
    meta: {
      title: '推荐',
      icon: 'user',
      keywords: '推荐',
      description: '推荐'
    },
    children: [{
      path: `${process.env.BASE_URL}/`,
      name: 'recommend',
      component: Recommend,
      redirect: `${process.env.BASE_URL}/novel`,
      meta: {
        parentRoute: `${process.env.BASE_URL}`,
        title: '推荐',
        icon: 'user',
        keywords: '推荐',
        description: '推荐'
      },
      children: recommendChildren
    }]
  },
  {
    path: `${process.env.BASE_URL}/plaza`,
    component: Layout,
    redirect: `${process.env.BASE_URL}/plaza`,
    meta: {
      title: '广场',
      icon: 'user',
      keywords: '广场',
      description: '广场'
    },
    children: [{
      path: `${process.env.BASE_URL}/plaza`,
      name: 'plaza',
      component: Plaza,
      meta: {
        parentRoute: `${process.env.BASE_URL}/plaza`,
        title: '广场',
        icon: 'user',
        keywords: '广场',
        description: '广场'
      },
    }]
  },
  {
    path: `${process.env.BASE_URL}/live`,
    component: Layout,
    redirect: `${process.env.BASE_URL}/live`,
    meta: {
      title: '直播',
      icon: 'user',
      keywords: '直播',
      description: '直播'
    },
    children: [{
      path: `${process.env.BASE_URL}/live`,
      name: 'live',
      component: Live,
      meta: {
        parentRoute: `${process.env.BASE_URL}/live`,
        title: '直播',
        icon: 'user',
        keywords: '直播',
        description: '直播'
      },
    }]
  },
  {
    path: `${process.env.BASE_URL}/chat`,
    component: Layout,
    redirect: `${process.env.BASE_URL}/chat`,
    meta: {
      title: '聊天',
      icon: 'user',
      keywords: '聊天',
      description: '聊天'
    },
    children: [{
      path: `${process.env.BASE_URL}/chat`,
      name: 'chat',
      component: Chat,
      meta: {
        parentRoute: `${process.env.BASE_URL}/chat`,
        title: '聊天',
        icon: 'user',
        keywords: '聊天',
        description: '聊天'
      },
    }]
  },
  {
    path: `${process.env.BASE_URL}/article`,
    component: Layout,
    redirect: `${process.env.BASE_URL}/article/:articleId`,
    meta: {
      hidden: true
    },
    children: [{
      path: `${process.env.BASE_URL}/article/:articleId`,
      component: Article,
      name: 'article',
      meta: {
        parentRoute: `${process.env.BASE_URL}/article`,
        title: '文章1',
        icon: 'user',
        keywords: '文章',
        description: '文章'
      }
    }]
  },
  {
    path: `${process.env.BASE_URL}/book`,
    component: Layout,
    redirect: `${process.env.BASE_URL}/book/:bookId`,
    meta: {
      hidden: true
    },
    children: [{
      path: `${process.env.BASE_URL}/book/:bookId`,
      component: Book,
      name: 'book',
      meta: {
        parentRoute: `${process.env.BASE_URL}/book`,
        title: '书1',
        icon: 'user',
        keywords: '书',
        description: '书'
      }
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
    path: `${process.env.BASE_URL}/403`,
    component: Forbidden,
    meta: {
      title: '403',
      icon: 'user',
      hidden: true
    }
  },
  {
    path: `${process.env.BASE_URL}/500`,
    component: ServerError,
    meta: {
      title: '500',
      icon: 'user',
      hidden: true
    }
  },
  {
    path: `${process.env.BASE_URL}/:catchAll(.*)*`,
    component: NotFound,
    meta: {
      title: '404',
      icon: 'user',
      hidden: true
    }
  }
]

export function createRouter (store) {
  return new Router({
    // 同构应用不能使用 hash 路由，应该使用 history 模式，兼容前后端
    mode: 'history',
    routes: constantRoutes
  })
}