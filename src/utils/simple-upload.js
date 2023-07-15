const SparkMD5 = require('spark-md5')
const { createMultipartUpload, upload, completeMultipartUpload } = require('@/apis/upload')
const { promisePool } = require('@/utils/promise-pool')
const { CancelToken } = require('axios')
const { createStore } = require('@/store')

const store = createStore()

const CHUNK_SIZE = 5 * 1024 * 1024
const SIMULTANEOUS_UPLOADS = 3
const LANGUAGE = 'zh_CN'

function File (file, uploader) {
  this.uploader = uploader
  this.id = file.id
  this.filename = file.filename
  this.file = file.file
  this.type = file.type
  this.size = file.size
  this.sizeString = file.sizeString
  this.md5 = file.md5
  this.chunks = file.chunks
  this.uploadId = file.uploadId
  this.uploadUrls = file.uploadUrls
  this.promises = file.promises
  this.cancels = []
  this.status = file.status
  this.uploadedSize = 0
  this.uploaded = file.uploaded
  this.speed = file.speed
  this.remainingTime = file.remainingTime

  this.uploadTime = new Date().getTime()
}

File.prototype.start = function (callback) {
  console.log('开始上传：', this)

  startUploadPromise(this)

  if (callback && Object.prototype.toString.call(callback) === '[object Function]') {
    callback(this)
  }
}

File.prototype.uploading = function () {
  if (this.uploader.$options.uploading && Object.prototype.toString.call(this.uploader.$options.uploading) === '[object Function]') {
    this.uploader.$options.uploading(this)
  }
}

File.prototype.uploadFailed = function (data) {
  if (this.uploader.$options.uploadFailed && Object.prototype.toString.call(this.uploader.$options.uploadFailed) === '[object Function]') {
    this.uploader.$options.uploadFailed(data)
  }
}

File.prototype.uploadSuccess = function (data) {
  if (this.uploader.$options.uploadSuccess && Object.prototype.toString.call(this.uploader.$options.uploadSuccess) === '[object Function]') {
    this.uploader.$options.uploadSuccess(data)
  }
}

File.prototype.pause = function (callback) {
  while (this.cancels.length) {
    // data.cancels.pop()('取消请求')
    this.cancels.pop()()
  }

  this.status = Uploader.status[this.uploader.language].pause

  if (callback && Object.prototype.toString.call(callback) === '[object Function]') {
    callback(this)
  }
}

File.prototype.resume = function (callback) {
  this.status = Uploader.status[this.uploader.language].uploading

  startUploadPromise(this)

  if (callback && Object.prototype.toString.call(callback) === '[object Function]') {
    callback(this)
  }
}

function Uploader (options = {}) {
  this.$options = Object.assign({}, Uploader.defaultOptions, options)

  this.actions = this.$options.actions
  this.files = Array.from(this.$options.files)
  this.fileList = []
  this.chunkSize = this.$options.chunkSize
  this.language = this.$options.language
  this.simultaneousUploads = this.$options.simultaneousUploads

  this.beforeUpload()
}

Uploader.defaultOptions = {
  files: [],
  chunkSize: CHUNK_SIZE,
  language: LANGUAGE,
  simultaneousUploads: SIMULTANEOUS_UPLOADS
}

Uploader.status = {
  'zh_CN': {
    waiting: '等待中',
    pausing: '暂停中',
    uploading: '上传中',
    success: '上传成功',
    failed: '上传失败',
    deleted: '已删除'
  },
  'EN': {
    waiting: 'waiting',
    pausing: 'pausing',
    uploading: 'uploading',
    success: 'success',
    failed: 'failed',
    deleted: 'deleted'
  }
}

