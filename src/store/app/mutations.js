import {
  SET_POSTS,
  GET_POSTS
} from './constants'

const mutations = {
  [GET_POSTS]: (state, data) => {
    return state.posts
  },
  [SET_POSTS]: (state, data) => {
    state.posts = data
  }
}

export default mutations