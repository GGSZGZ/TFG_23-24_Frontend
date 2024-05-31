<script setup lang="ts">
import CarouselItem from '@/components/CarouselItem.vue'
import GridItem from '@/components/GridItem.vue'
import CardItem from '@/components/CardItem.vue'
import SearchBar from '@/components/SearchBar.vue'
import CategoriesItem from '@/components/CategoriesItem.vue'
</script>

<template>
    <CarouselItem />
    <SearchBar />
    <GridItem />
    <div class="columns">
        <CardItem class="cards"/>
        <div class="categories">
            <p>Categories</p>
            <CategoriesItem />
        </div>
    </div>
</template>

<style scoped>
.columns{
    display: flex;
    flex-direction: row;
}
.cards{
    flex:3;
}
.categories{
    flex:1;
    background-color: var(--color-blue);
    height: fit-content;
}
p{
    font-family: var(--font-archivo-black);
}
</style>