<template>
    <div class="component">
        <h1>The User Component</h1>
        <p>I'm an awesome User!</p>
        <p>Name is {{ name }}</p>
        <p>Age is {{ age }} (use center class, event bus) </p>
        <button @click="changeName">Change my Name</button>
        <hr>
        <div class="row">
            <div class="col-xs-12 col-sm-6">
                <!-- 如果 :myName="1" 傳遞過去還是會轉型成數值 -->
                <!-- nameWasReset 監聽 子組件 emit 訊號 -->
                <!-- 將本地的 resetName() 定義為 resetFn 傳遞給 子組件 -->
                <app-user-detail 
                    :name="name"
                    @nameWasReset="name = $event"
                    :resetFn="resetName"
                    :userAge="age"
                    >
                    </app-user-detail>
            </div>
            <div class="col-xs-12 col-sm-6">
                <!-- 
                子組件之間資料傳遞 example
                流程
                1. 父組件定義 detail 和 edit 子組件的 userAge props
                2. edit 子組件 因無法直接修改 props 參考 userDetail 
                3. edit 子組件 $emit 訊號給 父組件
                4. 父組件的 age 變更
                5. 因父組件同時將 detail 子組件 userAge props 設為 age，所以 age 變更時，更新 detail 子組件的 userAge
                (父組件也會判斷 edit 子組件的 userAge 值，因為一樣所以沒有更新)
                -->

                <app-user-edit 
                    :userAge="age"
                    @ageWasEdited="age = $event"></app-user-edit>
            </div>
        </div>
    </div>
</template>

<script>
    import UserDetail from './UserDetail.vue';
    import UserEdit from './UserEdit.vue';
    // 子組件之間不能互相 傳遞資料
    // A子組件必須傳給父組件，再傳遞給B子組件

    export default {
        data: function() {
            return {
                name: 'Max',
                age: 27
            };
        },
        methods: {
            changeName() {
                // for transferring data from the parent to the child
                // UserDetail.vue 也需要更新 name
                this.name = 'Anna';
            },
            resetName() {
                this.name = 'Max';
            }
        },
        components: {
            appUserDetail: UserDetail,
            appUserEdit: UserEdit
        }
    }
</script>

<style scoped>
    div {
        background-color: lightblue;
    }
</style>
