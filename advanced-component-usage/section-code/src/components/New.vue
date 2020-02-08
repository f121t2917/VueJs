<template>
    <div>
        <h3>The New</h3>
        <p>切換到其他的 component 再切回來 counter 會為0，因為會destroyed</p>
        <button @click="counter++">Increase</button>
        <p>{{ counter }}</p>
    </div>
</template>

<script>
    export default {
        data: function () {
            return {
                counter: 0
            }
        },
        destroyed() {
            console.log('New Destroyed!');
        },
        deactivated() {
            console.log('New Deactivated!');
        },
        activated() {
            console.log('New Activated!');
        }
    }
</script>

<style>
</style