import { SET_ROUTES, CLEAR_ROUTES } from './constant'
import { filterAsyncRoutes } from './utils'
import { asyncRoutes } from '@/router/index'

const actions = {
  [SET_ROUTES]: ({ commit }, roles) => {
    return new Promise(resolve => {
      let accessedRoutes = []

      if (roles.includes('ROLE_developer')) { // 如果该用户是开发者，则可以访问所有页面
        accessedRoutes = asyncRoutes || []
      } else {
        accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
      }

      commit(SET_ROUTES, accessedRoutes)

      resolve(accessedRoutes)
    })
  },

  [CLEAR_ROUTES]: ({ commit }) => {
    commit(CLEAR_ROUTES)
  }
}

export default actions
