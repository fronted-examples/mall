<template>
    <section class="menu">
        <div class="catelog-list">
            <span class="sub-title">第一卷 共936章</span>
            
            <ul class="title-list">
                <li class="title-item">第1章 重生</li>
                <li class="title-item">第2章 退婚</li>
                <li class="title-item">第3章 名份</li>
                <li class="title-item">第4章 拜帖</li>
            </ul>
        </div>
    </section>
</template>

<script>
export default {
    name: 'Menu'
}
</script>

<style lang="scss" scoped>
.menu {
    .catelog-list {
        width: 860px;
        .sub-title {
            color: #222;
            font-size: 18px;
            font-weight: 700;
            line-height: 28px;
        }

        .title-list {
            width: 100%;
            margin-top: 10px;
            display: flex;
            flex-wrap: wrap;

            .title-item {
                width: 50%;
                line-height: 48px;
                color: #222;
                cursor: pointer;
                padding-right: 16px;
                box-sizing: border-box;
                font-size: 16px;

                &:hover {
                    color: #b04f08;
                }
            }
        }
    }
}
</style>