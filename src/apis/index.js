import request from '@/utils/request'

export const getPosts = () => {
  return request({
    url: '/api/v1/topics'
  })
}

export const getRandomCode = () => {
  return request({
    url: '/auth/getRandomCode',
    method: 'get',
    responseType: 'arraybuffer'
  })
}

export const login = data => {
  return request({
    url: '/auth/login',
    method: 'post',
    data
  })
}

export const logout = () => {
  return request({
    url: '/logout',
    method: 'post'
  })
}

export const getUserInfo = () => {
  return request({
    url: '/user/getUserInfo',
    method: 'get'
  })
}