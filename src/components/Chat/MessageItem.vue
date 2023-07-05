<template>
    <section class="message-item">
        <div class="from flex-row" v-if="message.fromUser.userId === userInfo.userId">
            <div class="message-wrap flex-column">
                <span v-if="message.chatType === 1">{{ message.fromUser.username }}</span>
                <span class="message-content"
                        v-if="message.contentType === 0">{{ message.content }}</span>
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
                <span class="message-content"
                        v-if="message.contentType === 0">{{ message.content }}</span>
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
        defaultAvatar () {
            return `${process.env.IMAGE_PREFIX}/user-management/image/default_avatar.svg`
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
        .message-content {
            display: inline-block;
            box-sizing: border-box;
            padding: 8px 10px;
            min-width: 50px;
            min-height: 35px;
            line-height: 19px;
            background-color: #fff;
            border-radius: 5px;
            font-size: 12px;
            margin-left: 10px;
            position: relative;
            &::after {
                content: '';
                display: inline-block;
                width: 0;
                height: 0;
                border: 5px solid transparent;
                border-right: 5px solid #fff;
                position: absolute;
                top: 50%;
                left: -9px;
                transform: translateY(-50%);
            }
        }
    }

    .from, .to {
        box-sizing: border-box;
        width: 100%;
        padding: 10px 20px;
    }

    .from {
        justify-content: flex-end;
        .message-wrap {
            margin-right: 10px;

            .message-content {
                background-color: #99cc66;
                &::after {
                    border: 5px solid transparent;
                    border-right: 0 solid transparent;
                    border-left: 5px solid #99cc66;
                    left: inherit;
                    right: -5px;
                }
            }
        }
    }
}
</style>