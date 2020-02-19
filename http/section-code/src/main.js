import Vue from 'vue'
import VueResource from 'vue-resource';
import App from './App.vue'

// npm install --save vue-resource
// vue-resources 不再更新
Vue.use(VueResource);

new Vue({
  el: '#app',
  render: h => h(App)
})
