import {
  INIT_TOKEN,
  LOGOUT,
  GET_RANDOMCODE,
  GET_USER_INFO
} from './constants'

import { sessionMemory } from '@/utils/storage'
import Cookies from 'js-cookie'

const mutations = {
  [INIT_TOKEN]: (state, accessToken) => {
    state.accessToken = accessToken
    Cookies.set('accessToken', accessToken)
  },
  [LOGOUT]: (state) => {
    state.accessToken = ''
    state.userInfo = null
    Cookies.remove('accessToken')
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