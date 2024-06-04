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
            <v-col v-for="(category, index) in categories" :key="index" cols="6" class="radio-column">
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
  .scrollable {
    height: 400px;
    overflow-y: hidden;
    transition: overflow-y 0.2s ease;
  }

  .scrollable:hover {
    overflow-y: auto;
  }
  /* Custom scrollbar for WebKit browsers */
.scrollable::-webkit-scrollbar {
  width: 8px; /* Width of the scrollbar */
}

.scrollable::-webkit-scrollbar-track {
  background:  rgba(241, 241, 241, 0.5); /* Background of the scrollbar track */
  border-radius: 4px;
}

.scrollable::-webkit-scrollbar-thumb {
  background: #888; /* Color of the scrollbar thumb */
  border-radius: 4px;
}

.scrollable::-webkit-scrollbar-thumb:hover {
  background: #555; /* Color of the scrollbar thumb on hover */
}
@media (max-width: 750px){
  .v-col-6{
    flex: auto;
    max-width: inherit;
  }
  .scrollable{
    overflow-y: auto;
  }

}
  </style>
  