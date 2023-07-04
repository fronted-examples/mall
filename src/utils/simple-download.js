const { CancelToken } = require('axios')
const axios = require('axios')
const { promisePool } = require('@/utils/promise-pool')

const CHUNK_SIZE = 5 * 1024 * 1024
const SIMULTANEOUS_DOWNLOADS = 3
const LANGUAGE = 'zh_CN'

function File (file, download) {
  this.download = download
  this.id = file.id
  this.filename = file.filename
  this.type = file.type
  this.size = file.size
  this.sizeString = file.sizeString
  this.md5 = file.md5
  this.chunks = file.chunks
  this.promises = file.promises
  this.cancels = []
  this.blobList = []
  this.status = file.status
  this.downloadSize = 0
  this.downloaded = file.downloaded
  this.speed = file.speed
  this.remainingTime = file.remainingTime

  this.downloadTime = new Date().getTime()
}

File.prototype.start = function ({
  target,
  success,
  fail
}) {
  console.log('开始下载：', this)

  if (!target || !success) {
    console.error('target and success can not be undefined')

    return
  }

  if (target && Object.prototype.toString.call(target) !== '[object Function]') {
    console.error('target must be function')

    return
  }

  promisePool(this.download.simultaneousDownloads, this.promises, part(this), (isSuccess) => {
    console.log('isSuccess: ', isSuccess)
    if (isSuccess) {
      if (success && Object.prototype.toString.call(success) !== '[object Function]') {
        console.error('success must be function')

        return
      }

      success(this)
    }

    if (!isSuccess) {
      if (this.cancels.length) {
        this.status = Download.status[this.download.language].failed

        this.pause()
      }

      if (fail && Object.prototype.toString.call(fail) !== '[object Function]') {
        console.error('fail must be function')

        return
      }

      fail(this)
    }
  })
}

File.prototype.pause = function (callback) {
  while (this.cancels.length) {
    this.cancels.pop()()
  }

  console.log('this.cancels: ', this.cancels)

  this.status = Download.status[this.download.language].pause

  if (callback && Object.prototype.toString.call(callback) === '[object Function]') {
    callback(this)
  }
}

File.prototype.resume = function (callback) {
  this.status = Download.status[this.download.language].downloading

  if (callback && Object.prototype.toString.call(callback) === '[object Function]') {
    callback(this)
  }
}

function onCancel (file) {
  return new CancelToken((cancel) => {
    return file.cancels.push(cancel)
  })
}

File.prototype.onDownloadProgress = function (event, file, chunkIndex) {
  file.chunks[chunkIndex].downloadedProgress = event.loaded
  countSpeed(file)

  file.downloading(file)
}

File.prototype.downloading = function () {
  this.status = Download.status[this.download.language].downloading

  if (this.download.$options.downloading && Object.prototype.toString.call(this.download.$options.downloading) === '[object Function]') {
    this.download.$options.downloading(this)
  }
}

File.prototype.downloadFailed = function (data) {
  this.status = Download.status[this.download.language].failed

  if (this.download.$options.downloadFailed && Object.prototype.toString.call(this.download.$options.downloadFailed) === '[object Function]') {
    this.uploader.$options.downloadFailed(data)
  }
}

File.prototype.downloadSuccess = function (data) {
  this.status = Download.status[this.download.language].success

  if (this.download.$options.downloadSuccess && Object.prototype.toString.call(this.download.$options.downloadSuccess) === '[object Function]') {
    this.download.$options.downloadSuccess(data)
  }
}

function Download (options = {}) {
  this.$options = Object.assign({}, Download.defaultOptions, options)

  if (!this.$options.downloadUrl) {
    console.error('downloadUrl can not be undefined')

    return
  }

  this.files = Array.from(this.$options.files)
  this.fileList = []
  this.downloadUrl = this.$options.downloadUrl
  this.headers = this.$options.headers
  this.chunkSize = this.$options.chunkSize
  this.language = this.$options.language
  this.simultaneousDownloads = this.$options.simultaneousDownloads

  this.beforeDownload()
}

Download.defaultOptions = {
  files: [],
  chunkSize: CHUNK_SIZE,
  language: LANGUAGE,
  downloadUrl: '',
  headers: {},
  simultaneousDownloads: SIMULTANEOUS_DOWNLOADS
}

