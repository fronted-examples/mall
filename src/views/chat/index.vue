<template>
  <section class="chat flex-row">
    <div class="side">
      <address-book :contactorList="userList" @change="onChangeContactor" />
    </div>

    <div class="room">
      <room-header title="测试" />
      <room-content ref="message-list">
        <message-item v-for="message of messageList" :key="message.messageId" :message="message" />
      </room-content>
      <room-tool ref="room-tool" :on-upload-file="fileChange" @change="onSelectMessageType" @video-call="onVideoCall" @hang="onVideoHang" @candidate="onVideoCandidate" @offser="onVideoOffer" />
      <room-footer @send="onSend" />
    </div>
  </section>
</template>

<script>
import { getUserListByKeyword, downloadFile, sendSingleMessage } from '@/apis'
import { Uploader } from '@/utils/simple-upload'
import { Download } from '@/utils/simple-download'
import { AddressBook, RoomHeader, RoomContent, RoomTool, RoomFooter, MessageItem } from '@/components/Chat'
import StompMixin from '@/mixins/StompMixin'
import { mapGetters } from 'vuex'

export default {
  name: 'Chat',
  mixins: [StompMixin],
  components: {
    AddressBook,
    RoomHeader,
    RoomContent,
    RoomTool,
    RoomFooter,
    MessageItem
  },
  data () {
    return {
      userList: [],
      messageList: [],
      message: {
        chatType: null,
        mediaMessageOperate: null,
        fromUser: {
          userId: null,
          avatar: '',
          username: ''
        },
        toUser: {
          userId: null,
          avatar: '',
          username: ''
        },
        content: '',
        contentType: null,
        fileId: null,
        filename: '',
        fileSize: '',
        fileType: null,
        offer: null,
        answer: null,
        candidate: null
      },
      contactor: null,
      stompClient: null,
      fileContentList: [],
      cancels: [],
      uploadedSize: 0
    }
  },
  computed: {
    ...mapGetters('user', ['userInfo', 'accessToken'])
  },
  watch: {
    messageList () {
      this.$nextTick(() => {
        this.$refs['message-list'].toBottom()
      })
    }
  },
  created () {
    this.initData()
  },
  beforeDestroy () {
    if (this.stompClient) {
      this.stompClient.disconnect()
    }
  },
  methods: {
    initData () {
      this.getUserListByKeyword().then(({ userList }) => {
        this.userList = userList

        this.userList.forEach((user) => {
          user.avatar = user.avatar || `${process.env.IMAGE_PREFIX}/user-management/image/default_avatar.svg`
          user.nickname = user.nickname || user.username
        })

        if (process.env.VUE_ENV === 'client') {
          this.contactor = this.userList[0]
          this.initStompClient()
        }
      })
    },
    onChangeContactor (contactor) {
      this.contactor = contactor
      this.messageList = []
    },
    onVideoCall (val) {
      this.setMessage(val)

      this.sendSingleMessage()
    },
    onVideoHang (val) {
      this.setMessage(val)

      this.sendSingleMessage()
    },
    onVideoCandidate (val) {
      this.setMessage(val)

      this.sendSingleMessage()
    },
    onVideoOffer (val) {
      this.setMessage(val)

      this.sendSingleMessage()
    },
    onSelectMessageType (tool, data) {
      if (tool.type === 'media') {
        this.message.chatType = tool.value
        this.message.offer = data.offer
        this.message.candidate = data.candidate
        this.message.answer = data.answer
        this.message.mediaMessageOperate = data.mediaMessageOperate
        
        this.setMessage()

        this.sendSingleMessage()
      }

      if (tool.type === 'file') {
        this.message.contentType = tool.value
      }
    },
    async fileChange (files) {
      console.log('imageChange: ', files, files.length)
      if (files.length === 0) {
        return this.$notify({
          type: 'error',
          message: '请选择图片！',
          customClass: 'message-content',
          duration: 0
        })
      }

      this.uploader = new Uploader({
        files: files,
        language: 'EN',
        beforeUpload: (uploader) => {
          console.log('回调uploader', uploader)

          for (let i = 0; i < uploader.fileList.length; i++) {
            uploader.fileList[i].start(function (file) {
              console.log('开始之后的回调：', file)
            })
          }
        },
        uploading: (file) => {
          console.log('回调uploading', file)
        },
        uploadSuccess: (file) => {
          console.log('回调uploadSuccess', file)
          this.$file.readAsDataURL(file).then(() => {
            this.message.content = `${process.env.IMAGE_PREFIX}${file.url}`
            
            this.setMessage(file)

            this.sendSingleMessage()
          })
        },
        uploadFailed: function (file) {
          console.log('回调uploadFailed', file)
        }
      })

      console.log('this.uploader: ', this.uploader)
    },
    handleDownload (file) {
      this.fileContentList = []
      console.log('下载文件：', file)

      const files = []
      files.push(file)

      this.download = new Download({
        files: files,
        downloadUrl: '/user-management-service/minio/downloadFile',
        headers: {
          'Authorization': `Bearer ${this.accessToken}`
        },
        beforeDownload: (download) => {
          for (let i = 0; i < download.fileList.length; i++) {
            download.fileList[i].start({
              target: this.downloadFile,
              success: (file) => {
                console.log('下载成功：', file)
                console.log('排序后的：', this.$sort.objectDescSort(file.blobList.map((blob) => ({ offset: blob.headers['content-range'], blob: blob.data }))))
                const blob = new Blob(this.$sort.objectDescSort(file.blobList.map((blob) => ({ offset: blob.headers['content-range'], blob: blob.data }))).map(item => item.blob))

                console.log('blob: ', blob)

                if ('download' in document.createElement('a')) {
                  // 支持a标签download的浏览器
                  const link = document.createElement('a') // 创建a标签
                  link.download = file.filename // a标签添加属性
                  link.style.display = 'none'
                  link.href = URL.createObjectURL(blob)
                  link.click() // 执行下载
                  URL.revokeObjectURL(link.href) // 释放url
                  link.remove()
                  // document.body.removeChild(link) // 释放标签
                } else {
                  // 其他浏览器
                  navigator.msSaveBlob(blob, this.filename)
                }
              },
              fail: function (file) {
                console.log('下载失败：', file)
              }
            })
          }
        },
        downloading: function (file) {
          console.log('下载中：', file)
        }
      })
    },
    onSend (message) {
      this.message.chatType = 0
      this.message.content = message
      this.message.contentType = 0

      this.setMessage()

      this.sendSingleMessage()
    },
    setMessage (data) {
      this.message.fromUser.userId = this.userInfo.userId
      this.message.fromUser.username = this.userInfo.username
      this.message.toUser.userId = this.contactor.userId
      this.message.toUser.username = this.contactor.username

      
      this.message.chatType = data.chatType
      this.message.mediaMessageOperate = data.mediaMessageOperate
      this.message.offer = data.offer
      this.message.answer = data.answer
      this.message.candidate = data.candidate

      this.message.filename = data.name
      this.message.fileType = data.type
      this.message.fileSize = data.size
      this.message.fileId = data.id

      if (data.type && data.type.indexOf('image') !== -1) {
        this.message.contentType = 1
      }

      if (data.type && data.type.indexOf('video') !== -1) {
        this.message.contentType = 2
      }
    },
    initStompClient: function () {
      this.stompInit(({ frame, stompClient }) => {
        console.log('frame: ', frame, stompClient)
        this.stompClient = stompClient

        stompClient.subscribe(`/queue/${this.userInfo.userId}/single`, res => {
          console.info('订阅点对点消息: ', JSON.parse(res.body))
          const data = JSON.parse(res.body)

          if (data.chatType === 0) {
            if (this.contactor.userId !== this.userInfo.userId) {
              this.messageList.push(data)
            }
          }

          console.log('messageList: ', this.messageList)

          if (data.chatType === 2) {
            this.chatType = data.chatType
            if (data.mediaMessageOperate === 0) {
              this.$confirm(`${data.fromUser.username}邀请您进行通话, 是否接听?`, '提示', {
                confirmButtonText: '接听',
                cancelButtonText: '拒绝',
                type: 'warning'
              }).then(() => {
                this.$refs['room-tool'].launchOffer()
              }).catch((err) => {
                console.error(err)
                
                this.setMessage({
                  chatType: data.chatType,
                  mediaMessageOperate: 2,
                  offer: data.offer,
                  answer: data.answer,
                  candidate: data.candidate
                })

                this.sendSingleMessage()
              })
            }

            if (data.mediaMessageOperate === 1) {
              this.$refs['room-tool'].replyOffer(this.offer)
            }

            if (data.mediaMessageOperate === 2) {
              this.$message.error('对方已拒绝！')
              this.$refs['room-tool'].handleHang()
            }

            if (data.mediaMessageOperate === 3) {
              this.$message.warning('对方已挂断！')
              this.$refs['room-tool'].handleHang()
            }

            if (data.mediaMessageOperate === 4) {
              this.$refs['room-tool'].replyOffer(data.offer)
            }

            if (data.mediaMessageOperate === 5) {
              this.$refs['room-tool'].handleAnswer(data.answer)
            }

            if (data.mediaMessageOperate === 6) {
              this.$refs['room-tool'].handleCandidate(data.candidate)
            }
          }
        })
      }, (err) => {
        console.log('err: ', err)
      })
    },
    getUserListByKeyword () {
      return new Promise((resolve, reject) => {
        getUserListByKeyword()
          .then(({ code, data }) => {
            if (code === 200) {
              resolve(data)
            }
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    downloadFile (filename, offset, offsetLength, onCancel, onDownloadProgress, file, chunkIndex) {
      return new Promise((resolve, reject) => {
        const params = {
          filename,
          offset,
          offsetLength
        }

        downloadFile(params, onCancel(file), (event) => {
          onDownloadProgress(event, file, chunkIndex)
        }).then((res) => {
          console.log('res: ', res)
          this.filename = res.headers['content-disposition'].split(';')[1].split('=')[1]

          const params = {
            offset: parseInt(res.headers['content-range']),
            blob: res.data
          }

          this.fileContentList.push(params)

          resolve(res)
        }).catch((err) => {
          console.log('err: ', err)
          reject(err)
        })
      })
    },
    sendSingleMessage () {
      const params = {
        chatType: this.message.chatType,
        mediaMessageOperate: this.message.mediaMessageOperate,
        fromUserId: this.message.fromUser.userId,
        toUserId: this.message.toUser.userId,
        content: this.message.content,
        contentType: this.message.contentType,
        fileId: this.message.fileId,
        filename: this.message.filename,
        fileSize: this.message.fileSize,
        fileType: this.message.fileType,
        offer: this.message.offer,
        answer: this.message.answer,
        candidate: this.message.candidate
      }

      if (this.message.chatType === 0) {
        this.messageList.push(this.message)
      }

      console.log('messageList: ', this.messageList, this.message.chatType)

      return new Promise((resolve, reject) => {
        sendSingleMessage(params).then(({ code }) => {
          if (code === 200) {
            resolve()
          }
        }).catch((err) => {
          reject(err)
        })
      })
    },
  }
}
</script>

<style lang="scss" scoped>
.chat {
  width: 1200px;
  margin: 20px auto 0;
  position: sticky;
  top: 80px;
  .side {
    width: 240px;
    height: fit-content;
    display: flex;
    flex-direction: column;
  }
  .room {
    margin-left: 20px;
    width: calc(1200px - 260px);
  }
}
</style>

<style>
.message-content .el-notification__content {
  margin: 0;
}
</style>