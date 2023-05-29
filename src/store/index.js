import Vue from 'vue'
import Vuex from 'vuex'

import app from './app/index'
import user from './user/index'
// import permission from './permission/index'

Vue.use(Vuex)

export const createStore = () => {
    return new Vuex.Store({
        modules: {
            app,
            user
        },
        // plugins: [appPersistedState, userPersistedState] // 状态持久化
    })
}