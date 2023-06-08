import {
  SET_POSTS,
  GET_POSTS,
  UPDATE_HREF
} from './constants'

const mutations = {
  [GET_POSTS]: (state, data) => {
    return state.posts
  },
  [SET_POSTS]: (state, data) => {
    state.posts = data
  },
  [UPDATE_HREF]: (state, data) => {
    state.href = data
  }
}

export default mutations