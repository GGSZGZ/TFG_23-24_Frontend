<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useApiStore, pinia } from '../store/api';

const router = useRouter();
const game = ref(null);

onMounted(async () => {
  const gameId = Number(router.currentRoute.value.params.id);
  const gameData = await useApiStore(pinia).fetchGame(gameId);
  game.value = gameData!;
});




</script>

<template>
    <div class="description" v-if="game!=null">
      <h2>About This Game</h2>
      <hr class="line" />
      <p>
        {{ game.description }}
      </p>
    </div>
  </template>
  
  <style scoped>
  .description {
    padding: 20px;
    margin: 10px 0;
    font-family: var(--font-archivo-black);
    color: var(--neutral-colors-white);
  }
  hr {
    width: 100%;
    border-color: var(--neutral-colors-white);
    margin-top: 10px;
    margin-bottom: 10px;
  }
  p{
    text-align: justify;
    line-height: 1.6;
    font-family: var(--font-roboto);
  }
  </style>
  