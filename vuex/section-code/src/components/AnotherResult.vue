<template>
    <div>
        <p>Another Counter is: {{ doubleCounter }}</p>
        <p>Another Number of Clicks: {{ stringCounter }}</p>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'; // 可以自行創建需要的所有計算屬性
    import * as types from '../store/types';
    export default {
        // props: ['counter']
        // computed: { // 直接 computed store 的值
            // counter() {
            //     // 和 Result 有重複功能 可以利用 store.getters
            //     // return this.$store.state.counter * 2;
            //     return this.$store.getters.doubleCounter;
            // },
            // click() {
            //     return this.$store.getters.stringCounter;
            // }
        // }

        // 改成用 types.js
        // computed: mapGetters([ // 取得 store.js 的 propertyName
            // 'doubleCounter',
            // 'stringCounter'
        // ]),
        computed: mapGetters({
            doubleCounter: types.DOUBLE_COUNTER,
            stringCounter: types.CLICK_COUNTER
        }),

        // 另一種取得方式 這樣可以再有自已的 computed
        // 有編譯錯誤則安裝 npm install --save-dev babel-preset-stage-2
        // .babelre 加入 ["stage-2"]
        // computed: {
        //     ...mapGetters([
        //         'doubleCounter',
        //         'stringCounter'
        //     ])
        // }

    }
</script>