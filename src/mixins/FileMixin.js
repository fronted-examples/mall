import SparkMD5 from 'spark-md5'

/**
 * 注意：本api不受分片顺序影响
 * 关于上传文件成功后的处理：配置minio监听指定存储桶指定格式文件上传成功后，push通知到mq,后端程序监听并消费即可
 * （建议上传mp4，成功后可以直接在页面看到效果）
 * 测试分片上传
 *      运行页面 > 打开控制台 > console > 选择上传的文件 > 观察打印的信息
 * 测试秒传
 *      在上一个测试的基础上，刷新一下页面，选择上一次上传的文件
 * 测试断点续传
 *      重新选择一个文件(如果你没有多的测试文件，就重启一下后台服务) > 手动模拟上传了一部分失败的场景(在所有分片未上传完成时关掉页面 或 注释掉合并文件代码，然后去 minio chunk桶 删除几个分片)
 *      > 再选择刚选择的文件上传 > 观察打印的信息是否从缺失的分片开始上传
 */
const index = {
  data () {
    this.fileMd5 = ''
    this.chunkCount = 0
    this.fileName = ''
    this.bucketName = 'user-management'

    return {}
  },
  methods: {
    // 提示信息
    toastInfo (message, messageType = 'success') {
      return this.$message[messageType](message)
    },
    /**
     * 将 blob 或 file 转成 DataURL（base64） 形式
     * @param {*} blob
     * @returns
     */
    fileReader (blob) {
      return new Promise((resolve, reject) => {
        let reader = new FileReader()
        reader.onload = (e) => {
          resolve(e.target.result)
        }
        reader.readAsDataURL(blob)
      })
    },
    /**
     * 获取文件MD5
     * @param file
     * @returns {Promise<unknown>}
     */
    getFileMd5 (file) {
      let fileReader = new FileReader()
      fileReader.readAsBinaryString(file)
      let spark = new SparkMD5()
      return new Promise((resolve) => {
        fileReader.onload = (e) => {
          spark.appendBinary(e.target.result)
          resolve(spark.end())
        }
      })
    }
  }
}

export default index
