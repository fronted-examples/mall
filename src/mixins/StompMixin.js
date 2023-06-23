import SockJS from 'sockjs-client/dist/sockjs.min.js'
import Stomp from 'stompjs'
import store from '@/store/index'

const DEFAULT_URL = process.env.VUE_APP_API_SOCKET_URL

const stomp = {
  data () {
    return {
      websocket: null,
      stompClient: null,
      checkInterval: null
    }
  },
  methods: {
    stompInit (success = function () { }, fail = function () { }, url = DEFAULT_URL) {
      if (this.stompClient == null || !this.stompClient.connected) {
        if (this.stompClient != null && this.websocket.readyState === SockJS.OPEN) {
          this.stompClient.disconnect(() => {
            this.stompConnect(url, success, fail)
          })
        } else if (this.stompClient != null && this.websocket.readyState === SockJS.CONNECTING) {
          console.log('连接正在建立')
          return null
        } else {
          this.stompConnect(url, success, fail)
        }
        if (!this.checkInterval) {
          this.checkInterval = setInterval(() => {
            console.log('检测连接：' + this.websocket.readyState)
            if (this.stompClient != null && this.stompClient.connected) {
              clearInterval(this.checkInterval)
              this.checkInterval = null
              console.log('重连成功')
            } else if (this.stompClient != null && this.websocket.readyState !== SockJS.CONNECTING) {
              // 经常会遇到websocket的状态为open 但是stompClient的状态却是未连接状态，故此处需要把连接断掉 然后重连
              this.stompClient.disconnect(() => {
                this.stompConnect(url, success, fail)
              })
            }
          }, 2000)
        }
      } else {
        console.log('连接已建立成功，不再执行')

        return this.stompClient
      }
    },
    /**
     *
     * @param {String} url
     */
    stompConnect (url, success, fail) {
      this.websocket = new SockJS(url)
      // 获取STOMP子协议的客户端对象
      this.stompClient = Stomp.over(this.websocket)

      this.stompClient.debug = false
      this.stompClient.heartbeat.outgoing = 5000 // 前端对后台连接心跳监控间隔
      this.stompClient.heartbeat.incoming = 0 // 后台对前端心跳监控，若为0则不进行心跳监控

      const headers = {
        Authorization: `Bearer ${store.getters['user/token']}`
      }

      // 向服务器发起websocket连接
      this.stompClient.connect(
        headers, // 此处注意更换自己的用户名，最好以参数形式带入
        frame => {
          console.log('链接成功！')
          success({ frame: frame, stompClient: this.stompClient })
        },
        // 第一次连接失败和连接后断开连接都会调用这个函数 此处调用重连
        err => {
          console.error(err)
          fail(err)
          setTimeout(() => {
            this.stompInit(success, fail, url)
          }, 1000)
        }
      )
    }
  }
}

export default stomp
