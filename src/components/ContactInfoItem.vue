<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useApiStore, pinia } from '../store/api';

const apiStore = useApiStore(pinia);
const gameShop = ref(null);

onMounted(async () => {
  gameShop.value = await apiStore.fetchGameShop(1);
  updateContactInfo();
});

const contactInfo = ref({
  title: 'Contact Information',
  sections: []
});

function updateContactInfo() {
  contactInfo.value.sections = [
    { label: 'Location', content: gameShop.value?.location },
    { label: 'Contact Number', content: gameShop.value?.contactNumber },
    { label: 'Email', content: gameShop.value?.email }
  ];
}
</script>




<template>
  <v-container class="pa-4" fluid v-if="gameShop">
    <v-row justify="center">
      <v-col cols="12">
        <h1 class="text-center custom-title">{{ contactInfo.title }}</h1>
        <v-divider class="custom-divider"></v-divider>
      </v-col>
    </v-row>
    <v-row class="mt-4" justify="center">
      <v-col cols="12" md="8" lg="6">
        <v-card class="pa-4 d-flex flex-column align-center justify-center black white--text custom-card" height="100%">
          <div v-for="(section, index) in contactInfo.sections" :key="index" class="mb-4">
            <span>{{ section.label }}: {{ section.content }}</span>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
span {
  color: var(--neutral-colors-white);
  font-family: var(--font-archivo-black);
  font-size: var(--font-size-xl); /* Adjusted size for better readability */
  text-align: center;
}
.pa-4 {
  background-color: var(--color-dark-blue);
  margin-top: 50px;
  margin-bottom: 50px;
}

h1.custom-title {
  font-size: var(--font-size-25xl);
  font-family: var(--font-archivo-black);
  color: var(--neutral-colors-white);
}

.custom-card {
  background-color: var(--color-dark-blue);
  border: 2px solid var(--color-black);
  text-align: center;
}

.custom-divider {
  background-color: var(--neutral-colors-white);
  opacity: inherit;
}

.mb-4 {
  margin-bottom: 16px;
}
</style>
