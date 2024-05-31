<script setup lang="ts">
import { pinia, useApiStore } from '@/store/api';
import { onMounted, ref, watch } from 'vue';

const studios = ref([]);
const selectedStudio = ref<string | null>(null);

const emit = defineEmits(['studioChanged']);

onMounted(async () => {
  studios.value = await useApiStore(pinia).fetchStudios();
});

watch(selectedStudio, (newStudio) => {
  emit('studioChanged', newStudio);
});
</script>

<template>
  <v-container class="scrollable">
    <v-form>
      <v-radio-group v-model="selectedStudio">
        <v-row>
          <v-col v-for="(studio, index) in studios" :key="index" cols="6">
            <v-radio
              :label="studio.name"
              :value="studio.studioID"
              color="blue"
              class="options"
            ></v-radio>
          </v-col>
        </v-row>
      </v-radio-group>
    </v-form>
  </v-container>
</template>

<style scoped>
.v-radio {
  font-family: var(--font-roboto);
  font-size: 10px;
}
.scrollable {
  height: 320px;
  overflow-y: auto;
}
</style>
