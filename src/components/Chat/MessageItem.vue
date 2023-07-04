<template>
    <section class="message-item">
        <div class="avatar-wrap">
            <img :src="message.fromUser.avatar" alt="用户头像" />
        </div>

        <div class="message-wrap">
            <span>{{ message.fromUser.username }}</span>
            <span class="message-content"
                      v-if="message.contentType === 0">{{ message.content }}</span>
        </div>
    </section>
</template>

<script>
export default {
    name: 'MessageItem',
    props: {
        message: {
            type: Object,
            default: () => ({})
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
}
</style>