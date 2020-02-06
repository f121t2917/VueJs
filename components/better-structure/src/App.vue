<template>
    <div class="container">
        <app-header></app-header>
        <hr>
        <div class="row">
            <servers></servers>
            <app-server-details></app-server-details>
        </div>
        <hr>
        <app-footer></app-footer>
    </div>
</template>

<script>
    // 將 components 分資料夾結構，ex. Shared 類 和 Server 類
    // 大型專案也可以依功能分類
    // - main.js
    // - users/
    // - - account/
    // - - analytics/
    // - shop
    // - - main/
    // - - checkout/
    import Header from './components/Shared/Header.vue';
    import Footer from './components/Shared/Footer.vue';
    import Servers from './components/Server/Servers.vue';
    import ServerDetails from './components/Server/ServerDetails.vue';

    export default {
        components: {
            // 命名組件標籤
            appHeader: Header, // 可以使用 <app-header></app-header> 或 <appHeader></appHeader>
            Servers, // ES6 還可使用，在它會在後台自動創建一個鍵值對
            'app-server-details': ServerDetails,
            'app-footer': Footer
        }
    }
</script>

<style>

</style>
