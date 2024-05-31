<script setup lang="ts">
import { ref, watch } from 'vue';

const min = 0;
const max = 200;
const slider = ref(0);

const emit = defineEmits(['priceChanged']);

const handleTextFieldBlur = () => {
  slider.value = Math.round(slider.value);
  emit('priceChanged', slider.value);
};

watch(slider, (newPrice) => {
  emit('priceChanged', newPrice);
});
</script>

<template>
  <label>Max-Price</label>
  <v-slider
    v-model="slider"
    :max="max"
    :min="min"
    class="align-center"
    hide-details
    color="white"
  >
    <template v-slot:append>
      <v-text-field
        v-model="slider"
        density="compact"
        style="width: 80px"
        type="number"
        hide-details
        single-line
        @blur="handleTextFieldBlur"
      ></v-text-field>
    </template>
  </v-slider>
</template>

<style scoped>
label {
  margin-left: 5px;
  font-family: var(--font-orbitron);
}
</style>
