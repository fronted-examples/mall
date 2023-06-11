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

// 将获取到的视频信息，转化为图片地址
function getVideoPosterInfo (videoInfo) {
  return new Promise(resolve => {
    const { video, width, height } = videoInfo
    video.addEventListener('canplay', () => {
      const canvas = document.createElement('canvas')
      canvas.width = width
      canvas.height = height
      const ctx = canvas.getContext('2d')
      ctx.drawImage(video, 0, 0, width, height)
      const saturation = getImageSaturation(canvas)
      const posterUrl = canvas.toDataURL('image/jpg')
      resolve({ posterUrl, saturation })
    })
  })
}
// 获取一个图片的平均饱和度
function getImageSaturation (canvas) {
  const ctx = canvas.getContext('2d')
  const uint8ClampedArray = ctx.getImageData(0, 0, canvas.width, canvas.height).data
  console.log(uint8ClampedArray)
  const rgbaList = binary2rgba(uint8ClampedArray)
  const hslList = rgbaList.map(item => {
    return rgb2hsl(item.r, item.g, item.b)
  })
  const avarageSaturation = hslList.reduce((total, curr) => total + curr.s, 0) / hslList.length
  return avarageSaturation
}

function rgb2hsl (r, g, b) {
  r = r / 255
  g = g / 255
  b = b / 255

  var min = Math.min(r, g, b)
  var max = Math.max(r, g, b)
  var l = (min + max) / 2
  var difference = max - min
  var h, s
  if (max === min) {
    h = 0
    s = 0
  } else {
    s = l > 0.5 ? difference / (2.0 - max - min) : difference / (max + min)
    switch (max) {
      case r: h = (g - b) / difference + (g < b ? 6 : 0); break
      case g: h = 2.0 + (b - r) / difference; break
      case b: h = 4.0 + (r - g) / difference; break
    }
    h = Math.round(h * 60)
  }
  s = Math.round(s * 100)// 转换成百分比的形式
  l = Math.round(l * 100)
  return { h, s, l }
}

function binary2rgba (uint8ClampedArray) {
  const rgbaList = []
  for (let i = 0; i < uint8ClampedArray.length; i++) {
    if (i % 4 === 0) {
      rgbaList.push({ r: uint8ClampedArray[i] })
      continue
    }
    const currentRgba = rgbaList[rgbaList.length - 1]
    if (i % 4 === 1) {
      currentRgba.g = uint8ClampedArray[i]
      continue
    }
    if (i % 4 === 2) {
      currentRgba.b = uint8ClampedArray[i]
      continue
    }
    if (i % 4 === 3) {
      currentRgba.a = uint8ClampedArray[i]
      continue
    }
  }
  return rgbaList
}

// 根据视频地址与播放时长获取图片信息与图片平均饱和度
function getVideoPosterByFrame (videoSrc, targetTime) {
  return getVideoBasicInfo(videoSrc).then(videoInfo => {
    const { video } = videoInfo
    video.currentTime = targetTime
    return getVideoPosterInfo(videoInfo)
  })
}

/**
 *
 * @param {*} videoSrc
 * @param {*} targetSaturation 饱和度品质 0/10/30/50
 * @returns
 */
export async function getBestPoster (videoSrc, targetSaturation) {
  const videoInfo = await getVideoBasicInfo(videoSrc)
  const { duration } = videoInfo
  for (let i = 0; i <= duration; i++) {
    const posterInfo = await getVideoPosterByFrame(videoSrc, i)
    const { posterUrl, saturation } = posterInfo
    // 判断当前饱和度是否大于等于期望的饱和度
    if (saturation >= targetSaturation) {
      return posterUrl
    }
  }
}

