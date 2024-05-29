<script setup lang="ts">
import { ref } from 'vue';
import StudioProfile from '@/components/StudioProfile.vue';
import CategoriesItem from '@/components/CategoriesItem.vue';
import GamesListStudio from '@/components/GamesListStudio.vue';

// Variable reactiva para la categoría seleccionada
const selectedCategory = ref<string | null>(null);

// Manejar el evento emitido por CategoriesItem
const handleCategorySelected = (category: string | null) => {
  selectedCategory.value = category;
};
</script>

<template>
    <StudioProfile />
    <h1 class="title">Games</h1>
    <hr class="bar">
    <div class="cart-content">
      <GamesListStudio class="cart-item" :selectedCategory="selectedCategory" />
      <div class="total-item">
        <h4 class="categories-title">Categories</h4>
        <CategoriesItem @categorySelected="handleCategorySelected" />
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
.categories-title {
  margin-bottom: 20px;
}
</style>