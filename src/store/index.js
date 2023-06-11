import Vue from 'vue'
import Vuex from 'vuex'

import app from './app/index'
import user from './user/index'
import business from './business/index'
// import permission from './permission/index'

Vue.use(Vuex)

export const createStore = (router) => {
    const store = new Vuex.Store({
        modules: {
            app,
            user,
            business
        }
    })

    return store
}