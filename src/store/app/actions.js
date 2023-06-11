import {
  SET_POSTS,
  GET_POSTS,
  UPDATE_CURRENT_ROUTE_PATH,
  UPDATE_PARENT_ROUTE_PATH
} from './constants'

import { getPosts } from '@/apis'

const actions = {
  [SET_POSTS]: async (context) => {
    const { data } = await getPosts()
    context.commit(SET_POSTS, data.data)
  },
  [GET_POSTS]: (context, data) => {
    context.commit(GET_POSTS)
  },
  [UPDATE_PARENT_ROUTE_PATH]: (context, data) => {
    context.commit(UPDATE_PARENT_ROUTE_PATH, data)
  },
  [UPDATE_CURRENT_ROUTE_PATH]: (context, data) => {
    context.commit(UPDATE_CURRENT_ROUTE_PATH, data)
  }
}

export default actions