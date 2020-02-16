import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource'; // npm install vue-resource

import App from './App.vue';
import { routes } from './routes';
import store from './store/store'; // 載入 store

Vue.use(VueRouter);
Vue.use(VueResource);

Vue.http.options.root = 'https://vuejs-stock-trader-43598.firebaseio.com/';

// 設定貨幣字串
Vue.filter('currency', (value) => {
  return '$' + value.toLocaleString();
});

const router = new VueRouter({
  mode: 'history',
  routes
});

// 安裝 npm install --save-dev babel-preset-stage-2
// npm install --save vue-router
// babel 是 javascript 轉換器，將高級的 javascript 轉換成 可以在任何瀏覽器中運行

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
