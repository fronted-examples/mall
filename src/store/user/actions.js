import {
  LOGIN,
  INIT_TOKEN,
  LOGOUT,
  GET_RANDOMCODE,
  GET_USER_INFO
} from './constants'

import { cookieParse } from '@/utils/auth'

import { getRandomCode, login, logout, getUserInfo } from '@/apis/index'

const actions = {
  nuxtServerInit ({ commit, state }, { request }) {
    let accessToken
    if (request && request.headers && request.headers.cookie) {
      const parsed = cookieParse(request.headers.cookie)
      try {
        accessToken = parsed.accessToken
      } catch (err) {
        // No valid cookie found
      }
      commit(INIT_TOKEN, accessToken)
    }
  },
  [LOGIN]: (context, data) => {
    return new Promise((resolve, reject) => {
      login(data).then(({ code, data: { accessToken } }) => {
        if (code === 200) {
          context.commit(INIT_TOKEN, accessToken)

          context.dispatch(GET_USER_INFO).then(() => {
            resolve()
          })
        }
      }).catch(error => {
        reject(error)
      })
    })
  },
  [LOGOUT]: (context) => {
    return new Promise((resolve, reject) => {
      logout().then(({ code }) => {
        if (code === 200) {
          context.commit(LOGOUT)
          resolve()
        }
      }).catch(error => {
        reject(error)
      })
    })
  },
  [GET_USER_INFO]: (context) => {
    return new Promise((resolve, reject) => {
      getUserInfo().then(({ code, data: { userInfo } }) => {
        if (code === 200) {
          context.commit(GET_USER_INFO, userInfo)
          resolve()
        }
      }).catch(error => {
        reject(error)
      })
    })
  },
  [GET_RANDOMCODE]: (context) => {
    getRandomCode().then(response => {
      // 将从后台获取的图片流进行转换
      return 'data:image/png;base64,' + btoa(
        new Uint8Array(response.data).reduce((data, byte) => data + String.fromCharCode(byte), '')
      )
    }).then((url) => {
      context.commit(GET_RANDOMCODE, url)
    })
  }
}

export default actions