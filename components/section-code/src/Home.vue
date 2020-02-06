<template>
    <div>
        <!-- 產生5個 app-server-status  每個按鈕都是控制自己本身的 status-->
        <app-server-status v-for="server in 5"></app-server-status>
    </div>
</template>

<script>
    // 載入 ServerStatus.vue
    import ServerStatus from './ServerStatus.vue';

    export default {
        //
        components: {
            'app-server-status': ServerStatus
        }
    }
</script>