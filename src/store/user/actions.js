import {
  SET_USER,
  GET_USER
} from './constants'

const actions = {
  [SET_USER]: async (context) => {
  },
  [GET_USER]: (context, data) => {
    context.commit(GET_USER)
  }
}

export default actions