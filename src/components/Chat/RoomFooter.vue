<template>
    <section class="room-footer flex-row secondary-start">
        <div 
            ref="textarea"
            class="el-textarea" 
            contenteditable 
            placeholder="来聊点儿什么吧~" 
            @input="onInput"
            @compositionstart="onStart"
            @compositionend="onEnd" />
            
        <el-button type="default" @click.stop="onSend">发送(S)</el-button>
    </section>
</template>

<script>
export default {
    name: 'RoomFooter',
    data () {
        return {
            message: '',
            composing: false
        }
    },
    methods: {
        onInput ($event) {
            // console.log('onInput: ', e)
            const text = $event.target.innerText
            this.valueHandle($event, text)
        },
        /**
         * 中文输入开始
         */
        onStart () {
            this.composing = true
        },
        /**
         * 中文输入结束
         */
        onEnd ($event) {
            this.composing = false
            const text = $event.target.innerHTML
            this.valueHandle($event, text)
        },
        onSend () {
            console.log('message: ', this.message)
            this.$emit('send', this.message)
            this.message = ''
            this.$refs.textarea.innerHTML = ''
        },
        /**
         * 处理逻辑
         * val文本数据
         */
        valueHandle ($event, val) {
            if (this.composing) {
                return
            }

            const len = this.validateTextLength(val)

            if (len > 500) {
                this.$refs.textarea.innerHTML = val.substr(0, 500)
                this.$refs.textarea.focus()
            }

            setTimeout(() => {
                this.keepLastIndex($event)
            }, 5)
            // 拓展 如果想要只需要前100位数据
            // this.content = this.content.substring(0, 100)

            this.message = val
        },
        validateTextLength (value) {
            // 中文、中文标点、全角字符按1长度，英文、英文符号、数字按0.5长度计算
            let cnReg = /([\u4e00-\u9fa5]|[\u3000-\u303F]|[\uFF00-\uFF60])/g
            let mat = value.match(cnReg)
            let length
            if (mat) {
                length = (mat.length + (value.length - mat.length) * 0.5)
                return length
            } else {
                return value.length * 0.5
            }
        },
        keepLastIndex ($event) {
            const target = $event.target

            if (window.getSelection) { // ie11 10 9 ff safari
                target.focus() // 解决ff不获取焦点无法定位问题
                const range = window.getSelection() // 创建range
                range.selectAllChildren(target) // range 选择obj下所有子内容
                range.collapseToEnd() // 光标移至最后
            } else if (document.selection) { // ie10 9 8 7 6 5
                const range = document.selection.createRange() // 创建选择对象
                // var range = document.body.createTextRange();
                range.moveToElementText(target) // range定位到obj
                range.collapse(false) // 光标移至最后
                range.select()
            }
        },
    }
}
</script>

<style lang="scss" scoped>
.room-footer {
    box-sizing: border-box;
    width: 100%;
    background-color: #424656;
    padding: 5px 10px;
    border-radius: 0 0 8px 8px;

    .el-textarea {
        padding: 4px 6px;
        overflow-x: hidden;
        overflow-y: auto;
        line-height: 1.6;
        font-size: 14px;
        color: #fff;
        white-space: pre-wrap;
        resize: none;
        background-color: #383c4b;
        box-sizing: border-box;
        border: none;
        border-radius: 6px;
        outline: none;

        &:empty:before {
            color: #a8abb2;
            pointer-events: none;
            content: attr(placeholder);
        }
    }

    .el-button {
        width: 80px;
        border-radius: 5px;
        font-size: 14px;
        color: #fff;
        float: right;
        padding: 8px 10px;
        background: rgba(245, 245, 245, 0.1);
        border: none;
        margin-left: 10px;
        &:hover {
            color: #00CC00;
        }
        &::after {
            content: '';
            display: block;
            clear: both;
        }
    }
}
</style>