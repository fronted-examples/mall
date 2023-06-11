export function deepAssign () {
  let name, options, src, copy
  let length = arguments.length
  // 记录要复制的对象的下标
  let i = 1
  // target默认是第一个参数
  let target = arguments[0] || {}
  // 如果target不是对象，我们是无法进行复制的，所以设为{}
  if (typeof target !== 'object') {
    target = {}
  }
  // 循环遍历要复制的对象
  for (; i < length; i++) {
    // 获取当前对象
    options = arguments[i]
    // 要求不能为空 避免extend(a,,b)这种情况
    if (options != null) {
      for (name in options) {
        // 目标属性值
        src = target[name]
        // 要复制的对象的属性值
        copy = options[name]

        if (copy && typeof copy == 'object') {
          // 递归调用
          target[name] = deepAssign(src, copy)
        } else if (copy !== undefined) {
          target[name] = copy
        }
      }
    }
  }

  return target
}

/**
 * 生成唯一文件名
 * @param {Number} len 生成的文件名长度
 * @param {Number} radix 指定基数
 */
export function getuuid (len, radix) {
  var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('')
  var uuid = []
  var i = 0
  radix = radix || chars.length

  if (len) {
    for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random() * radix]
  } else {
    var r

    uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-'
    uuid[14] = '4'

    for (i = 0; i < 36; i++) {
      if (!uuid[i]) {
        r = 0 | Math.random() * 16
        uuid[i] = chars[(i === 19) ? (r & 0x3) | 0x8 : r]
      }
    }
  }

  return uuid.join('')
}

/**
 * 生成唯一文件名 时间戳 + 随机数
 * @param {Number} len 生成的文件名长度
 * @param {Number} radix 指定基数
 */
export function getTimeId (len, radix) {
  if (len) {
    const time = new Date().getTime()
    const uuid = getuuid(len, radix)
    return `${time}${uuid}`
  } else {
    console.error('请输入长度')
  }
}

export function fileToDataUrl (file) {

}

// 获取视频基本信息
export function getVideoBasicInfo (videoSrc) {
  return new Promise((resolve, reject) => {
    const video = document.createElement('video')
    video.src = videoSrc
    // 视频一定要添加预加载
    video.preload = 'auto'
    // 视频一定要同源或者必须允许跨域
    video.crossOrigin = 'Anonymous'
    // 监听：异常
    video.addEventListener('error', error => {
      reject(error)
    })
    // 监听：加载完成基本信息,设置要播放的时常
    video.addEventListener('loadedmetadata', () => {
      const videoInfo = {
        video,
        width: video.videoWidth,
        height: video.videoHeight,
        duration: video.duration
      }
      resolve(videoInfo)
    })
  })
}

// 获取视频当前帧图像信息与饱和度
export function getVideoPosterInfo (videoInfo) {
  return new Promise(resolve => {
    const { video, width, height } = videoInfo
    video.addEventListener('canplay', () => {
      const canvas = document.createElement('canvas')
      canvas.width = width
      canvas.height = height
      const ctx = canvas.getContext('2d')
      // 将视频对象直接绘入canvas
      ctx.drawImage(video, 0, 0, width, height)
      // 获取图像的整体平均饱和度
      const saturation = getImageSaturation(canvas)
      const posterUrl = canvas.toDataURL('image/jpg')
      resolve({ posterUrl, saturation })
    })
  })
}


/**
 *
 * @param {String} url 视频url
 * @returns
 */
export const getVideoBase64 = (url, scale = 0.8) => {
  return new Promise(function (resolve) {
    let dataURL = ''
    let video = document.createElement('video')
    video.setAttribute('crossOrigin', 'anonymous') //处理跨域
    video.setAttribute('src', url)
    video.setAttribute('width', 880 + '')
    video.setAttribute('height', 495 + '')
    video.setAttribute('autoplay', 'autoplay')
    document.body.appendChild(video)
    video.addEventListener('loadeddata', function () {
      let canvas = document.createElement('canvas')
      let width = width //canvas的尺寸和图片一样
      let height = height
      canvas.width = video.width * scale
      canvas.height = video.height * scale
      canvas.getContext('2d').drawImage(video, 0, 0, width, height) //绘制canvas
      dataURL = canvas.toDataURL('image/jpeg') //转换为base64
      document.body.removeChild(video)
      resolve(dataURL)
    })
  })
}

