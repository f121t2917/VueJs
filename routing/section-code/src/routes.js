import Home from './components/Home.vue';
import Header from './components/Header.vue';

// lazy load
// import User from './components/user/User.vue';
// import UserStart from './components/user/UserStart.vue';
// import UserDetail from './components/user/UserDetail.vue';
// import UserEdit from './components/user/UserEdit.vue';

const User = resolve => {
    require.ensure(['./components/user/User.vue'], () => {
        resolve(require('./components/user/User.vue')); // require 跟 import 類似 是載入的語法 
    }, 'user'); // 也可以設 group 做 子捆綁 ex. user
};

const UserStart = resolve => {
    require.ensure(['./components/user/UserStart.vue'], () => {
        resolve(require('./components/user/UserStart.vue'));
    }, 'user');
};

const UserEdit = resolve => {
    require.ensure(['./components/user/UserEdit.vue'], () => {
        resolve(require('./components/user/UserEdit.vue'));
    });
};

const UserDetail = resolve => {
    require.ensure(['./components/user/UserDetail.vue'], () => {
        resolve(require('./components/user/UserDetail.vue'));
    });
};


// 一般情況 url 會產生 /#/，#之後的部份會移交給 js 應用
// 可以加入 mode: 'history'， url 會沒有 /#/
export const routes = [
    // { path: '', component:  Home, name: 'home' }
    { path: '', name: 'home', components: {
        default: Home, // 預設的 component
        'header-top': Header // 將 Header 設定在 App.vue <router-view name="header-top"></router-view>
    }},
    // { path: '/user/:id', component:  User, props: true} // 加 props: true 後，vue 才能透過 props 取得 :id
    // { path: '/user', component:  User, children:[ // 子路由
    { path: '/user', components:  {
        default: User,
        'header-bottom': Header // 將 Header 設定在 App.vue <router-view name="header-bottom"></router-view> 
    }, children:[ // 子路由
        { path: '', component: UserStart }, // => /user
        { path: ':id', component: UserDetail, beforeEnter: (to, from, next) => { // beforeEnter 類似 router.beforeEach
            console.log('inside route setup');
            next();
        } }, // => /user/1 ， 
        { path: ':id/edit', component: UserEdit, name: 'userEdit' }, // => /user/1/edit
    ] },
    // { path: 'redirect-me', redirect: '/user' }
    { path: 'redirect-me', redirect: { name: 'home' } }, // 重定向
    { path: '*', redirect: '/' } // 其他預設重定向至 home
];