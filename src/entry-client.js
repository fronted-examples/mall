// 客户端入口
import Vue from 'vue'
import { createApp } from './app'
import Cookies from 'js-cookie'

// 客户端特定引导逻辑……
const { app, router, store } = createApp(Cookies.get('accessToken'))

Vue.mixin({
    /**
     * 这种写法是组件每次挂载时就会执行组件或页面中的asyncData方法
     * 因为asyncData是用来进行服务端请求的
     * 所以客户端不需要绑定该方法
     * 如果绑定了，则服务端请求会在客户端再一次请求
     * 这里注释了该方法，客户端就不再发起在服务端已经发起过的请求了
     * @param {*} to 
     * @param {*} from 
     * @param {*} next 
     */
    // beforeCreate () {
    //     const { asyncData } = this.$options
    //     if (asyncData) {
    //         // 将获取数据操作分配给 promise
    //         // 以便在组件中，我们可以在数据准备就绪后
    //         // 通过运行 `this.dataPromise.then(...)` 来执行其他任务
    //         this.serverData = asyncData({
    //             store: this.$store,
    //             route: this.$route
    //         })
    //     }
    // },

    beforeRouteUpdate (to, from, next) {
        const { asyncData } = this.$options
        if (asyncData) {
            asyncData({
                store: this.$store,
                route: to
            }).then(next).catch(next)
        } else {
            next()
        }
    }
})

// if (window.__INITIAL_STATE__) {
//     // 将window.__INITIAL_STATE__的数据替换到客户端的store中
//     store.replaceState(window.__INITIAL_STATE__)
// }

// 这里假定 App.vue 模板中根元素具有 `id="app"`
router.onReady(() => {
    // 这种写法是页面第一次进入的时候会执行一次asyncData方法，即使刷新也不会再次执行
    // router.beforeResolve((to, from, next) => {
    //     const matched = router.getMatchedComponents(to)
    //     const prevMatched = router.getMatchedComponents(from)
    //     let diffed = false
    //     const activated = matched.filter((c, i) => {
    //         return diffed || (diffed = (prevMatched[i] !== c))
    //     })
    //     const asyncDataHooks = activated.map(c => c.asyncData).filter(_ => _)
    //     if (!asyncDataHooks.length) {
    //         return next()
    //     }

    //     // bar.start()
    //     Promise.all(asyncDataHooks.map(hook => hook({ store, router: to })))
    //         .then(() => {
    //             // bar.finish()
    //             next()
    //         })
    //         .catch(next)
    // })

    if (window.hasOwnProperty('__INITIAL_STATE__')) {
        // 初始化替换Store状态
        store.replaceState(window.__INITIAL_STATE__)
    }

    app.$mount('#app')
})