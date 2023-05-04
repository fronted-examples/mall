import request from '@/utils/request'

export const getPosts = () => {
  return request({
    url: '/api/v1/topics'
  })
}