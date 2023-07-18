<template>
    <section class="message-item">
        <div class="from flex-row" v-if="message.fromUser.userId === userInfo.userId">
            <div class="message-wrap flex-column">
                <span v-if="message.chatType === 1">{{ message.fromUser.username }}</span>
                <span class="message-content"
                        v-if="message.contentType === 0" v-html="message.content"></span>

                <img class="message-media"
                     v-if="message.contentType === 1"
                     :src="message.content"
                     @click.stop="downloadFile(message)" />

                <video class="message-media"
                       v-if="message.contentType === 2"
                       :src="message.content" 
                       muted
                       autoplay
                       @click.stop="downloadFile(message)" />

                <span class="message-file flex-inline"
                      v-if="message.contentType == 4"
                      @click.stop="downloadFile(message)">
                  <div class="file-info">
                    <div
                         class="file-name ellipsis-2">
                      {{message.filename}}</div>
                    <div class="file-size">
                      {{ formatSize(message.fileSize) }}
                    </div>
                  </div>

                  <svg-icon :style="{ color: fileIconMap[message.fileType].color }"
                            :icon-class="fileIconMap[message.fileType].icon" />
                </span>
            </div>

            <div class="avatar-wrap">
                <img :src="message.fromUser.avatar || defaultAvatar" alt="用户头像" />
            </div>
        </div>

        <div class="to flex-row" v-if="message.fromUser.userId !== userInfo.userId">
            <div class="avatar-wrap">
                <img :src="message.fromUser.avatar || defaultAvatar" alt="用户头像" />
            </div>

            <div class="message-wrap">
                <span v-if="message.chatType === 1">{{ message.fromUser.username }}</span>
                <span 
                    class="message-content"
                    v-if="message.contentType === 0">
                    {{ message.content }}
                </span>

                <img class="message-media"
                     v-if="message.contentType === 1"
                     :src="message.content" />

                <video class="message-media"
                       v-if="message.contentType === 2"
                       :src="message.content" 
                       muted
                       autoplay
                       @click.stop="downloadFile(message)" />

                <span class="message-file flex-inline"
                      v-if="message.contentType == 4"
                      @click.stop="downloadFile(message)">
                  <div class="file-info">
                    <div
                        class="file-name ellipsis-2">
                      {{ message.filename }}
                    </div>
                    <div class="file-size">
                      {{ formatSize(message.fileSize) }}
                    </div>
                  </div>

                  <svg-icon 
                        :style="{ color: fileIconMap[message.fileType].color }"
                        :icon-class="fileIconMap[message.fileType].icon" />
                </span>
            </div>
        </div>
    </section>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    name: 'MessageItem',
    props: {
        message: {
            type: Object,
            default: () => ({})
        }
    },
    computed: {
        ...mapGetters('user', ['userInfo', 'accessToken']),
        imagePrefix () {
            return process.env.IMAGE_PREFIX
        },
        defaultAvatar () {
            return `${this.imagePrefix}/user-management/image/default_avatar.svg`
        },
        fileIconMap () {
            return this.$file.FILE_ICON_MAP
        },
        formatSize () {
            return this.$file.formatSize
        }
    },
    methods: {
        downloadFile (file) {
            console.log(file)
            const params = {
                filename: file.filename,
                size: file.fileSize,
                type: file.fileType
            }

            this.$emit('download', params)
        }
    }
}
</script>

<style lang="scss" scoped>
.message-item {
    .avatar-wrap {
        width: 32px;
        height: 32px;
        border-radius: 50%;
        img {
            width: 100%;
            height: 100%;
        }
    }

    .message-wrap {
        .message-content,
        .message-file {
            display: inline-block;
            box-sizing: border-box;
            padding: 8px 12px;
            min-width: 50px;
            min-height: 35px;
            line-height: 22px;
            background-color: #383c4b;
            border-radius: 5px;
            font-size: 15px;
            color: #fff;
            word-break: break-word;
            position: relative;
            &::after {
                content: '';
                display: inline-block;
                width: 0;
                height: 0;
                border: 5px solid transparent;
                border-right: 5px solid #383c4b;
                position: absolute;
                top: 50%;
                left: -10px;
                transform: translateY(-50%);
            }
        }

        .message-file {
            cursor: pointer;
        }

        .message-media {
          max-width: 120px;
          max-height: 180px;
          border-radius: 4px;
          object-fit: contain;
          cursor: pointer;
        }

        .file-info {
          margin-right: 5px;
          .file-name {
            font-size: 16px;
            color: #fff;
            max-width: 150px;
          }
          .file-size {
            font-size: 12px;
            font-weight: 300;
            color: #c0c4cc;
          }
        }

        .svg-icon {
          width: 32px;
          height: 32px;
        }
    }

    .from, .to {
        box-sizing: border-box;
        width: 100%;
        padding: 10px 20px;
        .message-wrap {
            margin-left: 10px;
        }
    }

    .from {
        justify-content: flex-end;
        .message-wrap {
            margin-right: 10px;

            .message-content {
                background-color: #1d90f5;
                &::after {
                    border: 5px solid transparent;
                    border-right: 0 solid transparent;
                    border-left: 5px solid #1d90f5;
                    right: -5px;
                    left: auto;
                }
            }

            .message-file {
                background-color: #383c4b;
                max-width: 250px;
                &::after {
                  border: 5px solid transparent;
                  border-right: 0 solid transparent;
                  border-left: 5px solid #383c4b;
                  position: absolute;
                  right: -5px;
                  left: auto;
                }
            }
        }
    }
}
</style>