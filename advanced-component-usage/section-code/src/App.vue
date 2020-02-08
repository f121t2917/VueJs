<template>
    <div class="container">
        <div class="row">
            <div class="col-xs-12">
                <!-- 切換顯示 component -->
                <button @click="selectedComponent = 'appQuote'">Quote</button>
                <button @click="selectedComponent = 'appAuthor'">Author</button>
                <button @click="selectedComponent = 'appNew'">New</button>
                <hr>
                <p>{{ selectedComponent }}</p>
                <component :is="selectedComponent">
                    <p>Default Content</p>
                </component>

                <!-- 可以利用 keep-alive 使組件處於活動狀態，不會因為切換到其他 component 而 destroyed -->
                <keep-alive>
                    <component :is="selectedComponent">
                        <p>Default Content</p>
                    </component>
                </keep-alive>
                <hr>
                <!-- 傳遞時，如果字串不是透過變數 則不加 : -->
                <!-- <app-quote :quote="quote"></app-quote> -->
                <app-quote quote="A wonderful quote!">
                    <!-- 使用插槽 slots，可定義名稱使用，如果不使用名稱，則使用預設的 slot -->
                    <h2 slot="title">App {{ quoteTitle }}</h2>
                    <p slot="content">App Quote Content</p>
                </app-quote>
            </div>
        </div>
    </div>
</template>

<script>
    import Quote from './components/Quote.vue';
    import Author from './components/Author.vue';
    import New from './components/New.vue';

    export default {
        data: function() {
            return {
                quote: 'quote',
                quoteTitle: 'The Quote', // 與 css 相反 data 是在這設定
                selectedComponent: 'appQuote' // 預設為 appQuote Component
            };
        },
        components: {
            appQuote: Quote,
            appAuthor: Author,
            appNew: New
        }
    }
</script>

<style>
</style>
