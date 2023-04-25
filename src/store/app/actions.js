import {
  SET_POSTS,
  GET_POSTS
} from './constants'
import axios from 'axios'

const actions = {
  [SET_POSTS]: async (context) => {
    const { data } = await axios.get('https://cnodejs.org/api/v1/topics')
    context.commit(SET_POSTS, data.data)
  },
  [GET_POSTS]: (context, data) => {
    context.commit(GET_POSTS)
  }
}

export default actions