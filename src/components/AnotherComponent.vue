<script setup lang="ts">
import { useApiStore, pinia } from '../store/api';
import { ref, onMounted, watch } from 'vue';
import s3Service from '../services/s3Service';

const props = defineProps<{ gameData: any }>();
const gameSelected = ref<{ name?: string; description?: string } | null>(null);
const isLoading = ref(true);
const isDownloading = ref(false);

const fetchGame = async () => {
  isLoading.value = true;
  const game = await useApiStore(pinia).fetchGame(props.gameData);
  if (game) {
    const studio = `Studio${game.studioID}`;
    game.imageUrl = await s3Service.getImageUrl(studio, "Game"+game.gameID, 1);
  }
  gameSelected.value = game;
  isLoading.value = false;
};

const simulateDownload = () => {
  isDownloading.value = true;
  setTimeout(() => {
    isDownloading.value = false;
    alert('Download complete, enjoy ;)');
  }, 3000); // 3 segundos para completar la animación
};

// Fetch the game data when the component is mounted or when the props change
onMounted(fetchGame);
watch(() => props.gameData, fetchGame);
</script>

<template>
  <div>
    <div v-if="isLoading">Loading...</div>
    <div v-else>
      <h1 class="title">{{ gameSelected?.name || 'GAME TITLE' }}</h1>
      <hr>
      <div class="first-container">
        <div class="left">
          <button 
            class="download-button" 
            @click="simulateDownload" 
            :disabled="isDownloading"
          >
            <span v-if="!isDownloading">DOWNLOAD</span>
            <span v-else class="progress-bar-container">
              <span class="progress-bar animated-progress-bar"></span>
            </span>
          </button>
        </div>
        <div class="right">
          <div class="container-image">
            <img :src="gameSelected?.imageUrl" alt="Game Image" class="main-image">
          </div>
          <div class="text-container">
            <p>
              {{ gameSelected?.synopsis || 'No synopsis available.' }}
            </p>
          </div>
        </div>
      </div>
      <div class="scnd-container">
        <h1 class="title">DESCRIPTION</h1>
        <hr>
        <p class="description-text">
          {{ gameSelected?.description || 'No description available.' }}
        </p>
      </div>
    </div>
  </div>
</template>





<style scoped>

.main-image {
  max-width: 100%;
  border-radius: 10px;
}

.title {
  font-family: var(--font-archivo-black);
  color: var(--neutral-colors-white);
  margin-top: 20px;
}

.download-button {
  display: block;
  width: 200px;
  margin: 20px 0;
  padding: 10px;
  background-color: #000;
  color: #fff;
  border: none;
  cursor: pointer;
  height: 50px;
  position: relative;
  overflow: hidden;
}

.download-button:disabled {
  cursor: not-allowed;
}

.progress-bar-container {
  display: block;
  width: 100%;
  height: 100%;
  background-color: #444;
  position: relative;
  overflow: hidden;
}

.progress-bar {
  display: block;
  height: 100%;
  background-color: var(--color-yellow);
}

.animated-progress-bar {
  animation: progress 3s linear forwards;
}

@keyframes progress {
  0% { width: 0; }
  100% { width: 100%; }
}


hr {
  width: 95%;
  margin-left: 20px;
  border-color: #000;
  margin-bottom: 10px;
}

h1 {
  margin-left: 20px;
  font-family: var(--font-archivo-black);
}

.container-image {
  display: flex;
  justify-content: center;
  height: 40%;
  margin-top: 40px;
  margin-bottom: 20px;
}

.text-container {
  text-align: center;
  width: 80%;
}

.description-text{
  width: 95%;
  margin-left: 20px;
  margin-bottom: 40px;
}

.first-container {
  display: flex;
  gap: 10px;
  margin-bottom: -100px;
  margin-left: 20px;
  margin-right: 20px;
}

.left {
  flex: 1.25;
  display: flex;
  justify-content: center;
  align-items: center;
}

.right {
  flex: 2.75;
  display: flex;
  flex-direction: column;
  align-items: center;
}
p{
  text-align: justify;
  line-height: 30px;
  font-family: var(--font-roboto);
  color: var(--neutral-colors-white);
}
</style>
