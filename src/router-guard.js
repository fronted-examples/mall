import 'nprogress/nprogress.css' // progress bar style
let NProgress

if (process.env.VUE_ENV === 'client') {
  // import NProgress from 'nprogress' // progress bar
  NProgress = require('nprogress')
  NProgress.configure({ showSpinner: false }) // NProgress Configuration
}

// 白名单
const whiteList = ['', '/home', '/boiling', '/subjects', '/activity']

export const routerGuard = (router, store) => {
  router.beforeEach((to, from, next) => {
    const hasToken = store.getters['user/token']

    NProgress && NProgress.start()
    if (hasToken) { // 判断是否有token

    } else {
      if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
        next()
      } else {
        next('/') // 否则全部重定向到首页

        NProgress.done()
      }
    }
  })

  router.afterEach(() => {
    // finish progress bar
    NProgress && NProgress.done()
  })
}