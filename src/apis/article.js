import request from '@/utils/request'

/**
 * 获取文章类别列表
 * @returns 
 */
export const getArticleCategoryList = () => {
    return request({
      url: '/articleCategory/getArticleCategoryList',
      method: 'get'
    })
  }
  
  /**
   * 新增文章
   * @param {Object} data 
   * @returns 
   */
  export const addArticle = (data) => {
    return request({
      url: '/article/addArticle',
      method: 'post',
      data
    })
  }
  
  /**
   * 根据文章id获取文章
   * @param {Object} params 
   * @returns 
   */
  export const getArticleByArticleId = (params) => {
    return request({
      url: '/article/getArticleByArticleId',
      method: 'get',
      params
    })
  }
  
  /**
   * 编辑文章
   * @param {Object} data 
   * @returns 
   */
  export const editArticle = (data) => {
    return request({
      url: '/article/editArticle',
      method: 'patch',
      data
    })
  }
  
  /**
   * 根据关键词获取文章列表
   * @param {Object} params 
   * @returns 
   */
  export const getArticleListByKeyword = (params) => {
    return request({
      url: '/article/getArticleListByKeyword',
      method: 'get',
      params
    })
  }
  
  /**
   * 根据类别id获取文章列表
   * @param {Object} params 
   * @returns 
   */
  export const getArticleListByCategoryId = (params) => {
    return request({
      url: '/article/getArticleListByCategoryId',
      method: 'get',
      params
    })
  }