Uploader.prototype.beforeUpload = async function () {
  for (let fileItem of this.files) {
    const params = {
      filename: fileItem.name,
      file: fileItem,
      type: fileItem.type,
      size: fileItem.size,
      sizeString: formatSize(fileItem.size),
      md5: await getFileChunkMd5(createFileChunk(fileItem)),
      status: Uploader.status[this.language].waiting,
      chunks: createFileChunk(fileItem   ),
      uploadId: '',
      uploadUrls: [],
      promises: [],
      uploadedSize: 0,
      uploaded: `0${this.language === 'EN' ? 'B' : '字节'}`,
      speed: `0${this.language === 'EN' ? 'B/s' : '字节/秒'}`,
      remainingTime: `0${this.language === 'EN' ? 's' : '秒'}`
    }

    let file = new File(params, this)

    // params.chunks = createFileChunk(file)

    // params.md5 = await getFileChunkMd5(params.chunks)

    // const { uploadUrls, uploadId, fileUrl, id } = await getMultipartUpload(params)

    const { uploadUrls, uploadId, fileUrl, id } = await getMultipartUpload(file)

    file.uploadUrls = uploadUrls
    file.uploadId = uploadId
    // params.status = Uploader.status[this.language].waiting
    // params.uploaded = '0' + (this.language === 'EN' ? 'B' : '字节')
    // params.speed = '0' + (this.language === 'EN' ? 'B/s' : '字节/秒')
    // params.remainingTime = '0' + (this.language === 'EN' ? 's' : '秒')

    if (!uploadUrls) {
      file.id = id
      file.uploaded = formatSize(file.size)
      file.uploadedSize = file.size
      file.status = Uploader.status[this.language].success
      file.percentage = 100.0
      file.remainingTime = `0${this.language === 'EN' ? 's' : '秒'}`

      this.fileList.push(file)

      return file.uploadSuccess(Object.assign(file, { id: file.id, url: fileUrl }))
    }

    for (let i = 0; i < file.uploadUrls.length; i++) {
      let param = {
        index: i,
        // uploadUrl: params.uploadUrls[i],
        file: file.chunks[i].file
      }

      let uploadUrl = file.uploadUrls[i].replace('http://101.35.44.70:9000', '')
      param.uploadUrl = `${process.env.IMAGE_PREFIX}${uploadUrl}`

      file.promises.push(param)
    }

    this.fileList.push(file)
  }

  if (this.$options.beforeUpload) {
    this.$options.beforeUpload(this)
  }
}

function createFileChunk (file, callback) {
  const list = []
  const type = file.type
  let size = 0
  const len = Math.ceil(file.size / CHUNK_SIZE)

  while (size < file.size) {
    const data = {
      file: file.slice(size, size + CHUNK_SIZE),
      type: type,
      uploadProgress: 0,
      total: 0
    }

    list.push(data)
    size += CHUNK_SIZE

    if (callback && Object.prototype.toString.call(callback) === '[object Function]') {
      callback(list, len)
    }
  }

  return list
}

function getFileChunkMd5 (fileChunkList) {
  return new Promise((resolve) => {
    // 总切片数
    const chunkSize = fileChunkList.length
    // 当前处理位置
    let currentChunk = 0
    // SparkMD5实例的ArrayBuffer
    const spark = new SparkMD5.ArrayBuffer()

    const fileReader = new FileReader()
    fileReader.onload = (e) => {
      try {
        spark.append(e.target.result)
      } catch (error) {
        console.log('获取Md5错误，错误位置：' + currentChunk)
      }
      currentChunk++

      if (currentChunk < chunkSize) {
        loadNext()
      } else {
        resolve(spark.end())
      }
    }
    fileReader.onerror = function () {
      console.warn('Md5：文件读取错误')
    }

    function loadNext () {
      fileReader.readAsArrayBuffer(fileChunkList[currentChunk].file)
    }

    loadNext()
  })
}

function handleCancel (file) {
  return new CancelToken((c) => {
    return file.cancels.push(c)
  })
}

