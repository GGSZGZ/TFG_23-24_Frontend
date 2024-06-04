<script setup lang="ts">
import { useApiStore, pinia } from '../store/api';
import { ref, onMounted } from 'vue';
import { jwtDecode } from 'jwt-decode'; 
import { useRouter } from 'vue-router';
import s3Service from '../services/s3Service';


const games = ref([]);
const token = localStorage.getItem('jwtToken');

if (!token || token === 'null') {
  alert('Debes iniciar sesión como usuario para comprar un juego.');
} else {
  const decodedToken = jwtDecode(token) as { id: number };

  const fetchGames = async () => {
    try {
      games.value = await useApiStore(pinia).fetchGamesLibraryGameUser(decodedToken.id);

      for (const game of games.value) {
        const studio = `Studio${game.studioID}`;
        game.imageUrl = await s3Service.getImageUrl(studio, 'Game'+game.gameID, 1);
        
      }
    } catch (error) {
      console.error('Error fetching games:', error);
    }
  };

  onMounted(fetchGames);
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
    <div class="cards">
      <div class="card" v-for="game in games" :key="game.gameID" @click="handleClick(game)">
        <img :src="game.imageUrl" alt="Game Image" class="card-image">
        <div class="card-content">
          <h2 class="card-title">{{ game.name }}</h2>
          <div class="card-subtitle">
            <span v-for="(category) in categories(game.categories)" :key="category" class="category">{{ category }}</span>
          </div>
          <div class="releaseDate">{{ formatDate(game.releaseDate) }}</div>
        </div>
      </div>
    </div>
  </v-container>
</template>





<style scoped>
.cards-container {
  height: 900px;
  overflow-y: auto;
  scrollbar-width: none; /* Scroll invisible */
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
  width: 900px;
  height: 200px;
  position: relative;
  left: 10%;
  background-color: var(--color-black);
  border-radius: 20px;
  overflow: hidden;
  cursor: pointer;
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
  white-space: nowrap; /* Asegura que los elementos individuales no se envuelvan */
}

@media (max-width: 750px){
  .card{
    display: block;
    width: 280px;
    height: auto;
    position: relative;
    background-color: var(--color-black);
    border-radius: 20px;
    overflow: hidden;
    margin-bottom: 10px;
  }
  .card-image{
    margin-top: 15px;
    margin-left: 15px;
    margin-bottom: 10px;
    width: 90%;
    height: 200px;
  }
}
</style>
