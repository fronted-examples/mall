import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

import createPersistedState from 'vuex-persistedstate'

import app from './app/index'

Vue.use(Vuex)

// 存储服务端vuex前，将window对象绑定到global上
if (process.env.VUE_ENV === "server") {
    require('@/utils/server-add-window.js')
    require('@/utils/flexible')
}

const appPersistedState = createPersistedState({
    key: 'app',
    storage: global.window.sessionStorage, // 修改存储的状态
    paths: ['app'] // 存储的指定的模块的名字（存储某个模块对象）
})

console.log('global: ', process.env.VUE_ENV, global.window.sessionStorage)

export const createStore =  () =>{
    return new Vuex.Store({
        modules: {
            app
        },
        plugins: [appPersistedState] // 状态持久化
    })
}