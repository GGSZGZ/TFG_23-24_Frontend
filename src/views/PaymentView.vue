<script setup lang="ts">
import PaymentItem from '@/components/PaymentItem.vue'
import MethodsItem from '@/components/MethodsItem.vue'
</script>
<template>
    <h1 class="title">Payment Method</h1>
    <hr class="bar">
    <div class="payment-content">
        <PaymentItem class="payment"/>
        <MethodsItem class="methods"/>
    </div>
</template>
<style scoped>
.title {
  font-family: var(--font-archivo-black);
  margin-top: 40px;
  margin-left: 20px;
}

.bar {
  top: 109px;
  width: 95%;
  border-color: #000;
  margin-left: 25px;
  margin-top: 5px;
}
.payment-content {
  display: flex;
  justify-content: space-between;
  width: 97%;
  margin-top: 20px;
  margin-bottom: 20px;
}
.payment{
    flex: 2;
}
.method{
    flex: 1;
}
</style>