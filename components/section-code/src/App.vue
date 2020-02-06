<template>
    <div class="container">
        <div class="row">
            <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
                <h1>Components {{ status }}</h1>
            </div>
        </div>
        <app-server></app-server>
    </div>
    <!-- 所有模板代碼需包裝在一個根元素中，否則會 error -->
    <!-- app-server-status 放在 div 外會 error  -->
    <!-- template syntax error Component template should contain exactly one root element. -->
        <!-- <app-server-status></app-server-status> -->
</template>

<script>
    export default {
        data: function () {
            return {
                status: 'Critial'
            };
        }
    }
</script>

<style>

</style>
