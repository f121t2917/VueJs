import Vue from 'vue'
import App from './App.vue'
import Home from './Home.vue'

// App.vue 可以使用 <app-server></app-server> 載入 Home.vue
Vue.component('app-server', Home);

new Vue({
  el: '#app',
  render: h => h(App)
})
