<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useApiStore, pinia } from '../store/api';

const router = useRouter();
const game = ref(null);
const studioName = ref('');

onMounted(async () => {
  const gameId = Number(router.currentRoute.value.params.id);
  const gameData = await useApiStore(pinia).fetchGame(gameId);
  game.value = gameData!;
  const gameString = localStorage.getItem('currentGame');
  game.value = JSON.parse(gameString!);
  await useApiStore(pinia).fetchStudio(game.value!.studioID);
  studioName.value = await obtainStudio();
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
</script>


<template>
  <div class="page" v-if="game">
    <div class="container-images">
      <!-- Imagen principal -->
      <img src="/src/assets/ForzaHorizon5_mainImage.jpg" class="main-image">
      <!-- Contenedor de miniaturas -->
      <div class="thumbnail-container">
        <!-- Iteración sobre las miniaturas -->
        <img src="/src/assets/ForzaHorizon5_secondImage.jpg" class="thumbnail">
        <img src="/src/assets/ForzaHorizon5_thirdImage.jpg" class="thumbnail">
        <img src="/src/assets/ForzaHorizon5_forthImage.jpg" class="thumbnail">
        <!-- Aquí podrías incluir más miniaturas si fuera necesario -->
      </div>
    </div>
    <div class="side-container">
      <!-- Aquí irá el contenido relacionado con el juego -->
      <img src="/src/assets/ForzaHorizon5_gameImage.jpg" class="side-image">
      <div class="side-text">
        <p>{{ game.synopsis }}</p>
        <p class="release-date"><strong>FECHA DE LANZAMIENTO:&nbsp;</strong> {{ formattedReleaseDate }}</p>
        <br>
        <strong>ESTUDIO:&nbsp;</strong> <span>{{ studioName }}</span>
        <br>
        <div class="categories">
          <strong>CATEGORÍAS:&nbsp;</strong>
          <span v-for="(category) in categories(game.categories)" :key="category" class="category">{{ category }}</span>
        </div>

      </div>
    </div>
  </div>
</template>

<style scoped>
strong{
  font-family: var(--font-orbitron) sans-serif;
  font-weight: 200;
  right: 3%;
}
.page {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  min-height: 80vh;
  background-color: #002d2d;
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
  background-color: #cccccc;
  margin-bottom: 20px;
  border-radius: 20px;
}

.thumbnail-container {
  display: flex;
  justify-content: space-evenly;
  margin-top: 20px;
  width: 800px;
}

.thumbnail {
  width: 180px;
  height: 120px;
  background-color: #cccccc;
  border-radius: 8px;
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
  height: 250px;
  background-color: #cccccc;
  margin-bottom: 10px;
  border-radius: 10px;
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
.categories{
  position: relative;
  margin-top: 100px;
}

.categories {
  display: flex;
  flex-wrap: wrap;
  margin-top: 10px;
}

.category {
  position: relative;
  bottom: 8px;
  background-color: var( --color-black);
  color: var(--neutral-colors-white);
  padding: 2px 5px;
  box-shadow: 3px 3px 4px 0 var(--color-blue);
  margin: 5px;
  font-size: var(--text-smallest-regular-size);
  text-transform: uppercase;
}

/* margin-right: 10px;
  top: 5%;
  position: relative;
  left: -15px;
  background-color: var(--color-dark-blue);
  color: var(--neutral-colors-white);
  padding: 0px 5px;
  box-shadow: 3px 3px 4px 0 var(--color-blue); */

</style>
