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

export const getArticleCategoryList = () => {
  return request({
    url: '/articleCategory/getArticleCategoryList',
    method: 'get'
  })
}

export const addArticle = (data) => {
  return request({
    url: '/article/addArticle',
    method: 'post',
    data
  })
}

export const getArticleByArticleId = (params) => {
  return request({
    url: '/article/getArticleByArticleId',
    method: 'get',
    params
  })
}

export const editArticle = (data) => {
  return request({
    url: '/article/editArticle',
    method: 'patch',
    data
  })
}

export const getArticleListByKeyword = (params) => {
  return request({
    url: '/article/getArticleListByKeyword',
    method: 'get',
    params
  })
}