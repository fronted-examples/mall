import request from '@/utils/request'

console.log('request: ', request)

export const getPosts = () => {
  return request({
    url: '/api/v1/topics'
  })
}