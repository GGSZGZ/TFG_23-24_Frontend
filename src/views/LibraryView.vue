<script setup lang="ts">
import { ref } from 'vue';
import LibraryList from '@/components/LibraryList.vue';
import LibraryLast from '@/components/LibraryLast.vue';
import AnotherComponent from '@/components/AnotherComponent.vue';

const currentComponent = ref({ is: LibraryLast, props: {}, key: 0 }); // Estado compartido que maneja qué componente mostrar

const changeComponent = ({ component, data }: { component: any; data: any }) => {
  currentComponent.value = { is: component, props: { gameData: data }, key: currentComponent.value.key + 1 }; // Cambia la clave para forzar la actualización
};
</script>

<template>
  <div class="container">
    <div class="left-panel">
      <LibraryList @item-click="changeComponent" />
    </div>
    <div class="right-panel">
      <component :is="currentComponent.is" v-bind="currentComponent.props" :key="currentComponent.key" />
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
