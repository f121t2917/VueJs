<template>
    <div>
        <!-- 傳 stock 到 app-stock -->
        <app-stock v-for="stock in stocks" :key="stock.id" :stock="stock"></app-stock>
    </div>
</template>

<script>
    import Stock from './Stock.vue';
    // 市場上的股票
    export default {
        components: {
            appStock: Stock
        },
        computed: { // 計算屬性，stocks 資料有變化時，便更新資料
            // computed store stocks 的資料
            stocks() {
                // 抓取 store 的 stocks 
                return this.$store.getters.stocks;
            }
        }
    }
</script>