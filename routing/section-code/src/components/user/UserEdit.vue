<template>
    <div>
        <h3>Edit the User</h3>
        <p>Locale: {{ $route.query.locale }}</p>
        <p>Analytics: {{ $route.query.q }}</p>
        <hr>
        <!-- 沒按 confirm 離開前會提示 -->
        <button class="btn btn-primary" @click="confirmed = true">Confirm</button>
        <div style="height: 700px"></div>
        <!-- 超連結 id 定位 -->
        <p id="data">Some extra Data</p>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                confirmed: false
            }
        },
        beforeRouteLeave(to, from, next) { // 離開前動作
            if (this.confirmed) {
                next();
            } else {
                if (confirm('Are you sure?')) {
                    next();
                } else {
                    next(false);
                }
            }
        }
    }
</script>