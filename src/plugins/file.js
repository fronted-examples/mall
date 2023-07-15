export default {
  FILE_ICON_MAP: {
    '': {
      icon: 'unknown_format',
      color: '#CCCCCC'
    },
    'application/x-zip-compressed': {
      icon: 'zip',
      color: '#1296db'
    },
    'application/msword': {
      icon: 'docx',
      color: '#0D47A1'
    },
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': {
      icon: 'docx',
      color: '#0D47A1'
    },
    'application/x-msdownload': {
      icon: 'exe',
      color: '#8199AF'
    },
    'text/html': {
      icon: 'html',
      color: '#EF6A63'
    },
    'application/pdf': {
      icon: 'pdf',
      color: '#A33639'
    },
    'application/vnd.ms-powerpoint': {
      icon: 'ppt',
      color: '#D24625'
    },
    'text/plain': {
      icon: 'txt',
      color: '#F9CA06'
    },
    'application/vnd.ms-excel': {
      icon: 'xlsx',
      color: '#207245'
    },
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': {
      icon: 'xlsx',
      color: '#207245'
    }
  },
  readAsDataURL (file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      // 读取完毕后获取结果
      reader.onload = event => {
        const fileIcon = this.FILE_ICON_MAP[file.type]

        resolve(fileIcon)
      }
      // 把文件对象作为一个 dataURL 读入
      reader.readAsDataURL(file)
    })
  },
  formatSize (size) {
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
}
