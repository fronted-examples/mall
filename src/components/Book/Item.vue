<template>
    <section class="book-item" @click="handleClick(book)">
        <div class="book-cover">
            <img src="https://cdn.wtzw.com/bookimg/public/images/cover/a3c6/e34700dbd8bcabef596ba33eed4d9786_360x480.jpg" alt="登雀枝" />
        </div>

        <div class="book-info">
            <span class="title">登雀枝</span>
            <span class="author">二月春</span>
            <div class="desc">已获得海外翻译、影视改编、广播剧改编</div>
        </div>
    </section>
</template>

<script>
export default {
    name: 'BookItem',
    props: {
        book: {
            type: Object,
            default: () => ({})
        }
    },
    methods: {
        handleClick (book) {
            this.$emit('toBook', book)
        }
    }
}
</script>

<style lang="scss" scoped>
.book-item {
    display: flex;
    width: 260px;
    border-radius: 5px;
    position: relative;
    margin: 24px 40px 0 0;
    background-color: #fff;
    cursor: pointer;
    &:nth-child(-n+4) {
        margin-top: 0;
    }
    .book-cover {
        width: 110px;
        height: 147px;

        img {
            width: 100%;
            height: 100%;
            transition: all .2s;
            &:hover {
                transform: scale(1.1);
            }
        }
    }

    .book-info {
        margin-left: 16px;
        position: relative;
        display: flex;
        flex-direction: column;
        flex: 1;

        .title {
            font-size: 16px;
            line-height: 24px;
            display: block;
            margin-bottom: 2px;
            white-space: nowrap;

            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            max-height: 48px;
        }

        .author {
            font-size: 12px;
            color: #999;
            line-height: 16px;
            display: block;
            margin-bottom: 8px;
        }

        .desc {
            font-size: 12px;
            padding-right: 5px;
            position: absolute;
            bottom: 0;
            left: 0;

            color: #553107;
            line-height: 20px;
            max-height: 60px;
            display: inline-block;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
        }
    }
}
</style>