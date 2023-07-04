<template>
    <section class="room-tool">
        <svg-icon icon-class="video" title="视频" @click.stop="onChange(0)" />
        <svg-icon icon-class="folder" title="文件" @click.stop="onChange(1)" />
        <svg-icon icon-class="image" title="图片" @click.stop="onChange(2)" />

        <video-call :visible.sync="visible" />
    </section>
</template>

<script>
import VideoCall from './VideoCall.vue'
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
                    type: 'media',
                    value: 3,
                    callback: this.videoCall
                },
                1: {
                    type: 'message',
                    value: 4,
                    callback: this.uploadFile
                },
                2: {
                    type: 'message',
                    value: 1,
                    callback: this.uploadImage
                }
            }
        }
    },
    methods: {
        onChange (type) {
            this.toolsMap[type].callback().then((files) => {
                this.$emit('change', this.toolsMap[type])

                if (files) {
                    this.onUploadFile(files)
                }
            })
        },
        videoCall () {
            return new Promise((resolve, reject) => {
                this.visible = true
                resolve()
            })
        },
        uploadFile () {
            return new Promise((resolve, reject) => {
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