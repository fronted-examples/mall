import request from '@/utils/request'

/**
 * 表单格式上传文件
 * @param {*} data
 * @returns
 */
export const uploadSingleFile = (data, userId) => {
  return request({
    url: `/minio/uploadSingleFile/${userId}`,
    method: 'post',
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    data
  })
}

/**
 * 结合vue-simple-uploader的分片获取
 * @param {*} data
 * @returns
 */
export const createMultipartUpload = (data) => {
  return request({
    url: '/minio/initMultiPartUpload',
    method: 'post',
    data
  })
}

/**
 * 结合vue-simple-uploader的合并分片
 * @param {*} data
 * @returns
 */
export const completeMultipartUpload = (data) => {
  return request({
    url: '/minio/mergeMultipartUpload',
    method: 'post',
    data
  })
}

/**
 * @description 上传文件分片
 * @param {]} url 分片url
 * @param {*} data 分片file
 * @param {*} handleCancel 取消请求
 * @param {*} cb 进度回调
 * @returns
 */
export function upload (url, data, handleCancel, cb) {
  return request({
    url: url,
    method: 'put',
    onUploadProgress: (event) => {
      cb(event.loaded, event.total)
    },
    headers: {
      'Content-Type': 'application/octet-stream'
    },
    data: data,
    cancelToken: handleCancel
  })
}

/**
 * 获取分片列表
 */
export function getOffsetList (fileId) {
  return request({
    url: `/minio/getOffsetList/${fileId}`,
    method: 'get'
  })
}

/**
 * 下载文件
 * @param {Object} params
 * @param {Function} handleCancel
 * @param {Function} cb
 * @returns {Promise<unknown>}
 */
export function downloadFile (params, handleCancel, cb) {
  return request({
    url: '/minio/downloadFile',
    method: 'get',
    responseType: 'blob',
    onDownloadProgress: (event) => {
      cb(event)
    },
    params,
    cancelToken: handleCancel
  })
}
