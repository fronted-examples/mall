import {
  SET_USER,
  GET_USER
} from './constants'

const mutations = {
  [GET_USER]: (state, data) => {
    return state.posts
  },
  [SET_USER]: (state, data) => {
    state.posts = data
  }
}

export default mutations