<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useApiStore, pinia } from '../store/api';
import {jwtDecode} from 'jwt-decode';

const games = ref([]);
const user = localStorage.getItem('jwtToken');
const decodedToken = jwtDecode(user!) as { id: number };

// Emitir el evento
const emit = defineEmits(['update-price']);

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const options = { month: 'short', day: 'numeric', year: 'numeric' };
  return date.toLocaleDateString('en-US', options);
};

const categories = (category: string) => {
  return category.split(',');
}

onMounted(async () => {
  if (user) {
    const fetchGames = await useApiStore(pinia).fetchGamesShoppingCart(decodedToken.id);
    games.value = fetchGames;

    // Initialize prices and total price in localStorage
    let prices = [];
    let totalPrice = 0;
    games.value.forEach(game => {
      const finalPrice = game.discount > 0 ? parseFloat(calculateDiscountedPrice(game.price, game.discount)) : game.price;
      prices.push({ gameID: game.gameID, price: finalPrice });
      totalPrice += finalPrice;
    });
    localStorage.setItem('prices', JSON.stringify(prices));
    localStorage.setItem('finalPrice', totalPrice.toString());

    // Emitir el evento de actualización de precio
    emit('update-price', totalPrice);
  }
});

const calculateDiscountedPrice = (price: number, discount: number) => {
  return (price - (price * (discount / 100))).toFixed(2);
};

const calculatePrice = (price: number, discount: number) => {
  const finalPrice = discount > 0 ? parseFloat(calculateDiscountedPrice(price, discount)) : price;
  return finalPrice.toFixed(2);
};

const updateLocalStorageAfterDeletion = (gameID: number) => {
  let prices = JSON.parse(localStorage.getItem('prices') || '[]');
  let totalPrice = parseFloat(localStorage.getItem('finalPrice') || '0');

  const gamePrice = prices.find(p => p.gameID === gameID)?.price;
  if (gamePrice !== undefined) {
    totalPrice -= gamePrice;
    prices = prices.filter(p => p.gameID !== gameID);
  }

  localStorage.setItem('prices', JSON.stringify(prices));
  localStorage.setItem('finalPrice', totalPrice.toString());

  // Emitir el evento de actualización de precio
  emit('update-price', totalPrice);
};

const deleteGame = async (gameID: number, event: Event) => {
  event.stopPropagation();
  await useApiStore(pinia).fetchDeleteGameShoppingCart(decodedToken.id, gameID);
  games.value = games.value.filter(game => game.gameID !== gameID);
  updateLocalStorageAfterDeletion(gameID);
};

const deleteAllGames = async () => {
  for (const game of games.value) {
    await useApiStore(pinia).fetchDeleteGameShoppingCart(decodedToken.id, game.gameID);
  }
  games.value = [];
  localStorage.removeItem('prices');
  localStorage.removeItem('finalPrice');

  // Emitir el evento de actualización de precio
  emit('update-price', 0);
};
</script>

<template>
  <v-container class="cards-container" fluid>
    <div class="cards">
      <div class="card" v-for="(game, index) in games" :key="index">
        <img src="/src/assets/ForzaHorizon5_mainImage.jpg" class="card-image">
        <div class="card-content">
          <h2 class="card-title">{{ game.name }}</h2>
          
          <div class="card-subtitle">
            <span v-for="category in categories(game.categories).slice(0, 2)" :key="category" class="category">{{ category }}</span>
          </div>

          <div class="releaseDate">{{ formatDate(game.releaseDate) }}</div>

          <div class="discounted-price" v-if="game.discount > 0">
            <span class="discount">{{ game.discount }}%</span>
            <span class="original-price">{{ game.price }}€</span>
            <span class="current-price">{{ calculatePrice(game.price, game.discount) }}€</span>
          </div>
          <p v-else class="card-price">{{ calculatePrice(game.price, 0) }}€</p>
        </div>
        <button class="card-button" @click.stop="deleteGame(game.gameID, $event)">Delete</button>
      </div>
      <button class="deleteAll" @click="deleteAllGames">Delete All</button>
    </div>
  </v-container>
</template>





<style scoped>
.cards-container {
  height: 610px;
  overflow-y: auto;
  scrollbar-width: none;
}

.cards {
  display: flex;
  flex-direction: column;
}

.card {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 800px;
  height: 200px;
  position: relative;
  background-color: var(--color-black);
  border-radius: 20px;
  overflow: hidden;
  margin-bottom: 10px;
}

.card-image {
  width: 40%;
  height: 90%;
  border-radius: 20px;
  margin-left: 2%;
}

.card-content {
  flex-grow: 1;
  padding: 20px;
}

.card-title {
  bottom: 15px;
  right: 5px;
  position: relative;
  color: var(--neutral-colors-white);
  font-family: var(--font-archivo-black);
}

.card-price {
  font-size: var(--text-smallest-regular-size);
  color: var(--neutral-colors-white);
  background-color: var(--color-dark-blue);
  font-family: var(--font-orbitron);
  box-shadow: 3px 3px 4px 0 var(--color-blue);
  padding: 10px;
  width: min-content;
  position: relative;
  top: 10px;
  right: 2%;
}

.discounted-price {
  display: flex;
  align-items: center;
  font-size: var(--text-smallest-regular-size);
  color: var(--neutral-colors-white);
  background-color: var(--color-dark-blue);
  font-family: var(--font-orbitron);
  box-shadow: 3px 3px 4px 0 var(--color-blue);
  padding: 5px;
  width: min-content;
  position: relative;
  top: 10px;
  right: 2%;
}

.discount {
  background-color: yellow;
  color: black;
  padding: 5px;
  font-size: var(--text-single-100-regular-size);
  font-weight: bold;
  margin-right: 10px;
}

.original-price {
  text-decoration: line-through;
  color: grey;
  margin-right: 10px;
}

.current-price {
  font-size: var(--text-single-100-regular-size);
  color: var(--neutral-colors-white);
}

.card-subtitle,
.releaseDate {
  position: relative;
  bottom: 20px;
  height: 40px;
  display: flex;
  color: var(--neutral-colors-white);
  font-family: var(--font-orbitron);
  padding: 10px;
  width: min-content;
  white-space: nowrap;
}

.releaseDate {
  font-family: var(--font-orbitron) sans-serif;
  font-weight: 200;
  right: 3%;
}

.card-button {
  position: absolute;
  bottom: 10px;
  right: 20px;
  margin-bottom: 5px;
  background-color: var(--color-yellow);
  color: var(--color-black);
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  outline: none;
  font-family: var(--font-roboto);
}

.card-button:hover {
  color: red;
}

.category {
  margin-right: 10px;
  top: 5%;
  position: relative;
  left: -15px;
  background-color: var(--color-dark-blue);
  color: var(--neutral-colors-white);
  padding: 0px 5px;
  box-shadow: 3px 3px 4px 0 var(--color-blue);
}

.deleteAll {
  background-color: var(--color-yellow);
  width: 100px;
  padding: 10px;
  margin-top: 10px;
  margin-right: 20px;
  border-radius: 5px;
  align-self: flex-end;
  font-family: var(--font-roboto);
}

.deleteAll:hover {
  color: red;
}
</style>
