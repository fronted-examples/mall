// 客户端入口
import Vue from 'vue'
import { createApp } from './app'

// 客户端特定引导逻辑……

const { app, router, store } = createApp()

Vue.mixin({
    // 这种写法是组件每次挂载时就会执行组件或页面中的asyncData方法
    beforeMount () {
        const { asyncData } = this.$options
        if (asyncData) {
            // 将获取数据操作分配给 promise
            // 以便在组件中，我们可以在数据准备就绪后
            // 通过运行 `this.dataPromise.then(...)` 来执行其他任务
            this.dataPromise = asyncData({
                store: this.$store,
                route: this.$route
            })
        }
    },

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

if (window.__INITIAL_STATE__) {
    // 将window.__INITIAL_STATE__的数据替换到客户端的store中
    store.replaceState(window.__INITIAL_STATE__)
    console.log('store: ', store)
}

// console.log('router: ', router)

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

    app.$mount('#app')
})