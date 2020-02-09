<template>
    <div>
        <h1>Filters & Mixins</h1>
        <input v-model="filterText">
        <ul>
            <li v-for="fruit in filteredFruits">{{ fruit }}</li>
        </ul>
    </div>
</template>

<script>
    import { fruitMixin } from './fruitMixin';

    // vuejs 沒內建 filter
    export default {
        // 使用 mixin sharing code
        mixins: [fruitMixin],
        created() {
            // 會先載入  mixins 再載入組件
            console.log('Inside List Created Hook');
        }
    }
</script>

<style>

</style>
