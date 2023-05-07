import {
  LOGIN,
  LOGOUT,
  GET_RANDOMCODE,
  GET_USER_INFO
} from './constants'

import { sessionMemory } from '@/utils/storage'

const mutations = {
  [LOGIN]: (state, data) => {
    state.accessToken = data.accessToken

    sessionMemory.setItem({
      name: 'accessToken',
      value: data.accessToken
    })
  },
  [LOGOUT]: (state) => {
    state.accessToken = ''
    state.userInfo = null
    sessionMemory.removeItem('accessToken')
    sessionMemory.removeItem('userInfo')
  },
  [GET_RANDOMCODE]: (state, data) => {
    state.validateCodeImg = data
  },
  [GET_USER_INFO]: (state, data) => {
    state.userInfo = data

    sessionMemory.setItem({
      name: 'userInfo',
      value: data
    })
  }
}

export default mutations