const DEFAULT_ICE_SERVERS = {
    iceServers: [
      { url: 'stun:stun.l.google.com:19302' }, // 谷歌的公共服务
      {
        url: 'turn:101.35.44.70:3478',
        credential: '123456',
        username: 'admin'
      }
    ],
    sdpSemantics: 'plan-b'
}

navigator.getUserMedia = navigator.getUserMedia || navigator.mozGetUserMedia || navigator.webkitGetUserMedia
window.RTCPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection
window.RTCIceCandidate = window.RTCIceCandidate || window.mozRTCIceCandidate || window.webkitRTCIceCandidate
window.RTCSessionDescription = window.RTCSessionDescription || window.mozRTCSessionDescription || window.webkitRTCSessionDescription

export function WebRTC () {
    this.peerConn = null
}

WebRTC.prototype.requestVideo = function () {
    return new Promise((resolve, reject) => {
      navigator.mediaDevices
        .getUserMedia({ audio: true, video: true })
        .then((stream) => {
          resolve(stream)
        })
        .catch((error) => {
            reject(error)
        })
    })
}

WebRTC.prototype.addVideoURL = function (elementId, stream) {
    const video = document.querySelector(elementId)

    if (Object.prototype.toString.call(stream) !== '[object MediaStream]') {
        throw new Error('stream type must be [object MediaStream]')
    }

    // Older brower may have no srcObject
    if ('srcObject' in video) {
      video.srcObject = stream
    } else {
      // 防止在新的浏览器里使用它，应为它已经不再支持了
      video.src = window.URL.createObjectURL(stream)
    }
}

WebRTC.prototype.createConnection = function (localStream, callback) {
    if (Object.prototype.toString.call(localStream) !== '[object MediaStream]') {
        throw new Error('localStream type must be [object MediaStream]')
    }

    return new Promise((resolve) => {
        this.peerConn = new RTCPeerConnection(DEFAULT_ICE_SERVERS)

        this.peerConn.addStream(localStream)
        this.peerConn.onaddstream = (e) => {
            if (Object.prototype.toString.call(callback) === '[object Function]') {
                callback(e.stream)
            }
        }

        this.peerConn.onicecandidate = event => {
            if (event.candidate) {
                resolve({
                    type: 'candidate',
                    candidate: event.candidate,
                    mediaMessageOperate: 6
                })
            }
        }
    })   
}

WebRTC.prototype.createOffer = function () {
    return new Promise((resolve, reject) => {
        this.peerConn.createOffer(
            offer => {
              this.peerConn.setLocalDescription(offer)

              resolve({
                type: 'offer',
                offer: offer,
                mediaMessageOperate: 4
              })
            },
            error => {
              console.error(error)

              reject(error)
            }
        )
    })
}

WebRTC.prototype.createAnswer = function (offer) {
    return new Promise((resolve, reject) => {
        this.peerConn.setRemoteDescription(new RTCSessionDescription(offer))

        // Create an answer to an offer
        this.peerConn.createAnswer(
            answer => {
                this.peerConn.setLocalDescription(answer)

                resolve({
                    type: 'answer',
                    answer: answer,
                    mediaMessageOperate: 5
                })
            },
            error => {
                console.error(error)
                reject(error)
            }
        )
    })
}

WebRTC.prototype.handleAnswer = function (answer) {
    this.peerConn.setRemoteDescription(new RTCSessionDescription(answer))
}

WebRTC.prototype.handleCandidate = function (candidate) {
    // ClientB 通过 PeerConnection 的 AddIceCandidate 方法保存起来
    this.peerConn.addIceCandidate(new RTCIceCandidate(candidate))
}

WebRTC.prototype.closeWebRTC = function (stream) {
    return new Promise((resolve) => {
        console.log('this: ', this)
        this.peerConn.close()
        this.peerConn.onicecandidate = null
        this.peerConn.onaddstream = null

        this.closeTracks(stream)

        resolve({
            type: 'hang',
            mediaMessageOperate: 3
        })
    })
}

WebRTC.prototype.closeTracks = function (stream) {
    if (Object.prototype.toString.call(stream) !== '[object MediaStream]') {
        throw new Error('stream type must be [object MediaStream]')
    }

    const tracks = stream.getTracks()

      for (let i = 0; i < tracks.length; i++) {
        tracks[i].stop()
      }
}