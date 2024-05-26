<script setup lang="ts">
import CartItem from '@/components/CartItem.vue'
import TotalItem from '@/components/TotalItem.vue'
</script>

<template>
    <h1 class="title">Your Cart</h1>
    <hr class="bar">
    <div class="cart-content">
      <CartItem class="cart-item" />
      <TotalItem class="total-item" />
    </div>
    <button class="continue">Continue Buying</button>
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

.cart-content {
  display: flex;
  justify-content: space-between;
  width: 97%;
  margin-top: 20px;
}

.cart-item {
  flex: 3;
}

.total-item {
  flex: 1;
  margin-left: 20px;
}
.continue{
    background-color: var(--color-yellow);
    width:140px;
    padding: 15px;
    margin-top: -10px;
    margin-bottom: 10px;
    margin-left: 20px;
    border-radius: 5px;
    font-family: var(--font-roboto);
}
</style>
