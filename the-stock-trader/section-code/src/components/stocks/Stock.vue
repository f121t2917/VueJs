<template>
   <div class="col-sm-6 col-md-4">
      <div class="panel panel-success">
         <div class="panel-heading">
            <h3 class="panel-title">
               {{ stock.name }}
               <small>(Price: {{ stock.price }})</small>
               </h3>
         </div>
         <div class="panel-body">
            <div class="pull-left">
               <input type="number"
                  class="form-control"
                  placeholder="Quantity"
                  v-model="quantity"
                  :class="{danger: insufficientFunds}">
            </div>
            <div class="pull-right">
                <!-- || !Number.isInteger(quantity) -->
               <button class="btn btn-success"
                  @click="buyStock"
                  :disabled="insufficientFunds || quantity <= 0"
                  >{{ insufficientFunds ? 'Insufficient Funds' : 'Buy' }}
               </button>
            </div>
         </div>
      </div>
   </div>
</template>

<script>
   export default {
      props: ['stock'],
      data() {
         return {
            quantity: 0
         }
      },
      computed: {
         // 目前現金
         funds() {
            return this.$store.getters.funds;
         },
         // 判斷 購買的股票金額 是否大於 現金
         insufficientFunds() {
            return this.quantity * this.stock.price > this.funds;
         }
      },
      methods: {
         buyStock() {
            const order = {
               stockId: this.stock.id,
               stockPrice: this.stock.price,
               quantity: this.quantity,
            }
            console.log(order);
            this.$store.dispatch('buyStock', order); // 將 order 傳到 buyStock
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