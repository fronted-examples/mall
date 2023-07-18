<template>
    <section class="chat-contacts">
        <div class="side">
            <section class="contactor-header flex-row">
                <div class="input-group" :class="[!listVisible ? 'is-active' : '']">
                    <i class="el-icon-search"></i>
                    <input type="text" placeholder="搜索" v-model="keyword" @click.stop="onInputClick" @change.stop="onInputChange" />
                    <i v-if="!listVisible" class="el-icon-error" @click.stop="onInputClear"></i>
                </div>

                <i class="add-btn el-icon-plus"></i>
            </section>

            <section class="contact-block" v-for="(friend, index) of friendList" :key="index">
                <label class="block-title">A</label>

                <div class="contact-item flex-row">
                    <div class="avatar-wrap">
                        <img />
                    </div>

                    <span class="nickname">昵称</span>
                </div>
            </section>
        </div>
    </section>
</template>

<script>
export default {
    name: 'ChatContacts',
    props: {
        friendList: {
            type: Array,
            default: () => ([])
        }
    },
    data () {
        return {
            listVisible: true,
            keyword: '',
            searchList: []
        }
    },
    methods: {
        onInputClick () {
            this.listVisible = false
        },
        onInputChange () {

        },
        onInputClear () {
            this.listVisible = true
            this.keyword = ''
            this.searchList = []
        }
    }
}
</script>

<style lang="scss" scoped>
.chat-contacts {
    width: 100%;
    padding: 0 20px;
    color: #fff;
    position: -webkit-sticky;
    position: sticky;
    top: 80px;
    
    .side {
        width: 240px;
        height: 100%;
        display: flex;
        flex-direction: column;
    }

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

    .contact-block {
        .block-title {
            font-size: 16px;
            color: #666;
        }

        .contact-item {
            .avatar-wrap {
                width: 35px;
                height: 35px;
            }
        }
    }
}
</style>