import {
  SET_POSTS,
  GET_POSTS,
  UPDATE_CURRENT_ROUTE_PATH,
  UPDATE_PARENT_ROUTE_PATH
} from './constants'
import { sessionMemory } from '@/utils/storage'

const mutations = {
  [GET_POSTS]: (state, data) => {
    return state.posts
  },
  [SET_POSTS]: (state, data) => {
    state.posts = data
  },
  [UPDATE_CURRENT_ROUTE_PATH]: (state, data) => {
    state.currentRoutePath = data

    sessionMemory.setItem({
      name: 'currentRoutePath',
      value: data
    })
  },
  [UPDATE_PARENT_ROUTE_PATH]: (state, data) => {
    state.parentRoutePath = data

    sessionMemory.setItem({
      name: 'parentRoutePath',
      value: data
    })
  }
}

export default mutations