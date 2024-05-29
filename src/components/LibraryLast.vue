<script setup lang="ts">
import LibraryCardItem from './LibraryCardItem.vue';
import AnotherComponent from '@/components/AnotherComponent.vue';

const emit = defineEmits(['item-click']); // definir el emisor

const handleClick = (item:any) => {
  emit('item-click', AnotherComponent); // cambiar a AnotherComponent al hacer clic
};
</script>

<template>
  <h2>Last Added Games</h2>
  <hr />
  <LibraryCardItem @card-click="handleClick" />
</template>

<style scoped>
h2 {
  font-family: var(--font-archivo-black);
  margin-top: 10px;
  margin-left: 20px;
  margin-bottom: 5px;
}
hr {
  width: 95%;
  margin-left: 20px;
  border-color: #000;
  margin-bottom: 10px;
}
</style>
