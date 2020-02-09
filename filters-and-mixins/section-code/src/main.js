import Vue from 'vue'
import App from './App.vue'

// 全域 filter
Vue.filter('to-lowercase', function(value) {
  return value.toLowerCase();
});

Vue.mixin({
  created() {
    // 此例子會建立3次， 1. new Vue() 2. new App.vue 3. new List.vue
    console.log('Global Mixin - Created Hook');
  }
});

new Vue({
  el: '#app',
  render: h => h(App)
})
