<template>
    <section class="video-call"
            v-if="visible"
            v-drag.outRange.fixed>
        <video class="local-video"
                autoplay 
                playsinline></video>
        <video class="remote-video" 
            playsinline
            autoplay></video>

        <div class="video-operates">
            <span class="video-btn"
                @click.stop="onHang">
            <svg-icon icon-class="hang" />
            <label>挂断</label>
            </span>
        </div>
    </section>
</template>

<script>
export default {
    name: 'VideoCall',
    props: {
        visible: Boolean
    },
    data () {
        return {
            
        }
    },
    methods: {
        onHang () {
            this.$emit('update:visible', false)
            this.$emit('hang')
        },
        addLocalVideoURL (stream) {
            this.setVideoURL('.local-video', stream)
        },
        addRemoteVideoURL (stream) {
            this.setVideoURL('.remote-video', stream)
        },
        setVideoURL (elementId, stream) {
            if (Object.prototype.toString.call(stream) !== '[object MediaStream]') {
                throw new Error('stream type must be [object MediaStream]')
            }

            const video = document.querySelector(elementId)

            // Older brower may have no srcObject
            if ('srcObject' in video) {
                video.srcObject = stream
            } else {
                // 防止在新的浏览器里使用它，应为它已经不再支持了
                video.src = window.URL.createObjectURL(stream)
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.video-call {
    position: fixed;
    width: 300px;
    height: 480px;
    z-index: 8;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 9999;
    .remote-video {
        width: 300px;
        height: 360px;
        display: block;
        object-fit: cover;
        border: 1px solid #eee;
        background-color: #f2f6fc;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-30%, -85%) scale(0.5, 0.25);
        z-index: 99999;
    }

    .local-video {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 300px;
        height: 480px;
        object-fit: cover;
        border: 1px solid #eee;
        background-color: #ebeef5;
        z-index: 99999;
    }

    .video-operates {
        position: absolute;
        width: 300px;
        bottom: 50px;
        z-index: 99;
        font-size: 35px;
        text-align: center;
        z-index: 99999;
        .video-btn {
            width: 60px;
            height: 60px;
            color: #f5222d;
            display: inline-flex;
            flex-direction: column;
            align-items: center;
            cursor: pointer;
            label {
                font-size: 14px;
                color: #fff;
                margin-top: -5px;
                cursor: pointer;
            }
            &:hover {
                background-color: rgba(0, 0, 0, 0.2);
                border-radius: 50%;
            }
        }
    }
}
</style>