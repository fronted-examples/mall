import {
  SET_POSTS,
  GET_POSTS,
  UPDATE_HREF,
  UPDATE_META_INFO
} from './constants'
import axios from 'axios'

import { getPosts } from '@/apis'

const actions = {
  [SET_POSTS]: async (context) => {
    getPosts().then((res) => {
      console.log('res: ', res)
    })
    // const { data } = await axios.get('https://cnodejs.org/api/v1/topics')
    // context.commit(SET_POSTS, data.data)
  },
  [GET_POSTS]: (context, data) => {
    context.commit(GET_POSTS)
  },
  [UPDATE_HREF]: (context, data) => {
    context.commit(UPDATE_HREF, data)
  },
  [UPDATE_META_INFO]: (context, data) => {
    context.commit(UPDATE_META_INFO, data)
  }
}

export default actions