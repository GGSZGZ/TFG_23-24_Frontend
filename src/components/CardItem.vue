<script setup lang="ts">
import { useApiStore, pinia } from '../store/api';
import { ref, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';
import s3Service from '../services/s3Service';


const props = defineProps<{
  selectedValues: string | null;
  selectedOrder: string | null;
  selectedStudio: string | null;
  maxPrice: number | null;
}>();

const games = ref([]);
const filteredGames = ref([]);

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const options = { month: 'short', day: 'numeric', year: 'numeric' };
  return date.toLocaleDateString('en-US', options);
};

const categories = (category: string) => {
  return category.split(',').map(c => c.trim());
};

const calculateDiscountedPrice = (price: number, discount: number) => {
  return (price - (price * (discount / 100))).toFixed(2);
};

const fetchGames = async (category: string | null) => {
  const apiStore = useApiStore(pinia);
  const maxPrice = props.maxPrice !== null ? props.maxPrice : undefined;

  let orderDate: string | undefined;
  let orderPrice: string | undefined;
  let orderName: string | undefined;

  switch (props.selectedOrder) {
    case 'Price (Low to High)':
      orderPrice = 'asc';
      break;
    case 'Price (High to Low)':
      orderPrice = 'desc';
      break;
    case 'Date (Close to Further)':
      orderDate = 'asc';
      break;
    case 'Date (Further to Close)':
      orderDate = 'desc';
      break;
    case 'Name (A-Z)':
      orderName = 'asc';
      break;
    case 'Name (Z-A)':
      orderName = 'desc';
      break;
    default:
      break;
  }

  if (category === 'None') {
    category = undefined;
  }

  try {
    const gamesData = await apiStore.fetchGamesGameShop(1, category, maxPrice, orderDate, orderPrice, orderName);

    games.value = await Promise.all(gamesData.map(async game => {
      const imageUrl = await s3Service.getImageUrl(`Studio${game.studioID}`, `Game${game.gameID}`, 1);
      const finalPrice = game.discount > 0
        ? calculateDiscountedPrice(game.price, game.discount)
        : game.price;
      return { ...game, imageUrl, finalPrice };
    }));

    filterGames();
  } catch (error) {
    games.value = [];
    filteredGames.value = [];
  }
};

const filterGames = () => {
  if (props.selectedStudio !== "None") {
    filteredGames.value = games.value.filter(game => {
      const matchesStudio = game.studioID === props.selectedStudio;
      return matchesStudio;
    });
  } else {
    filteredGames.value = games.value;
  }
};


onMounted(() => {
  fetchGames(props.selectedValues);
});

watch(() => props.selectedValues, (newCategory) => {
  fetchGames(newCategory);
});

watch(() => props.selectedStudio, () => {
  filterGames();
});

watch(() => props.maxPrice, () => {
  fetchGames(props.selectedValues);
});

watch(() => props.selectedOrder, () => {
  fetchGames(props.selectedValues);
});
const router = useRouter();

const navigateToGame = (id: any) => {
  router.push({ name: 'game', params: { id: id } });
};
</script>

<template>
  <v-container class="cards-container" fluid>
    <div class="cards">
      <div v-if="filteredGames.length === 0" class="no-games">
        Games not found
      </div>
      <div v-else>
        <div class="card" v-for="game in filteredGames" :key="game.gameID" @click="navigateToGame(game.gameID)">
          <img :src="game.imageUrl" class="card-image">
          <div class="card-content">
            <h2 class="card-title">{{ game.name }}</h2>
            <div class="card-subtitle">
              <span v-for="(category) in categories(game.categories)" :key="category" class="category">{{ category }}</span>
            </div>
            <div class="releaseDate">{{ formatDate(game.releaseDate) }}</div>
            <div v-if="game.discount > 0" class="discounted-price">
              <span class="discount">-{{ game.discount }}%</span>
              <span class="original-price">{{ game.price }}€</span>
              <span class="current-price">{{ game.finalPrice }}€</span>
            </div>
            <p v-else class="card-price">{{ game.price }}€</p>
          </div>
          <button class="card-button">Add To Cart</button>
        </div>
      </div>
    </div>
  </v-container>
</template>

<style scoped>
.no-games {
  text-align: center;
  font-size: 1.5em;
  margin-top: 2em;
  color: #888;
}


.cards-container {
  height: 900px;
  overflow-y: hidden;
  transition: overflow-y 0.2s ease;
}
.cards-container:hover {
  overflow-y: auto;
}
  /* Custom scrollbar for WebKit browsers */
.cards-container::-webkit-scrollbar {
  width: 8px; /* Width of the scrollbar */
}

.cards-container::-webkit-scrollbar-track {
  background:  rgba(241, 241, 241, 0.5); /* Background of the scrollbar track */
  border-radius: 4px;
}

.cards-container::-webkit-scrollbar-thumb {
  background: var(--neutral-colors-white); /* Color of the scrollbar thumb */
  border-radius: 4px;
}

.cards-container::-webkit-scrollbar-thumb:hover {
  background: var(--color-black); /* Color of the scrollbar thumb on hover */
}


.cards {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 10px;
}

.card {
  margin-top: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 900px;
  height: 200px;
  position: relative;
  background-color: var(--color-black);
  border-radius: 20px;
  overflow: hidden;
}

.card:hover {
  transform: scale(1.1);
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
  bottom: 8px;
  margin-bottom: 10px;
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
  margin-bottom: 10px;
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
  margin-bottom: 10px;
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
  height: auto; /* Cambia de 40px a auto para permitir que el contenedor crezca en altura */
  display: flex;
  flex-wrap: wrap;
  color: var(--neutral-colors-white);
  font-family: var(--font-orbitron);
  padding: 10px;
  width: auto;
  white-space: normal;
  max-width: 520px;
}

.releaseDate {
  font-family: var(--font-orbitron) sans-serif;
  font-weight: 200;
  right: 3%;
}
.card-subtitle{
  padding: 0;
  padding-top: 5px;
  padding-left: 5px;
  max-width: 520px;
  gap: 10px;
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
