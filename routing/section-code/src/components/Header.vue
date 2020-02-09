<template>
    <ul class="nav nav-pills">
        <!-- active-class 則是 active 的 class
        先前有提到如果匹配後會自動賦予一個固定的 active class 元素中，

        而預設匹配的比較方式是如果包含在原本設定的路由中就會視為匹配，因此若是下例就會產生 2 個都是 active 的狀態。
        目前位置： localhost:8080/contact/create
        連結1 <router-link :to="{path: '/contact/create'}">  : 目前位置有包含 /contact/create 就符合匹配
        連結2 <router-link :to="{path: '/contact'}">  : 目前位置有包含 /contact 就符合匹配 
        因此兩者都符合而會產生誤判
        透過 exact 標籤來限制比對匹配時，要完全一樣才符合 -->

        <router-link to="/" tag="li" active-class="active" exact><a>Home</a></router-link>
        <router-link to="/user" tag="li" active-class="active"><a>User</a></router-link>
    </ul>
</template>