Download.status = {
  'zh_CN': {
    waiting: '等待中',
    pausing: '暂停中',
    downloading: '下载中',
    success: '下载成功',
    failed: '下载失败',
    deleted: '已删除'
  },
  'EN': {
    waiting: 'waiting',
    pausing: 'pausing',
    downloading: 'downloading',
    success: 'success',
    failed: 'failed',
    deleted: 'deleted'
  }
}

Download.prototype.onDownloadProgress = File.prototype.onDownloadProgress

Download.prototype.beforeDownload = function () {
  for (let file of this.files) {
    const params = {
      filename: file.filename,
      type: file.type,
      size: file.size,
      sizeString: formatSize(file.size),
      md5: '',
      status: '',
      chunks: [],
      promises: [],
      downloaded: '',
      speed: '',
      remainingTime: ''
    }

    params.status = Download.status[this.language].waiting
    params.downloaded = '0' + (this.language === 'EN' ? 'B' : '字节')
    params.speed = '0' + (this.language === 'EN' ? 'B/s' : '字节/秒')
    params.remainingTime = '0' + (this.language === 'EN' ? 's' : '秒')

    const currentFile = new File(params, this)

    currentFile.chunks = createFileChunk(currentFile)
    currentFile.promises = handlePartPromise(currentFile)

    this.fileList.push(currentFile)
  }

  if (this.$options.beforeDownload) {
    this.$options.beforeDownload(this)
  }
}

function createFileChunk (file, callback) {
  const list = []
  const chunks = Math.floor(file.size / file.download.chunkSize)

  for (let i = 0; i < chunks; i++) {
    const offset = i * file.download.chunkSize

    const param = {
      chunkIndex: i,
      offset: offset,
      chunkLength: file.download.chunkSize,
      downloadedProgress: 0
    }

    list.push(param)
  }

  if (file.size % file.download.chunkSize !== 0) {
    const offset = chunks * file.download.chunkSize
    const offsetLength = file.size - chunks * file.download.chunkSize

    const param = {
      chunkIndex: chunks,
      offset: offset,
      chunkLength: offsetLength,
      downloadedProgress: 0
    }

    list.push(param)
  }

  if (callback && Object.prototype.toString.call(callback) === '[object Function]') {
    callback(list, chunks)
  }

  return list
}

function handlePartPromise (file) {
  const promises = []

  for (let i = 0; i < file.chunks.length; i++) {
    const param = {
      index: i,
      filename: `image/${file.filename}`,
      downloadUrl: file.download.downloadUrl,
      offset: file.chunks[i].offset,
      chunkLength: file.chunks[i].chunkLength
    }

    promises.push(param)
  }

  return promises
}

function part (file) {
  const downloadPart = (params) => {
    return new Promise((resolve, reject) => {
      axios.get(params.downloadUrl, {
        headers: file.download.headers,
        responseType: 'blob',
        params: {
          filename: params.filename,
          offset: params.offset,
          chunkLength: params.chunkLength
        },
        onDownloadProgress: ({ loaded }) => {
          file.chunks[params.index].downloadedProgress = loaded

          countSpeed(file)

          file.downloading()
        }
      }, {
        cancelToken: onCancel(file)
      }).then((res) => {
        file.promises.forEach((promise, index) => {
          if (promise.index === params.index) {
            file.promises.splice(index, 1)
          }
        })

        file.blobList.push(res)

        resolve(file)
      }).catch((err) => {
        reject(err)
      })
    })
  }

  return downloadPart
}

function countSpeed (file) {
  let downloaded = 0
  file.chunks.forEach(x => {
    // debugger
    downloaded += x.downloadedProgress
  })

  // 处理暂定后继续上传或某一分片上传失败重新上传时，进度回滚的问题。
  file.downloadSize = file.downloadSize >= downloaded ? file.downloadSize : downloaded

  const useTime = new Date().getTime() - file.downloadTime
  const speed = file.downloadSize / (useTime / 1000)

  file.percentage = file.downloadSize <= 0 ? 0 : Math.round((file.downloadSize / file.size) * 10000) / 100.0
  file.downloaded = formatSize(file.downloadSize)
  file.speed = formatSize(speed) + '/s'
  file.remainingTime = formatTime((file.size - file.downloadSize) / speed)

  console.log('总大小:', file.size, ' 下载速度:', file.speed, '剩余时间: ', file.remainingTime, ' 下载百分比:', file.percentage, ' 已下载:', file.downloaded)
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
  Download
}
