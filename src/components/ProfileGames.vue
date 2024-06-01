<script setup lang="ts">
import { useApiStore, pinia } from '../store/api';
import { ref, onMounted } from 'vue';
import { jwtDecode } from 'jwt-decode'; 
import { useRouter } from 'vue-router';
import s3Service from '../services/s3Service';

const games = ref([]);
const token = localStorage.getItem('jwtToken');


  const fetchGames = async (userId:any) => {
    try {
      const gamesLibrary = await useApiStore(pinia).fetchGamesLibraryGameUser(userId);
      const updatedGames = await Promise.all(gamesLibrary.map(async (game) => {
      const studio = `Studio${game.studioID}`;
      const imageUrl = await s3Service.getImageUrl(studio, "Game"+game.gameID, 1);
      return { ...game, imageUrl };
    }));
    games.value = updatedGames;
    } catch (error) {
      console.error('Error fetching games:', error);
    }
  };

  if (!token || token === 'null') {
  alert('Debes iniciar sesión como usuario para comprar un juego.');
} else {
  const decodedToken = jwtDecode(token) as { id: number };
  onMounted(() => fetchGames(decodedToken.id));
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const options = { month: 'short', day: 'numeric', year: 'numeric' };
  return date.toLocaleDateString('en-US', options);
};

const categories = (category: string) => {
  return category.split(','); 
}

const router = useRouter();
const handleClick = (item: any) => {  
  router.push({ name: 'game', params: { id: item.gameID } });
};
</script>

<template>
  <v-container class="cards-container" fluid>
    <div v-if="games.length>0" class="cards">
      <div class="card" v-for="game in games" :key="game.gameID" @click="handleClick(game)">
        <img :src="game.imageUrl" class="card-image">
        <div class="card-content">
          <h2 class="card-title">{{ game.name }}</h2>
          <div class="card-subtitle">
            <span v-for="(category) in categories(game.categories)" :key="category" class="category">{{ category }}</span>
          </div>
          <div class="releaseDate">{{ formatDate(game.releaseDate) }}</div>
        </div>
      </div>
    </div>
    <div v-else>
      <p>No hay juegos disponibles.</p>
    </div>
  </v-container>
</template>





<style scoped>
.cards-container {
  height: 600px;
  overflow-y: auto;
  scrollbar-width: none;
  margin-left: -10%;
}


.cards {
  display: flex;
  flex-direction: column;
}

.card {
  margin-top: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 800px;
  height: 200px;
  position: relative;
  left: 10%;
  background-color: var(--color-black);
  border-radius: 20px;
  overflow: hidden;
  cursor: pointer;
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
  bottom: 25px;
  right: 2%;
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

.card-subtitle,
.releaseDate { 
  position: relative;
  bottom: 20px;
  height: auto;
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
    max-width: 520px;
    gap: 10px;
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
  white-space: nowrap;
}
</style>
