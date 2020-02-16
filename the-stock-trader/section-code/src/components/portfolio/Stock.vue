<template>
   <div class="col-sm-6 col-md-4">
      <div class="panel panel-info">
         <div class="panel-heading">
            <h3 class="panel-title">
               {{ stock.name }}
               <small>(Price: {{ stock.price }} | Quantity: {{ stock.quantity }})</small>
               </h3>
         </div>
         <div class="panel-body">
            <div class="pull-left">
               <input type="number"
                  class="form-control"
                  placeholder="Quantity"
                  v-model="quantity"
                  :class="{ danger: insufficientQuantity }">
            </div>
            <div class="pull-right">
                <!-- || !Number.isInteger(quantity) -->
               <button class="btn btn-success"
                  @click="sellStock"
                  :disabled="insufficientQuantity || quantity <= 0"
                  >{{ insufficientQuantity ? 'Not enough' : 'Sell' }}</button>
            </div>
         </div>
      </div>
   </div>
</template>

<script>
   import { mapActions } from 'vuex';
   // 個人投資組合相關資料
   export default {
      props: ['stock'],
      data() {
         return {
            quantity: 0
         }
      },
      computed: {
         // 判斷 賣出的數量 是否大於 個人股票的數量
         insufficientQuantity() {
            return this.quantity > this.stock.quantity;
         }
      },
      methods: {
         ...mapActions({ // 解構 vuex store 中的 sellStock action 方法 
            placeSellOrder: 'sellStock' // 因為 method 也叫 sellStock 所以另外命名
         }),
         // 賣出股票 method
         sellStock() {
            const order = {
               stockId: this.stock.id,
               stockPrice: this.stock.price,
               quantity: this.quantity
            };
            this.placeSellOrder(order);
            this.quantity = 0;
         }
      }
   }
</script>

<style scoped>
   .danger {
      border: 1px solid red;
   }
</style>