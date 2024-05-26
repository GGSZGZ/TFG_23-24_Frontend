<script setup lang="ts">
import { ref } from 'vue';

const aboutUs = ref({
  title: '',
  sections: []
});

async function loadAboutUs() {
  try {
    const response = await fetch('/src/assets/aboutUs.json');
    if (!response.ok) {
      throw new Error('Error al cargar las categorías: ' + response.statusText);
    }
    const data = await response.json();
    aboutUs.value = data;
  } catch (error) {
    console.error(error);
  }
}
loadAboutUs();
</script>

<template>
  <v-container class="pa-4">
    <v-row>
      <v-col>
        <h1 class="font-weight-bold custom-title">{{ aboutUs.title }}</h1>
        <v-divider class="custom-divider my-4"></v-divider>
      </v-col>
    </v-row>
    <v-row>
      <v-col
        v-for="(section, index) in aboutUs.sections"
        :key="index"
        cols="12"
        md="6"
      >
        <v-card class="pa-4 custom-card">
          <v-card-text>
            <p class="custom-text">{{ section.content }}</p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.pa-4 {
  background-color: var(--color-dark-blue);
  margin-top: 50px;
}

h1.custom-title {
  font-size: var(--font-size-25xl);
  font-family: var(--font-archivo-black);
  color: var(--neutral-colors-white);
}

p.custom-text {
  font-size: var(--font-size-xl);
  font-family: var(--font-roboto);
  color: var(--neutral-colors-white);
}

.custom-card {
  background-color: var(--color-dark-blue);
  border: 2px solid var(--color-black);
}

.custom-divider {
  background-color: var(--neutral-colors-white);
  opacity: inherit;
}
</style>
