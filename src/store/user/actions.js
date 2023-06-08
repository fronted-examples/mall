import { userInfo } from 'os'
import {
  LOGIN,
  LOGOUT,
  GET_RANDOMCODE,
  GET_USER_INFO
} from './constants'

import { getRandomCode, login, logout, getUserInfo } from '@/apis/index'

const actions = {
  [LOGIN]: (context, data) => {
    return new Promise((resolve, reject) => {
      login(data).then(({ code, data }) => {
        if (code === 200) {
          context.commit(LOGIN, data)

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