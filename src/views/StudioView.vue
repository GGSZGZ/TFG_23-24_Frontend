<script setup lang="ts">
import StudioProfile from '@/components/StudioProfile.vue'
import GameItem from '@/components/GameItem.vue'
import CartItem from '@/components/CartItem.vue'
import CategoriesItem from '@/components/CategoriesItem.vue'
</script>
<template>
    <StudioProfile />
    <h1 class="title">Games</h1>
    <hr class="bar">
    <div class="cart-content">
      <CartItem class="cart-item" />
      <div class="total-item">
        <h4>Categories</h4>
        <CategoriesItem />
      </div>
    </div>
</template>

<style scoped>
.title {
  font-family: var(--font-archivo-black);
  margin-top: 40px;
  margin-left: 20px;
}

.bar {
  width: 65%;
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
  background-color: var(--color-blue);
  margin-bottom: 10px;
}
</style>