function countSpeed (file) {
  let uploaded = 0
  file.chunks.forEach(x => {
    uploaded += x.uploadProgress
  })

  // 处理暂定后继续上传或某一分片上传失败重新上传时，进度回滚的问题。
  file.uploadedSize = file.uploadedSize >= uploaded ? file.uploadedSize : uploaded

  const useTime = new Date().getTime() - file.uploadTime
  const speed = file.uploadedSize / (useTime / 1000)

  file.percentage = file.uploadedSize <= 0 ? 0 : Math.round((file.uploadedSize / file.size) * 10000) / 100.0
  file.uploaded = formatSize(file.uploadedSize)
  file.speed = formatSize(speed) + '/s'
  file.remainingTime = formatTime((file.size - file.uploadedSize) / speed)

  console.log('总大小:', file.size, ' 上传速度:', file.speed, '剩余时间: ', file.remainingTime, ' 上传百分比:', file.percentage, ' 已上传:', file.uploaded)
}

function partUpload (file) {
  const uploadPart = (params) => {
    return new Promise((resolve, reject) => {
      upload(params.uploadUrl, params.file, handleCancel(file), (loaded, total) => {
        file.chunks[params.index].uploadProgress = loaded
        file.chunks[params.index].total = total
        countSpeed(file)
        file.uploading(params.index)
      }).then(() => {
        for (let i = file.promises.length - 1; i >= 0; i--) {
          if (file.promises[i].index === params.index) {
            file.promises.splice(i, 1)
          }
        }
        resolve()
      }).catch((error) => {
        reject(error)
      })
    })
  }

  return uploadPart
}

const startUploadPromise = (file) => {
  const uploadPart = partUpload(file)

  promisePool(file.uploader.simultaneousUploads, file.promises, uploadPart, (isSuccess) => {
    if (isSuccess) {
      mergeFile(file)
    }

    if (!isSuccess) {
      if (file.cancels.length) {
        file.status = Uploader.status[file.uploader.language].failed
      }
    }
  })
}

function getMultipartUpload (file) {
  return new Promise((resolve, reject) => {
    const params = {
      bucketName: file.uploader.actions.bucketName,
      filename: `image/${file.filename}`,
      totalPart: file.chunks.length,
      md5: file.md5,
      fileType: file.type
    }

    createMultipartUpload(params).then(({ code, data }) => {
      if (code === 200) {
        resolve(data)
      }
    }).catch((err) => {
      reject(err)
    })
  })
}

async function mergeFile (file) {
  if (file.uploadId) {
    completeMultipartUpload({
      userId: file.uploader.actions.userId,
      chunkCount: file.chunks.length,
      md5: file.md5,
      uploadId: file.uploadId,
      filename: `image/${file.filename}`,
      bucketName: file.uploader.actions.bucketName
    }).then(({ code, data }) => {
      if (code === 200) {
        file.id = data.file.id
        file.url = data.file.fileUrl
        file.status = Uploader.status[file.uploader.language].success
        console.log('文件合并完成!')
      }
    }).catch(() => {
      file.status = Uploader.status[file.uploader.language]
    }).finally(() => {
      if (file.uploadedSize === file.size) {
        file.uploadSuccess(Object.assign(file.file, { id: file.id, url: file.url }))
      } else {
        file.uploadFailed(Object.assign(file.file, { id: file.id, url: file.url }))
      }
    })
  }
}

function formatSize (size) {
  if (size < 1024) {
    return size.toFixed(0) + 'bytes'
  } else if (size < 1024 * 1024) {
    return (size / 1024.0).toFixed(0) + 'KB'
  } else if (size < 1024 * 1024 * 1024) {
    return (size / 1024.0 / 1024.0).toFixed(1) + 'MB'
  } else {
    return (size / 1024.0 / 1024.0 / 1024.0).toFixed(1) + 'GB'
  }
}

function formatTime (time) {
  if (time < 60) {
    return time.toFixed(1) + '秒'
  }

  if (time < 60 * 60) {
    return (time / 60).toFixed(1) + '分钟'
  }

  if (time < 60 * 60 * 24) {
    return (time / 60 / 60).toFixed(1) + '小时'
  }

  return (time / 60 / 60 / 24).toFixed(1) + '天'
}

export {
  Uploader
}
