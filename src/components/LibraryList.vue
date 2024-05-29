<script setup lang="ts">
import { ref, computed } from 'vue';
import AnotherComponent from '@/components/AnotherComponent.vue';

const search = ref('');
const items = ref([
  { name: 'Item 1' },
  { name: 'Item 2' },
  { name: 'Item 3' },
]);

const headers = [
  { text: 'Name', value: 'name' },
];

const filteredItems = computed(() => {
  const query = search.value.trim().toLowerCase();
  if (!query) {
    return items.value;
  } else {
    return items.value.filter(item => item.name.toLowerCase().includes(query));
  }
});

const emit = defineEmits(['item-click']); // definir el emisor

const handleClick = (item: any) => {
  emit('item-click', AnotherComponent); // cambiar a AnotherComponent al hacer clic
};
</script>

<template>
  <v-card flat>
    <v-text-field
      v-model="search"
      label="Search"
      prepend-inner-icon="mdi-magnify"
      variant="outlined"
      hide-details
      single-line
    ></v-text-field>
    <v-data-table-virtual
      :headers="headers"
      :items="filteredItems"
      height="400"
      @click:row="handleClick"
    ></v-data-table-virtual>
  </v-card>
</template>

<style scoped>
.v-card {
  margin-bottom: 10px;
}
</style>
