import request from '@/utils/request'

/**
 * 获取图形验证码
 * @returns 
 */
export const getRandomCode = () => {
    return request({
      url: '/auth/getRandomCode',
      method: 'get',
      responseType: 'arraybuffer'
    })
}

/**
 * 登录
 * @param {Object} data 
 * @returns 
 */
export const login = data => {
    return request({
        url: '/auth/login',
        method: 'post',
        data
    })
}