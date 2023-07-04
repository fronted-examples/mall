import request from '@/utils/request'

/**
 * 获取用户信息
 * @returns 
 */
export const getUserInfo = () => {
    return request({
      url: '/user/getUserInfo',
      method: 'get'
    })
}

/**
 * 根据关键词获取所有用户
 * @param {Object} params
 * @param {Object} data
 * @returns {Promise}
 */
export const getUserListByKeyword = (params, data) => {
    return request({
      url: '/user/getUserListByKeyword',
      method: 'post',
      params,
      retryTimes: 2 // 重试请求的次数
    })
}

/**
 * 发送即时通讯消息
 * @param {Object} data
 * @returns {Promise}
 */
export const sendSingleMessage = (data) => {
  return request({
    url: '/message/sendSingleMessage',
    method: 'post',
    data
  })
}

/**
 * 退出登录
 * @returns 
 */
export const logout = () => {
    return request({
      url: '/logout',
      method: 'post'
    })
}