<template>
    <p>Counter is: {{ counter }}</p>
</template>

<script>
    export default {
        // props: ['counter']
        computed: { // 直接 computed store 的值
            counter() {
                // return this.$store.state.counter * 2;
                return this.$store.getters.doubleCounter;
            }
        }
    }
</script>