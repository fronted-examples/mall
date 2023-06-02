import {
  SET_POSTS,
  GET_POSTS,
  UPDATE_HREF,
  UPDATE_META_INFO
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
  },
  [UPDATE_META_INFO]: (state, data) => {
    state.metaInfo = data
  }
}

export default mutations