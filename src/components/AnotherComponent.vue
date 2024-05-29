<script setup lang="ts">
import { useApiStore, pinia } from '../store/api';
import { ref, onMounted, watch } from 'vue';

const props = defineProps<{ gameData: any }>();
const gameSelected = ref<{ name?: string; description?: string } | null>(null);
const isLoading = ref(true);

const fetchGame = async () => {
  isLoading.value = true;
  gameSelected.value = await useApiStore(pinia).fetchGame(props.gameData);
  isLoading.value = false;
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
          <button class="download-button">DOWNLOAD</button>
        </div>
        <div class="right">
          <div class="container-image">
            <img src="/src/assets/ForzaHorizon5_mainImage.jpg" alt="" class="main-image">
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
  height: 200px;
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
  margin-bottom: 10px;
}

.text-container {
  text-align: center;
  width: 80%;
}

.description-text{
  width: 95%;
  margin-left: 20px;
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
}
</style>
