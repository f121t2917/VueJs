<template>
    <div class="component">
        <h3>You may view the User Details here</h3>
        <p>Many Details</p>
        <!-- 同時修改父組件的值 -->
        <p>User Name: {{ myName }}</p>
        <p>User Age: {{ myAge }}</p>
        <button @click="resetName">Reset Name</button>
        <!-- resetFn -> 執行父組件的 resetName -> 父組件修改 this.name -> 子組件props 監聽 name 的值
            -> watch 觀察 name 值變動 -> 修改 myName 的值 -> 子組件 myName 顯示變化  -->
        <button @click="resetFn()">Reset Name Use resetFn</button>
    </div>
</template>

<script>
    import { eventBus } from '../main';

    export default {
        // 外部設置屬性
        // props: ['myName'],
        props: {
            // 指定 myName type
            // 方法一
            // myName: [String, Array, Object] 
            // 方法二
            name: {
                type: String,
                required: true,
                default: 'Max'
                //
                // or
                //
                // type: Object,
                // default: function() {
                //     return {
                //         name: 'Max'
                //     }
                // }
            },
            resetFn: Function, // 接收父組件傳遞過來的 function
            userAge: Number
        },
        data: function() {
            return {
                myName: this.name,
                myAge: this.userAge
            }
        },
        watch: {
            name(val) {
                this.myName = val;
            }
        },
        methods: {
            switchName() {
                return this.myName.split("").reverse().join("");
            },
            resetName() {
                // 同時修改父組件的值
                // Vue2.0 組件內不能修改 props 的值
                // 1. 所以必須另外在 data 建立一個 myName，預設抓 外部傳進來的 name
                // 2. 這個組件都抓 myName
                // 3. 利用 watch 觀察 外部傳進來 name 的變化，有變化則更新 myName
                // 變更父組件動作
                // 4. 修改組件內 data myName 的值
                this.myName = 'Max';
                // 5. 對父組件 發出 nameWasReset 訊號
                this.$emit('nameWasReset', this.myName);
            }
        },
        created() {
            // 註冊監聽器
            eventBus.$on('ageWasEdited', (age) => {
                this.myAge = age;
            });
        }
    }
</script>

<style scoped>
    div {
        background-color: lightcoral;
    }
</style>
