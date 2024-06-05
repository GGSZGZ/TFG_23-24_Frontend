<script setup lang="ts">
import { ref } from 'vue';
import LibraryCardItem from './LibraryCardItem.vue';
import AnotherComponent from '@/components/AnotherComponent.vue';

const selectedGameData = ref<number | null>(null);

const handleItemClick = (data: number) => {
  selectedGameData.value = data.data;
};
</script>

<template>
  <h2>Last Added Games</h2>
  <hr />
  <LibraryCardItem @item-click="handleItemClick" />
  <AnotherComponent :gameData="selectedGameData" v-if="selectedGameData" />
</template>

<style scoped>
h2 {
  font-family: var(--font-archivo-black);
  margin-top: 10px;
  margin-left: 20px;
  margin-bottom: 5px;
  color: var(--neutral-colors-white);
}
hr {
  width: 95%;
  margin-left: 20px;
  border-color: #000;
  margin-bottom: 10px;
  color: var(--neutral-colors-white);
}
@media (max-width: 750px){
  h2{
    font-size: 20px;
  }
  hr {
    width: 88%
  }
  
}
</style>
