<template>
    <section class="contactor-list">
        <section class="contactor-header flex-row">
            <div class="input-group" :class="[!listVisible ? 'is-active' : '']">
                <i class="el-icon-search"></i>
                <input type="text" placeholder="搜索" v-model="keyword" @click.stop="onInputClick" @change.stop="onChange" />
                <i v-if="!listVisible" class="el-icon-error" @click.stop="onClear"></i>
            </div>

            <i class="add-btn el-icon-plus"></i>
        </section>

        <template v-if="!listVisible">
            <section class="reslut-list">
                <div class="recent">
                    <label>
                        最近搜索
                    </label>
                    <span v-for="(recent, index) of recentList" :key="index">{{ recent.nickname }}</span>
                </div>

                <div class="result-item" v-for="(reslut, index) of searchList" :key="index">
                    <span>{{ reslut.nickname }}</span>
                </div>
            </section>
        </template>

        <template 
            v-if="listVisible">
            <section 
                class="contactor-item flex-row secondary-center"
                :class="[currentContactor.userId === contactor.userId ? 'is-active' : '']"
                v-for="contactor of contactorList" 
                :key="contactor.userId" 
                @click.stop="onContactorClick(contactor)">
                <div class="avatar-wrap">
                    <img :src="contactor.avatar" alt="用户头像" />
                </div>

                <div class="contactor-info">
                    <span class="nickname ellipsis-1">{{ contactor.nickname }}</span>
                    <svg-icon icon-class="dot" />
                </div>
            </section>
        </template>
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
            currentContactor: {},
            listVisible: true,
            keyword: '',
            recentList: [],
            searchList: []
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
        onInputClick () {
            this.listVisible = false
        },
        onClear () {
            this.keyword = ''
            this.listVisible = true
            this.searchList = []
        },
        onContactorClick (contactor, index) {
            this.currentContactor = contactor

            this.$emit('change', contactor, index)
        }
    }
}
</script>

<style lang="scss" scoped>
.contactor-list {
    border-radius: 5px;
    height: 100%;
    max-height: calc(100vh - 101px);
    overflow-y: auto;
    .contactor-header {
        margin-bottom: 10px;
        .input-group {
            width: 200px;
            height: 25px;
            display: flex;
            align-items: center;
            background-color: #ddd;
            box-sizing: border-box;
            padding: 4px 8px;
            border-radius: 6px;

            &.is-active {
                background-color: #fff;
            }

            i {
                font-size: 15px;
                &:first-child {
                    color: #666;
                }
                &:last-child {
                    color: #bbb;
                    cursor: pointer;
                    &:hover {
                        color: #666;
                    }
                }
            }

            input {
                width: 86.6%;
                background-color: transparent;
                outline: none;
                border: none;

                &::placeholder {
                    color: #666;
                }
            }
        }

        .add-btn {
            margin-left: 8px;
            display: inline-block;
            width: 25px;
            height: 25px;
            line-height: 25px;
            border-radius: 6px;
            background-color: #ddd;
            cursor: pointer;
            font-size: 16px;
            color: #121212;
            text-align: center;
        }
    }

    .reslut-list {
        .recent {
            color: #666;
            font-size: 14px;
        }

        .result-item {
            width: 100%;
            height: 25px;
        }
    }
    .contactor-item {
        box-sizing: border-box;
        padding: 10px 8px;
        cursor: pointer;
        position: relative;

        &:not(:last-child) {
            border-bottom: 1px solid transparent;
        }

        &.is-active {
            background-color: #323644;
            border-radius: 5px;
            &::after {
                content: '';
                display: inline-block;
                width: 5px;
                height: 100%;
                position: absolute;
                left: 0;
                background-color: transparent;
            }
        }

        .avatar-wrap {
            width: 35px;
            height: 35px;
            border-radius: 50%;
            img {
                width: 100%;
                height: 100%;
            }
        }
        .contactor-info {
            width: calc(100% - 45px);
            margin-left: 10px;
            .nickname {
                display: block;
                font-size: 15px;
                color: #fff;
                line-height: 1.6;
            }
            .svg-icon {
                width: 22px;
                height: 22px;
                color: #F5260B;
                position: absolute;
                top: 0;
                left: 35px;
            }
        }

    }
}
</style>
