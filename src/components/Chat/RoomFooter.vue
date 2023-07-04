<template>
    <section class="room-footer">
        <el-input type="textarea" rows="3" resize="none" maxlength="500" autofocus v-model="message" />
        <el-button :disabled="!message" :type="message ? 'primary':'info'" @click.stop="onSend">发送</el-button>
    </section>
</template>

<script>
export default {
    name: 'RoomFooter',
    data () {
        return {
            message: ''
        }
    },
    methods: {
        onSend () {
            this.$emit('send', this.message)
            this.message = ''
        }
    }
}
</script>

<style lang="scss" scoped>
.room-footer {
    box-sizing: border-box;
    width: 100%;
    height: 150px;
    background-color: #fff;
    padding: 0 10px;

    .el-textarea {
        width: 100%;
        box-sizing: border-box;

        &::v-deep .el-textarea__inner {
            border: none;
            background-color: #f2f3f5;
        }
    }

    .el-button {
        width: 100px;
        border-radius: 25px;
        font-size: 14px;
        float: right;
        margin-top: 10px;
        &::after {
            content: '';
            display: block;
            clear: both;
        }
    }
}
</style>