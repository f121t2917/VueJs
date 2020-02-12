<template>
    <div>
        <button class="btn btn-primary" @click="increment">Increment</button>
        <button class="btn btn-primary" @click="decrement(1)">Decrement</button>
    </div>
</template>

<script>
    import { mapMutations } from 'vuex';
    export default {
        methods: {
            increment() {
                // this.$store.state.counter++;
                // this.$emit('updated', 1);
                this.$store.commit('increment'); // mutations
            },
            decrement(by) {
                // this.$emit('updated', -1);
                // this.$store.state.counter--;
                this.$store.commit('decrement', by); // mutations
            }
        }
        // 另一種方式
        // methods: {
        //     ...mapMutations([
        //         'increment',
        //         'decrement'
        //     ])
        // }
    }
</script>