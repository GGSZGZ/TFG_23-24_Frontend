<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useApiStore, pinia } from '../store/api';
import s3Service from '../services/s3Service';

const router = useRouter();
const game = ref(null);
const studioName = ref('');
const currentSlide = ref(0);  // Controlador del carrusel
const images = ref([]);


onMounted(async () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
  const gameId = Number(router.currentRoute.value.params.id);
  const gameData = await useApiStore(pinia).fetchGame(gameId);
  game.value = gameData!;
  await useApiStore(pinia).fetchStudio(game.value!.studioID);
  studioName.value = await obtainStudio();

  // Llena el array de imágenes con las URLs del S3
  const studio = 'Studio' + game.value.studioID;
  const gameid = game.value.gameID;
  const gameName = `Game${gameid}`;

  // Llena el array de imágenes con las URLs del S3
  for (let i = 1; i <= 5; i++) {
    const imageUrl = await s3Service.getImageUrl(studio, gameName, i);
    images.value.push(imageUrl);
  }
});

const formattedReleaseDate = computed(() => {
  if (game.value) {
    const releaseDate = new Date(game.value.releaseDate);
    return releaseDate.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  }
  return '';
});

async function obtainStudio() {
  const studioString = localStorage.getItem('studioGame');
  const studio = JSON.parse(studioString!);
  return studio.name;
}

const categories = (category: string) => {
  return category.split(',');
}

function changeSlide(index: number) {
  currentSlide.value = index;
}
</script>

<template>
  <div class="page" v-if="game">
    <div class="container-images">
      <!-- Componente de Carrusel con clase personalizada  -->
      <v-carousel v-model="currentSlide" hide-delimiters  show-arrows="hover" cycle class="custom-carousel">
        <v-carousel-item v-for="(src, i) in images.slice(1)" :key="i">
          <v-img :src="src" class="main-image" contain></v-img>
        </v-carousel-item>
      </v-carousel>
      <!-- Contenedor de miniaturas -->
      <div class="thumbnail-container">
        <!-- Iteración sobre las miniaturas -->
        <img v-for="(src, index) in images.slice(1)" :key="index" :src="src" class="thumbnail" @click="changeSlide(index)">
      </div>
    </div>
    <div class="side-container">
      <!-- Aquí irá el contenido relacionado con el juego -->
      <img :src="images[0]" class="side-image">
      <div class="side-text">
        <p>{{ game.synopsis }}</p>
        <p class="release-date"><strong>DATE PUBLISHED:&nbsp;</strong> {{ formattedReleaseDate }}</p>
        <br>
        <strong>STUDIO:&nbsp;</strong>
        <router-link :to="'/studio/' + game.studioID" class="studio-link">{{ studioName }}</router-link>
        <br>
        <div class="categories">
          <strong>CATEGORIES:&nbsp;</strong>
          <span v-for="(category) in categories(game.categories)" :key="category" class="category">{{ category }}</span>
        </div>
      </div>
    </div>
  </div>
</template>




<style scoped>

.studio-link {
  color: var(--neutral-colors-white);
  transition: color 0.3s ease;
  text-decoration: none;
}
.studio-link:hover {
  color: var(--color-blue);
  text-decoration: underline;
}

strong {
  font-family: var(--font-orbitron) sans-serif;
  font-weight: 200;
  right: 3%;
}

.page {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  min-height: 80vh;
}

.container-images {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 40px;
  margin-top: 5%;
}

.main-image {
  width: 800px;
  height: 400px;
  margin-bottom: 0px;
  object-fit: fill;
}

.thumbnail-container {
  display: flex;
  justify-content: space-evenly;
  margin-top: -60px;
  width: 800px;
  border-radius: 100px;
  position: relative;
  z-index: 1;
}

.thumbnail {
  width: 180px;
  height: 120px;
  background-color: #cccccc;
  border-radius: 8px;
  cursor: pointer;
  position: relative;
  z-index: 2;
  object-fit: cover;
}

.side-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 5%;
  margin-left: 40px;
}

.side-image {
  width: 400px;
  height: auto;
  background-color: #cccccc;
  margin-bottom: 10px;
  border-radius: 10px;
  object-fit: contain;
}

.side-text {
  width: 400px;
  padding: 10px;
  color: #ffffff;
  text-align: justify;
  font-family: 'Roboto', sans-serif;
}

.release-date,
.studio,
.categories {
  margin-top: 10px;
}

.categories {
  position: relative;
  margin-top: 10px;
}

.categories {
  display: flex;
  flex-wrap: wrap;
  margin-top: 10px;
}

.category {
  position: relative;
  bottom: 8px;
  background-color: var(--color-black);
  color: var(--neutral-colors-white);
  padding: 2px 5px;
  box-shadow: 3px 3px 4px 0 var(--color-blue);
  margin: 5px;
  font-size: var(--text-smallest-regular-size);
  text-transform: uppercase;
}

  ::v-deep .v-btn--variant-elevated {
    background: transparent;
    color: var(--neutral-colors-white);
}

@media (max-width: 750px){
  .page{
    display: block;
    min-height: 0;
  }
  .main-image {
    width: 400px;
    height: 400px;
    margin-bottom: 0px;
    margin-left: 40px;
    object-fit: fill;
  }
  .thumbnail-container {
    display: grid;
    grid-template-columns: repeat(2, 1fr); /* Crea dos columnas de igual tamaño */
    grid-template-rows: repeat(2, 1fr); /* Crea dos filas de igual tamaño */
    gap: 10px; /* Espacio entre las imágenes */
    margin-top: -60px;
    width: 400px;
    border-radius: 100px;
    position: relative;
    z-index: 1;
    margin-left: 40px;
  }
  .thumbnail-container img {
    width: 100%; /* Ajusta el ancho de la imagen al tamaño de la celda */
    height: auto; /* Mantiene la proporción de la imagen */
    border-radius: 10px; /* Ajusta esto si quieres que las imágenes tengan bordes redondeados */
  }
  .side-container{
    margin-left: 0;
  }
}
</style>


