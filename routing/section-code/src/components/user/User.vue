<template>
    <div>
        <h1>The User Page</h1>
        <hr>
        <p>Loaded ID: {{ id }}</p>
        <button @click="navigateToHome" class="btn btn-primary">Go to Home</button>
        <hr>
        <router-view></router-view>
    </div>
</template>
<script>
    export default {
        // vue-router 2.2 可以通過 props 提取路由參數
        props: {
            // id: {
            //     type: String,
            // }
        },
        data() {
            return {
                // 取得 url /user/:id，需與 routes.js 的名稱一樣
                // id: this.$route.params.id,
            }
        },
        watch: {
            // 觀察 $route 是否有變化，如果沒有 此頁面的 Loaded Id 不會隨著 切換而更新
            // '$route'(to, from) {
                // this.id = to.params.id;
            // }
        },
        methods: {
            navigateToHome() {
                // 轉到 /
                // this.$router.push({path: '/'});
                // routes.js 設定 name: 'home' 後，可以直接用 name
                this.$router.push({ name: 'home' });
            }
        }
    }
</script>