<script setup lang="ts">
import { useApiStore, pinia } from '../store/api';
import { ref, onMounted } from 'vue';
import s3Service from '../services/s3Service';

const games = ref([]);
const loading = ref(true);

const fetchGames = async () => {
  const response = await useApiStore(pinia).fetchGamesGameShop(1);
  const updatedGames = await Promise.all(response.map(async (game) => {
    const studio = `Studio${game.studioID}`;
    const imageUrl = await s3Service.getImageUrl(studio,'Game'+game.gameID, 1);
    return { ...game, imageUrl };
  }));
  games.value = updatedGames;
  loading.value = false;
};
onMounted(fetchGames);
</script>

<template>
  <div v-if="loading" class="d-flex justify-center align-center" style="height: 400px;">
    <v-progress-circular indeterminate color="primary"></v-progress-circular>
  </div>
  <v-carousel
    v-else
    height="400"
    show-arrows="hover"
    cycle
    hide-delimiter-background
  >
    <v-carousel-item
    v-for="(game, i) in games.slice(0, 5)"
      :key="i"
    >
      <v-sheet
        height="100%"
        class="carousel-slide"
        :style="`background-image: url(${game.imageUrl})`"
      >
        <div class="carousel-content">
          <h3 class="carousel-title">{{ game.name }}</h3>
          <p class="carousel-description">{{ game.synopsis }}</p>
          <p class="carousel-price">PRICE: {{ game.price }}€</p>
        </div>
      </v-sheet>
    </v-carousel-item>
  </v-carousel>
</template>

<style scoped>
.carousel-slide {
  position: relative;
  width: 100%;
  height: 100%; /* Asegura que el contenedor tenga el 100% de la altura */
  display: flex;
  justify-content: center;
  align-items: center;
  background-size: cover; /* Mantiene la proporción de la imagen y la cubre */
  background-position: center; /* Centra la imagen en el contenedor */
  background-repeat: no-repeat;
  color: white;
  text-align: left;
}

.carousel-content {
  position: absolute;
  bottom: 0px;
  left: 0px;
  background-color: rgba(0, 0, 0, 0.6);
  padding: 20px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}

.carousel-title {
  font-size: var(--font-size-25xl);
  font-family: var(--font-archivo-black);
  margin-bottom: 14%;
  margin-left: 5%;
}

.carousel-description {
  font-size: var(--text-single-200-regular-size);
  font-family: var(--font-roboto);
  position: absolute; 
  top: 40%;
  margin-left: 5%;
  width: 30%; 
}

.carousel-price {
  font-size: var(--font-size-xl);
  font-family: var(--font-orbitron);
  font-weight: bold;
  margin-bottom: 10px;
  margin-left: 80%;
}
</style>
