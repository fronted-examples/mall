<template>
    <section class="room-header flex-row main-between secondary-center">
        <div class="left" v-if="!$slots.header"></div>
        <div class="middle" v-if="!$slots.header">
            <span class="title">{{ title }}</span>
        </div>
        <div class="right" v-if="!$slots.header">
            <svg-icon v-if="closable" icon-class="close" />
        </div>

        <slot name="header"></slot>
    </section>
</template>

<script>
export default {
    name: 'RoomHeader',
    props: {
        title: String,
        closable: Boolean
    }
}
</script>

<style lang="scss" scoped>
.room-header {
    box-sizing: border-box;
    width: 100%;
    height: 60px;
    padding: 0 10px 0;

    .left, .middle, .right {
        height: 100%;
    }

    .left {
        width: 20%;
    }

    .middle {
        width: 60%;
        text-align: center;
        line-height: 60px;
        .title {
            font-size: 24px;
            font-weight: bold;
            color: #fff;
        }
    }

    .right {
        width: 20%;
        .svg-icon {
            width: 18px;
            height: 18px;
            cursor: pointer;
        }
    }
}
</style>