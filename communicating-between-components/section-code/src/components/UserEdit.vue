<template>
    <div class="component">
        <h3>You may edit the User here</h3>
        <p>Edit me!</p>
        <p>User Age: {{ myAge }}</p>
        <button @click="editAge">Edit Age</button>
    </div>
</template>

<script>
    import { eventBus } from '../main';

    export default {
        props: ['userAge'],
        data: function () {
            return {
                myAge: this.userAge
            }
        },
        watch: {
            userAge(val) {
                this.myAge = this.userAge;
            }
        },
        methods: {
            editAge() {
                this.myAge = 30;
                // this.$emit('ageWasEdited', this.myAge);

                // 利用中央類來傳遞資料
                // eventBus.$emit('ageWasEdited', this.myAge);
                eventBus.changeAge(this.myAge);
            }
        },
        created() {

        }
    }
</script>

<style scoped>
    div {
        background-color: lightgreen;
    }
</style>
