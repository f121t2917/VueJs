/*
如果子子組件 與 子組件要互相溝通 需要透過很多層
可以透過 vuex 解決
*/
import Vue from 'vue'
import App from './App.vue'

import { store } from './store/store';

new Vue({
  el: '#app',
  store,
  render: h => h(App)
})
