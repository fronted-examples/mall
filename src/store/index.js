import Vue from 'vue'
import Vuex from 'vuex'

import app from './app/index'
import user from './user/index'
// import permission from './permission/index'

Vue.use(Vuex)

// 存储服务端vuex前，将window对象绑定到global上
// if (process.env.VUE_ENV === "server") {
//     require('@/utils/server-add-window.js')
//     require('@/utils/flexible')
// }

/**
 * 因为服务端渲染会每次都创建一个新的store
 * 所以不做持续化缓存
 */
// const appPersistedState = createPersistedState({
//     key: 'app',
//     storage: global.window.sessionStorage, // 修改存储的状态
//     paths: ['app'] // 存储的指定的模块的名字（存储某个模块对象）
// })

// const userPersistedState = createPersistedState({
//     key: 'user',
//     storage: global.window.sessionStorage, // 修改存储的状态
//     paths: ['user'] // 存储的指定的模块的名字（存储某个模块对象）
// })

export const createStore = () => {
    return new Vuex.Store({
        modules: {
            app,
            user
        },
        // plugins: [appPersistedState, userPersistedState] // 状态持久化
    })
}