import Vue from 'vue'
import App from './App.vue'
// npm install --save axios
import axios from 'axios'

import router from './router'
import store from './store'

axios.defaults.baseURL = 'https://vue-update.firebaseio.com'
// 之後只要 axios.get('/getsomething');

// 設置應用於任何請求的標頭
axios.defaults.headers.common['Authorization'] = 'fasfdsa'
axios.defaults.headers.get['Accepts'] = 'application/json'

// 攔截器
const reqInterceptor = axios.interceptors.request.use(config => {
  console.log('Request Interceptor', config)
  return config
})
const resInterceptor = axios.interceptors.response.use(res => {
  console.log('Response Interceptor', res)
  return res
})

axios.interceptors.request.eject(reqInterceptor)
axios.interceptors.response.eject(resInterceptor)

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
