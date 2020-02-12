<template>
    <div>
        <!-- 可以直接傳 object -->
        <!-- <button class="btn btn-primary" @click="increment({by: 50, duration: 500})">Another Increment</button> -->
        <!-- 如果變數是 payload，store 再用 payload.by 與 payload.duration -->
        <button class="btn btn-primary" @click="increment(100)">Another Increment</button>
        <button class="btn btn-primary" @click="decrement(100)">ANother Decrement</button>
    </div>
</template>

<script>
    import { mapActions } from 'vuex';
    export default {
        // methods: {
        //     increment() {
        //         this.$store.state.counter++;
        //         // this.$emit('updated', 1);
        //     },
        //     decrement() {
        //         // this.$emit('updated', -1);
        //         this.$store.state.counter--;
        //     }
        // }
        // 使用 mutations
        // methods: {
        //     increment() {
        //         // this.$store.state.counter++;
        //         // this.$emit('updated', 1);
        //         this.$store.commit('increment');
        //     },
        //     decrement() {
        //         // this.$emit('updated', -1);
        //         // this.$store.state.counter--;
        //         this.$store.commit('decrement');
        //     }
        // }
        // 將 actions 映射到方法
        // methods: {
        //     ...mapActions([
        //         'increment',
        //         'decrement'
        //     ]),
            // increment(by){
            //     this.$store.dispatch('increment', by);
            // }
        // }
        methods: {
            increment(by) {
                this.$store.dispatch('increment'); // action
            },
            decrement(by) {
                this.$store.dispatch('decrement', by); // action
            }
        }
       
    }
</script>