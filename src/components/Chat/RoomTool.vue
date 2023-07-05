<template>
    <section class="room-tool">
        <svg-icon icon-class="video" title="视频" @click.stop="onChange(0)" />
        <svg-icon icon-class="folder" title="文件" @click.stop="onChange(1)" />
        <svg-icon icon-class="image" title="图片" @click.stop="onChange(2)" />

        <video-call ref="video-call" :visible.sync="visible" />
    </section>
</template>

<script>
import VideoCall from './VideoCall.vue'

let WebRTC
if (process.env.VUE_ENV === 'client') {
  WebRTC = require('@/utils/web-rtc').WebRTC
}

export default {
    name: 'RoomTool',
    props: {
        onUploadFile: {
            type: Function,
            default: () => {},
            required: true
        }
    },
    components: {
        VideoCall
    },
    data () {
        return {
            visible: false,
            toolsMap: {
                0: {
                    type: 'video-call',
                    value: 3,
                    callback: this.openVideo
                },
                1: {
                    type: 'file',
                    value: 4,
                    callback: this.uploadFile
                },
                2: {
                    type: 'file',
                    value: 1,
                    callback: this.uploadImage
                }
            },
            webRTC: null
        }
    },
    methods: {
        onChange (type) {
            this.toolsMap[type].callback().then((data) => {
                const tool = this.toolsMap[type]

                if (tool.type === 'video-call') {
                    this.$emit('video-call', { chatType: 2, mediaMessageOperate: 0 })
                }

                if (tool.type === 'file') {
                    this.onUploadFile(data)
                    
                    this.$emit('change', tool)
                }
            })
        },
        openVideo () {
            return new Promise((resolve) => {
                this.visible = true

                this.webRTC = new WebRTC()
                this.webRTC.requestVideo().then((stream) => {
                    this.$refs['video-call'].addLocalVideoURL(stream)

                    this.webRTC.createConnection(stream, (remoteStream) => {
                        this.$refs['video-call'].addRemoteVideoURL(remoteStream)
                    }).then((data) => {
                        resolve(data)
                    })
                })
            })
        },
        launchOffer () {
            
        },
        uploadFile () {
            return new Promise((resolve) => {
                this.openFileSystem((files) => {
                    resolve(files)
                    this.$emit('onUploadFile', files)
                }, '*')
            })
        },
        uploadImage () {
            return new Promise((resolve, reject) => {
                this.openFileSystem((files) => {  
                    resolve(files) 
                    this.$emit('onUploadImage', files)
                })
            })
        },
        openFileSystem (callback, accept = ".jpg,.png") {
            const input = document.createElement('input')
            input.type = 'file'
            input.accept = accept
            input.multiple = true

            input.click()

            input.onchange = (e) => {
                let files = e.target.files

                if (Object.prototype.toString.call(callback) === '[object Function]') {
                    callback(files)
                    input.remove()
                }
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.room-tool {
    box-sizing: border-box;
    width: 100%;
    background-color: #fff;
    padding: 10px 24px;

    .svg-icon {
        margin-left: 20px;
        width: 24px;
        height: 24px;
        cursor: pointer;

        &:first-child {
            margin-left: 0;
        }
    }
}
</style>