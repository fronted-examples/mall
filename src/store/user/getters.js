
import Storage from '@/utils/storage'

const getters = {
  validateCodeImg: (state) => state.validateCodeImg,
  accessToken: (state) => state.accessToken,
  userInfo: (state) => {
    if (process.env.VUE_ENV === 'client') {
      const sessionStorage = new Storage('sessionStorage')

      return  state.userInfo || Object({}, state.userInfo, sessionStorage.getItem('userInfo'))
    } else {
      return null
    }
  }
}

export default getters