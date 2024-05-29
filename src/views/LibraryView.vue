<script setup lang="ts">
import { ref } from 'vue';
import LibraryList from '@/components/LibraryList.vue';
import LibraryLast from '@/components/LibraryLast.vue';
import AnotherComponent from '@/components/AnotherComponent.vue'; // El componente que quieres mostrar al hacer clic

const currentComponent = ref(LibraryLast); // Estado compartido que maneja qué componente mostrar

const changeComponent = (component: any) => {
  currentComponent.value = component;
};
</script>

<template>
  <div class="container">
    <div class="left-panel">
      <LibraryList @item-click="changeComponent" />
    </div>
    <div class="right-panel">
      <component v-bind:is="currentComponent" />
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
}

.left-panel {
  flex: 1;
  border-right: solid 1px;
}

.right-panel {
  flex: 3;
}
</style>
