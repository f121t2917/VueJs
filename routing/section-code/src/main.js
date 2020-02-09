import Vue from 'vue'
import VueRouter from 'vue-router';
import App from './App.vue'
import { routes } from './routes';

// npm install --save vue-router
Vue.use(VueRouter);

const router = new VueRouter({
  // routes: routes
  routes,
  mode: 'history', // url 會沒有 /#/
  scrollBehavior(to, from, savedPosition) { // 網址 hash # 滾動到定位
    if (savedPosition) {
      return savedPosition;
    }
    if (to.hash) {
      return { selector: to.hash };
    }
    return { x: 0, y: 0};
  }
});

// 每個路由操作之前 都執行此操作
router.beforeEach((to, from, next) => {
  console.log('global beforeEach');
  // next(false); // 終中當前操作 並停留在之前的頁面上
  next();
});

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
