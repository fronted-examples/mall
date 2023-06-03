import {
  SET_POSTS,
  GET_POSTS,
  UPDATE_HREF
} from './constants'
import { sessionMemory } from '@/utils/storage'

const mutations = {
  [GET_POSTS]: (state, data) => {
    return state.posts
  },
  [SET_POSTS]: (state, data) => {
    state.posts = data
  },
  [UPDATE_HREF]: (state, data) => {
    state.href = data
    sessionMemory.setItem({
      name: 'href',
      value: data
    })
  }
}

export default mutations