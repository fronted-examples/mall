<template>
    <section class="room-content">
        <slot></slot>
    </section>
</template>

<script>
export default {
    name: 'RoomContent',
    methods: {
        toBottom () {
            this.$nextTick(() => {
                const listContainer = document.querySelector('.room-content')
                listContainer.scrollTop = listContainer.scrollHeight
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.room-content {
    box-sizing: border-box;
    width: 100%;
    height: 350px;
    overflow: auto;
    background-color: #323644;
    border-radius: 8px 8px 0 0;
    border-left: 15px solid transparent;
    border-right: 15px solid transparent;
}
</style>