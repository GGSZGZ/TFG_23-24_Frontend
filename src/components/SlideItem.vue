<script setup lang="ts">
import { ref, watch } from 'vue';

const min = 0;
const max = 150;
const slider = ref(0);
const roundedSliderValue = ref(0);

const emit = defineEmits(['priceChanged']);

const handleTextFieldBlur = () => {
  let newValue = Math.round(slider.value);
  if (newValue < min) {
    newValue = min;
  } else if (newValue > max) {
    newValue = max;
  }
  slider.value = newValue;
  roundedSliderValue.value = newValue;
  emit('priceChanged', slider.value);
};

const updateSliderFromTextField = () => {
  if (roundedSliderValue.value >= min && roundedSliderValue.value <= max) {
    slider.value = roundedSliderValue.value;
  }
};

watch(slider, (newPrice) => {
  roundedSliderValue.value = Math.round(newPrice);
  emit('priceChanged', roundedSliderValue.value);
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
        v-model="roundedSliderValue"
        density="compact"
        style="width: 80px"
        type="number"
        hide-details
        single-line
        @blur="handleTextFieldBlur"
        @input="updateSliderFromTextField"
      ></v-text-field>
      <v-icon class="ml-2">mdi-currency-eur</v-icon>
    </template>
  </v-slider>
</template>


<style scoped>
label {
  margin-left: 5px;
  font-family: var(--font-orbitron);
}
</style>
