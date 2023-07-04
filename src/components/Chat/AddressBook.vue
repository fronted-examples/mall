<template>
    <section class="contactor-list">
        <section 
            class="contactor-item flex-row main-between secondary-center"
            :class="[currentContactor.userId === contactor.userId ? 'is-active' : '']"
            v-for="contactor of contactorList" 
            :key="contactor.userId" 
            @click.stop="onClick(contactor)">
            <div class="avatar-wrap">
                <img :src="contactor.avatar" alt="用户头像" />
            </div>

            <div class="contactor-info">
                <span class="nickname ellipsis-1">{{ contactor.nickname }}</span>
                <svg-icon icon-class="dot" />
            </div>
        </section>
    </section>
</template>

<script>
export default {
    name: 'AddressBook',
    props: {
        contactorList: {
            type: Array,
            default: () => ([])
        }
    },
    data () {
        return {
            currentContactor: {}
        }
    },
    watch: {
        contactorList: {
            handler(newVal) {
                this.currentContactor = newVal[0]
            },
            immediate: true
        }
    },
    methods: {
        onClick (contactor, index) {
            this.currentContactor = contactor

            this.$emit('change', contactor, index)
        }
    }
}
</script>

<style lang="scss" scoped>
.contactor-list {
    border-radius: 5px;
    max-height: calc(100vh - 101px);
    background-color: #fff;
    overflow: auto;
    .contactor-item {
        box-sizing: border-box;
        padding: 10px 24px;
        cursor: pointer;
        position: relative;

        &:not(:last-child) {
            border-bottom: 1px solid #ebebeb;
        }
        &.is-active {
            background-color: #b3d8ff;
            &::after {
                content: '';
                display: inline-block;
                width: 5px;
                height: 100%;
                position: absolute;
                left: 0;
                background-color: #409eff;
            }

            &:first-child {
                border-top-left-radius: 5px;
                border-top-right-radius: 5px;
                &::after {
                    border-top-left-radius: 5px;
                }
            }

            &:last-child {
                border-bottom-left-radius: 5px;
                border-bottom-right-radius: 5px;
                &::after {
                    border-bottom-left-radius: 5px;
                }
            }
        }

        .avatar-wrap {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            img {
                width: 100%;
                height: 100%;
            }
        }
        .contactor-info {
            width: 120px;
            margin-left: 10px;
            position: relative;
            .nickname {
                display: block;
                font-size: 18px;
                color: #222;
            }
            .svg-icon {
                width: 22px;
                height: 22px;
                color: #F5260B;
                position: absolute;
                top: -10px;
                right: 0;
            }
        }

    }
}
</style>
