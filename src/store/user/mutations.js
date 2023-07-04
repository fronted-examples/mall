import {
  INIT_TOKEN,
  LOGOUT,
  GET_RANDOMCODE,
  UPDATE_USER_INFO
} from './constants'

import Cookies from 'js-cookie'
import Storage from '@/utils/storage'

const mutations = {
  [INIT_TOKEN]: (state, accessToken = '') => {
    state.accessToken = accessToken
    Cookies.set('accessToken', accessToken)
  },
  [LOGOUT]: (state) => {
    state.accessToken = ''
    state.userInfo = null
    Cookies.remove('accessToken')

    if (process.env.VUE_ENV === 'client') {
      const sessionStorage = new Storage('sessionStorage')
      sessionStorage.removeItem('userInfo')
    }
  },
  [GET_RANDOMCODE]: (state, data) => {
    state.validateCodeImg = data
  },
  [UPDATE_USER_INFO]: (state, data) => {
    state.userInfo = data

    if (process.env.VUE_ENV === 'client') {
      const sessionStorage = new Storage('sessionStorage')
      sessionStorage.setItem({
        name: 'userInfo',
        value: data
      })
    }
  }
}

export default mutations