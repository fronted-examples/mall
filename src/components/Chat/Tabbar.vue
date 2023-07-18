<template>
    <section class="tabbar flex-column">
        <svg-icon 
            class="tabbar-item"
            :class="[tabbarIndex === index ? 'is-active' : '']"
            v-for="(tabbar, index) of tabbar" 
            :key="index" 
            :title="tabbar.label" 
            :icon-class="`${tabbarIndex === index ? tabbar.activeIcon : tabbar.icon}`"
            @click.stop="onClick(tabbar, index)" />
    </section>
</template>

<script>
export default {
    name: 'TabBar',
    props: {
        tabbar: {
            type: Array,
            default: []
        }
    },
    data () {
        return {
            tabbarIndex: 0
        }
    },
    methods: {
        onClick (tabbar, index) {
            this.tabbarIndex = index

            this.$emit('change', tabbar)
        }
    }
}
</script>

<style lang="scss" scoped>
.tabbar {
    width: 44px;
    height: 100%;

    .tabbar-item {
        width: 26px;
        height: 26px;
        cursor: pointer;
        margin-top: 10px;

        &.is-active {
            fill: green;
        }
    }
}
</style>