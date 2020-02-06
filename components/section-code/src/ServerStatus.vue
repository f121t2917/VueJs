<template>
    <!-- 所有模板代碼需包裝在一個根元素中，否則會 error -->
    <div>
        <p>Server Status: {{ status }}</p>
        <hr>
        <button @click="changeStatus">Change Status</button>
    </div>
</template>
<script>
    export default {
        data: function () {
            return {
                status: 'Critial'
            };
        },
        methods: {
            changeStatus() {
                this.status = 'Normal';
            }
        }
    }
</script>