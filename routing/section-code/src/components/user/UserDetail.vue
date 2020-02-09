<template>
    <div>
        <h3>Some User Details</h3>
        <p>User Loaded has ID: {{ $route.params.id }}</p>

        <!-- :to="'/user/' + $route.params.id + '/edit'" -->
        <!-- 在 routes.js 設定 name 後，可以直接用以下的方法， 將 id 變數傳給 userEdit -->
        <!-- 利用 query 傳遞 參數 -->
        <!-- :to="{ name: 'userEdit', params: { id: $route.params.id }, query: { locale: 'en',q: 100},  }" -->
        <!-- :to 改用 data  -->
        <router-link
            tag="button"
            :to="link"
            class="btn btn-primary">Edit User</router-link>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                link: {
                    name: 'userEdit',
                    params: {
                        id: this.$route.params.id
                    },
                    query: { 
                        locale: 'en',
                        q: 100
                    },
                    hash: '#data'
                }
            }
        },
        beforeRouteEnter(to, from ,next) { //
            console.log('UserDetail beforeRoute Enter');
            if (true) {
                next();
            } else {
                next(false);
            }
            // next(vm => {
                // vm.link;
            // });
        }
    }
</script>