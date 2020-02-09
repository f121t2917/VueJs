import Vue from 'vue'
import App from './App.vue'

// 自定義指令 ex. v-price 可以自定義價格千分位符號
// 註冊指令，v-highlight 
// bind：發生時機點為指令第一次綁定到元素上時，因此只會使用一次。常用於初始化。如上例，在指令第一次綁定到<span id="number">時將價格加上千分位符號。
// inserted：綁定元素插入父節點時使用。
// update：綁定元素在模版更新時使用。
// componentUpdated：綁定元素在元件更新時使用。
// unbind：解除指令與元素的綁定。
Vue.directive('highlight', {
  // el 自定義指令所綁定的元素，也就是想要操作的 DOM 物件
  // binding 物件包含一些屬性
  //   name：自定義指令名，不含前綴「v-」，如下例的「say」。
  //   value：指令的綁定值，如下例的「{"name":"Peter","prompt":"Hello World"}」。
  //   oldValue：綁定值的前一個值，儘在 update 或 componentUpdated 時可用。
  //   expression：綁定值的字串，如上例的「dollar」、下例的「{"name":"Peter","prompt":"Hello World"}」。
  //   arg：傳給自定義指令的參數，如上例的「currency」、下例的「hello」。
  //   modifiers：修飾符，如下例的「a」、「b」、「c」。如果不知道修飾符是什麼，可參考事件修飾符 (Event Modifiers)。
  // vnode 虛擬節點 (virtual DOM)。
  // oldVnode 前一個虛擬節點，儘在 update 或 componentUpdated 時可用

  bind(el, binding, vnode) {
    // el.style.backgroundColor = 'green';
    // el.style.backgroundColor = binding.value; // 取得 vue 傳過來的值

    var delay = 0;
    if (binding.modifiers['delayed']) {
      delay = 2000;
    }
    setTimeout(() =>{
      if (binding.arg == 'background') {
        el.style.backgroundColor = binding.value;
      } else {
        el.style.color = binding.value;
      }
    }
    , delay);
  }
});

new Vue({
  el: '#app',
  render: h => h(App)
})
