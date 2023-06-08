import { sessionMemory } from '@/utils/storage'

const getters = {
  validateCodeImg: (state) => state.validateCodeImg,
  accessToken: (state) => state.accessToken,
  userInfo: (state) => state.userInfo
}

export default getters