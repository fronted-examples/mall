import Vue from 'vue'
import Vuex from 'vuex'

import createPersistedstate from '@/utils/vuex-persistedstate'

import app from './app/index'
import user from './user/index'
import business from './business/index'
// import permission from './permission/index'

Vue.use(Vuex)

export const createStore = () => {
    const store = new Vuex.Store({
        modules: {
            app,
            user,
            business
        }
    })

    // vuex的持续化缓存，需要在替换掉window.__INITIAL_STATE__之后，可以选择在这里先替换本地存储，再去和window.__INITIAL_STATE__合并
    createPersistedstate(store, {
        keys: ['user', 'app'],
        storage: 'sessionStorage'
    })

    return store
}