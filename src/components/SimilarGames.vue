<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useApiStore, pinia } from '../store/api';

const game = ref(null);
const gamesFiltered = ref([]);
const route = useRoute();
const router = useRouter();

onMounted(async () => {
  await loadGame(route.params.id);
});


async function loadGame(gameID : any) {
  const gameData = await useApiStore(pinia).fetchGame(gameID);
  game.value = gameData!;

  const filteredGames = await searchSimilarGames(game.value.categories);
  gamesFiltered.value = filteredGames;
}

async function searchSimilarGames(categories: string) {
  const games = await useApiStore(pinia).fetchGames();

  const currentCategories = categories.split(',').map(category => category.trim());

  const filteredGames = games.filter(g => g.gameID !== game.value.gameID);

  const similarGames = filteredGames.filter(g => {
    const gameCategories = g.categories.split(',').map((category: any) => category.trim());
    return gameCategories.some((category: any) => currentCategories.includes(category));
  });
  return similarGames;
}

const calculateDiscountedPrice = (price, discount) => {
  return (price - (price * (discount / 100))).toFixed(2);
};

const navigateToGame = (gameID: any) => {

  // Navegar al nuevo juego
    router.replace({ name: 'game', params: { id: gameID } });
  // Recargar la página después de un pequeño retraso
  setTimeout(() => {
    window.location.reload();
  }, 0);

  
};


</script>


<template>
  <div class="similar-games" v-if="gamesFiltered.length > 0">
    <h2>Similar Games</h2>
    <hr />
    <div class="game-container">
      <div class="game" v-for="(game, index) in gamesFiltered.slice(0, 6)" :key="game.gameID" @click="navigateToGame(game.gameID)">
        <img src="/src/assets/cyber_site.jpg" class="image">
        <div class="title">{{ game.name }}</div>
        <div class="price-block">
          <div v-if="game.discount > 0" class="discounted-price">
            <span class="original-price">{{ game.price }}€</span>
            <span class="discount-percentage">-{{ game.discount }}%</span>
            <span class="final-price">{{ calculateDiscountedPrice(game.price, game.discount) }}€</span>
          </div>
          <div v-else>
            {{ game.price }}€
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<style scoped>
.similar-games {
  margin: 20px 0;
}
h2 {
  font-family: var(--font-archivo-black);
}
hr {
  width: 100%;
  border-color: #000;
  margin-top: 10px;
  margin-bottom: 10px;
}

.game-container {
  display: flex;
  justify-content: left; /* Alinear los elementos a la izquierda */
  gap: 15px;
}

.game {
  padding: 10px;
  width: 15%;
  background-color: var(--color-black);
  border-radius: 10px;
}
.game:hover {
  transform: scale(1.1);
  cursor: pointer;
}
.image {
  width: 90%;
  height: 150px;
  margin-left: 5%;
  margin-top: 10px;
  border-radius: 5px;
}
.title, .price-block {
  margin-left: 5%;
  padding: 10px;
  font-family: var(--font-roboto);
  color: var(--neutral-colors-white);
}

.discounted-price {
  display: flex;
  align-items: center;
  gap: 5px;
}
.original-price {
  text-decoration: line-through;
  color: gray;
}
.discount-percentage {
  background-color: var(--color-yellow);
  color: black;
  font-weight: bold;
  padding: 2px 5px;
  border-radius: 3px;
}
.final-price {
  font-size: 1.2em;
  color: var(--color-yellow);
  position: relative;
  left: 30px;
}
</style>
