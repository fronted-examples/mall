import { sessionMemory } from '@/utils/storage'

const getters = {
  validateCodeImg: (state) => state.validateCodeImg,
  accessToken: (state) => state.accessToken || sessionMemory.getItem('accessToken'),
  userInfo: (state) => state.userInfo || Object({}, state.userInfo, sessionMemory.getItem('userInfo'))
}

export default getters