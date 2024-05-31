<script setup lang="ts">
import CarouselItem from '@/components/CarouselItem.vue';
import GridItem from '@/components/GridItem.vue';
import CardItem from '@/components/CardItem.vue';
import SearchBar from '@/components/SearchBar.vue';
import CategoriesItem from '@/components/CategoriesItem.vue';
import FiltersStudioItem from '@/components/FiltersStudioItem.vue';
import SlideItem from '@/components/SlideItem.vue';
import OrderByItem from '@/components/OrderByItem.vue';

import { ref } from 'vue';

// Variable reactiva para la categoría seleccionada
const selectedValues = ref<[] | null>(null);
const selectedOrder = ref<string | null>(null);
const selectedStudio = ref<string | null>(null);
const maxPrice = ref<number | null>(null);

// Manejar el evento emitido por CategoriesItem
const handleCategorySelected = (values: [] | null) => {
  selectedValues.value = values;
};

const handleOrderChanged = (newOrder: string | null) => {
  selectedOrder.value = newOrder;
};

const handleStudioChanged = (newStudio: string | null) => {
  selectedStudio.value = newStudio;
};

const handlePriceChanged = (newPrice: number | null) => {
  maxPrice.value = newPrice;
};
</script>

<template>
  <CarouselItem />
  <SearchBar />
  <GridItem />
  <div class="columns">
    <CardItem class="cards" :selectedValues="selectedValues" :selectedOrder="selectedOrder" :selectedStudio="selectedStudio" :maxPrice="maxPrice" />
    <div class="filters">
      <div class="categories">
        <p>Categories</p>
        <CategoriesItem @categorySelected="handleCategorySelected" />
      </div>
      <div class="filter-values">
        <OrderByItem @orderChanged="handleOrderChanged" />
        <SlideItem @priceChanged="handlePriceChanged" />
        <FiltersStudioItem @studioChanged="handleStudioChanged" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.columns {
  display: flex;
  flex-direction: row;
}
.cards {
  flex: 3;
}
.categories {
  background-color: var(--color-blue);
  height: fit-content;
}
.filters {
  flex: 1;
}
p {
  font-family: var(--font-archivo-black);
}
</style>


<style scoped>
.columns{
    display: flex;
    flex-direction: row;
}
.cards{
    flex:3;
}
.categories{
    background-color: var(--color-blue);
    height: fit-content;
}
.filters{
    flex: 1;
}
.filter-values{
    background-color: var(--color-yellow);
    color: var(--neutral-colors-white);
}
p{
    font-family: var(--font-archivo-black);
}
</style>