import { sessionMemory } from '@/utils/storage'

const getters = {
  validateCodeImg: (state) => state.validateCodeImg,
  accessToken: (state) => {
    // 浏览器sessionStorage的数据只能在客户端读取到
    if (process.env.VUE_ENV === 'client') {
      if (state.accessToken) {
        return state.accessToken
      }

      return state.accessToken = sessionMemory.getItem('accessToken')
    }
  },
  userInfo: (state) => {
    if (process.env.VUE_ENV === 'client') {
      if (state.userInfo) {
        return state.userInfo
      }

      return state.userInfo = sessionMemory.getItem('userInfo')
    }
  }
}

export default getters