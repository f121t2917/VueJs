<template>
    <div class="container">
        <div class="row">
            <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
                <h1>Vuex</h1>
                <!-- <app-result :counter="counter"></app-result> -->
                <app-result></app-result>
                <app-another-result></app-another-result>
                <hr>
                <app-counter></app-counter>
                <app-another-counter></app-another-counter>
                <!-- <app-counter @updated="counter += $event"></app-counter> -->
                <hr>
                <!-- store 雙向綁向 -->
                <!-- <input type="text" :value="value" @input="updateValue"> -->
                <!-- store 雙向綁向 使用 v-model -->
                <input type="text" v-model="value">

                <p>{{ value }}</p>
            </div>
        </div>
    </div>
</template>

<script>
    import Counter from './components/Counter.vue';
    import AnotherCounter from './components/AnotherCounter.vue';
    import Result from './components/Result.vue';
    import AnotherResult from './components/AnotherResult.vue';

    export default {
        data() {
            return {
                counter: 0
            }
        },
        computed: {
            // value() {
            //     return this.$store.getters.value;
            // }
            // store 使用 v-model 方式需設 get set
            value: {
                get() {
                    return this.$store.getters.value;
                },
                set(value) {
                    this.$store.dispatch('updateValue', value);
                }
            }
        },
        methods: { // 讓 store值 雙向綁向 like v-model
        updateValue(event) {
            this.$store.dispatch('updateValue', event.target.value);
        }
        },
        components: {
            appCounter: Counter,
            appAnotherCounter: AnotherCounter,
            appResult: Result,
            appAnotherResult: AnotherResult
        }
    }
</script>

