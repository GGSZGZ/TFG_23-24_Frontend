<script setup lang="ts">
import { ref, watch, defineEmits } from 'vue';

// Definir el evento que emitirá este componente
const emit = defineEmits(['categorySelected']);

// Lista de categorías
const categories = ref<string[]>([]);

async function loadCategories() {
    try {
        const response = await fetch('/src/assets/gameCategories.json');
        if (!response.ok) {
            throw new Error('Error al cargar las categorías: ' + response.statusText);
        }
        const data = await response.json();
        categories.value = data;
    } catch (error) {
        console.error(error);
    } finally {
        categories.value.unshift("None");
        selectedCategory.value = "None"; // Seleccionar "Ninguna" por defecto
    }
}

loadCategories();

// Variable reactiva para la categoría seleccionada
const selectedCategory = ref<string | null>("None"); // "Ninguna" seleccionada por defecto

// Emitir el evento cada vez que se cambia la categoría seleccionada
watch(selectedCategory, (newCategory) => {
  emit('categorySelected', newCategory);
});
</script>

<template>
    <v-container class="scrollable">
      <v-form>
        <v-radio-group v-model="selectedCategory" color="yellow">
          <v-row>
            <v-col v-for="(category, index) in categories" :key="index" cols="6">
              <v-radio
                :label="category"
                :value="category"
                class="options"
              ></v-radio>
            </v-col>
          </v-row>
        </v-radio-group>
      </v-form>
    </v-container>
</template>



  

  
  <style scoped>
  .v-radio{
    font-family: var(--font-roboto);
    font-size: 10px;
  }
  .scrollable{
    height: 400px;
    overflow-y: auto;
  }
  </style>
  