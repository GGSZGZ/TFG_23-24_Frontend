<script setup lang="ts">
import { ref, watch } from 'vue'
const items = ['Price (Low to High)', 'Price (High to Low)', 'Date (Close to Further)', 'Date (Further to Close)', 'Name (A-Z)', 'Name (Z-A)'];
const selectedOrder = ref<string | null>(null);

const emit = defineEmits(['orderChanged']);

watch(selectedOrder, (newOrder) => {
  emit('orderChanged', newOrder);
});
</script>

<template>
  <v-select
    clearable
    label="Order By"
    :items="items"
    v-model="selectedOrder"
  ></v-select>
</template>

