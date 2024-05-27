<script setup lang="ts">
import { ref } from 'vue';

// Lista de categorías
const categories = ref([]);

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
    } finally{
        categories.value.unshift("Ninguna");
    }
}

loadCategories();

// Variable reactiva para la categoría seleccionada
const selectedCategory = ref<string | null>(null);
</script>
<template>
    <v-container class="scrollable">
      <v-form>
        <v-radio-group v-model="selectedCategory">
          <v-row>
            <v-col v-for="(category, index) in categories" :key="index" cols="6">
              <v-radio
                :label="category"
                :value="category"
                color="yellow"
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
  