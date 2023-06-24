import {
  SET_POSTS,
  GET_POSTS,
  UPDATE_CURRENT_ROUTE_PATH,
  UPDATE_PARENT_ROUTE_PATH
} from './constants'

import Storage from '@/utils/storage'

const mutations = {
  [GET_POSTS]: (state, data) => {
    return state.posts
  },
  [SET_POSTS]: (state, data) => {
    state.posts = data
  },
  [UPDATE_CURRENT_ROUTE_PATH]: (state, data) => {
    state.currentRoutePath = data

    if (process.env.VUE_ENV === 'client') {
      const sessionStorage = new Storage('sessionStorage')
      sessionStorage.setItem({
        name: 'currentRoutePath',
        value: data
      })
    }
  },
  [UPDATE_PARENT_ROUTE_PATH]: (state, data) => {
    state.parentRoutePath = data

    if (process.env.VUE_ENV === 'client') {
      const sessionStorage = new Storage('sessionStorage')
      sessionStorage.setItem({
        name: 'parentRoutePath',
        value: data
      })
    }
  }
}

export default mutations