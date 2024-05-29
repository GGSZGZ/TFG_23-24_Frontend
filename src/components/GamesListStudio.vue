<script setup lang="ts">
import { ref, watch, onMounted, computed } from 'vue';
import { useApiStore, pinia } from '../store/api';
import { useRouter } from 'vue-router';
import { defineProps } from 'vue';

// Definir la prop que recibirá la categoría seleccionada
const props = defineProps<{ selectedCategory: string | null }>();

const games = ref([]);


const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const options = { month: 'short', day: 'numeric', year: 'numeric' };
  return date.toLocaleDateString('en-US', options);
};

const categories = (category: string) => {
  return category.split(',');
}

onMounted(async () => {
    //CHANGE ID FOR THE ONE I RECEIVE
    const fetchGames = await useApiStore(pinia).fetchGamesStudio(4);
    games.value = fetchGames;
});

const calculateDiscountedPrice = (price: number, discount: number) => {
  return (price - (price * (discount / 100))).toFixed(2);
};

const calculatePrice = (price: number, discount: number) => {
  const finalPrice = discount > 0 ? parseFloat(calculateDiscountedPrice(price, discount)) : price;
  return finalPrice.toFixed(2);
};

const router = useRouter();
const navigateToGame = (id: any) => {
  router.push({ name: 'game', params: { id: id } });
};

// Filtrar juegos por categoría seleccionada
const filteredGames = computed(() => {
  if (!props.selectedCategory || props.selectedCategory === "Ninguna") {
    return games.value;
  }
  return games.value.filter(game => game.categories.includes(props.selectedCategory));
});
</script>

<template>
  <v-container class="cards-container" fluid>
    <div class="cards">
      <div class="card" v-for="(game, index) in filteredGames" :key="index" @click="navigateToGame(game.gameID)">
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
      </div>
    </div>
  </v-container>
</template>






<style scoped>
.cards-container {
  height: 610px;
  overflow-y: auto;
  scrollbar-width: none;
  margin-left: 10%;
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

.card:hover {
  transform: scale(1.03);
  transition: transform 0.3s ease;
  cursor: pointer;
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
</style>