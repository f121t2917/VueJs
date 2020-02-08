import Vue from 'vue'
import App from './App.vue'

// 如果 父組件有 A、B子組件，A子組件又有A1子組件
// 這時如果 A1子組件要傳遞資料到B子組件，需透過很多層
// 可以利用建立一個中央類，讓各個子組件、子子組件來傳遞資料
export const eventBus = new Vue({
  data: {
    
  },
  // 將方法集中在一起
  methods: {
    changeAge(age) { 
      // 將 emit 定義在這，各子組件只要呼叫這個，未來只需修改一個地方
      // 觀察者模式
      this.$emit('ageWasEdited', age);
    }
  }

});

new Vue({
  el: '#app',
  render: h => h(App)
})
