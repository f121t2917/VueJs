<template>
    <div>
        <div class="title">
            <!-- 可渲染二次 -->
            <slot name="title"></slot>
            <!-- 可預設 slot 的內容 -->
            <span style="color: #ccc"><slot name="subtitle">The Subtitle</slot></span>
        </div>

        <hr>
        <p>1 A Wonderful Quote!</p>
        <p>2 {{ quote }}</p>
        <!-- 使用插槽 slots -->
        <slot name="content"></slot>
    </div>
</template>
<script>
    export default {
        props: ['quote']
    }
</script>
<style scoped>
    div {
        border: 1px solid #ccc;
        box-shadow: 1px 1px 2px black;
        padding: 30px;
        margin: 30px auto;
        text-align: center;
    }

    h2 {
        color: red; /* 改變 slots style ，如果是定義在 App.vue 則沒效果 */
    }

    .title {
        font-style: italic;
    }
</style>