<script setup lang="ts">
import { useApiStore, pinia } from '../store/api';
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const games = ref([]);

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const categories = (category: string) => {
  return category[0].categories.split(','); 
};

const categoriesSnd = (category: any) => {
  const categoriesArray = category.replace(/'/g, '').split(',');
  return categoriesArray[0];
};

const router = useRouter();

const navigateToGame = (id: any) => {
  router.push({ name: 'game', params: { id: id } });
};

const calculateDiscountedPrice = (price: number, discount: number) => {
  return (price - (price * (discount / 100))).toFixed(2);
};

onMounted(async () => {
  games.value = await useApiStore(pinia).fetchGamesGameShop(1);
  if (games.value.length > 0) {
    games.value.forEach(game => {
      if (game.discount > 0) {
        game.finalPrice = calculateDiscountedPrice(game.price, game.discount);
      } else {
        game.finalPrice = game.price;
      }
    });
  }
});
</script>

<template>
  <div class="titleDiscountGames">Games In Offer</div>
  <div class="centerBlock" v-if="games.length > 0">
    <div class="bloque">
      <div class="principal" @click="navigateToGame(games[0].gameID)">
        <div class="title-date">
          <p class="title">{{ games[0].name }}</p>
          <p class="date">Until {{ formatDate(games[0].releaseDate) }}</p>
        </div>
        <div class="image-container">
          <img src="/src/assets/ForzaHorizon5_mainImage.jpg" alt="" class="imgMin">
        </div>
        <div class="info">
          <div class="categories">
            <span class="category" v-for="(category) in categories(games)" :key="games[0].id">{{ category }}</span>
          </div>
          <div class="price">
            <div class="discount-container" v-if="games[0].discount > 0">
              <span class="discount">{{ games[0].discount }}% OFF</span>
              <span class="second-discount">{{ games[0].price }}€</span>
            </div>
            <div class="final-price">PRICE: {{ games[0].finalPrice }}€</div>
          </div>
        </div>
      </div>
      <div class="grid">
        <div class="grid-item" v-for="(game) in games.slice(1, 5)" :key="game.id" @click="navigateToGame(game.gameID)">
          <div class="title-date">
              <p class="title-min">{{ game.name }}</p>
              <p class="date-min">Until {{ formatDate(game.releaseDate) }}</p>
            </div>
          <div class="image-container">
            <img src="/src/assets/ForzaHorizon5_mainImage.jpg" alt="" class="imgMin">
          </div>
          <div class="info-min">
            <span class="category-min">{{ categoriesSnd(game.categories) }}</span>
            <div class="price-min">
              <div class="discount-original-container" v-if="game.discount > 0">
                <span class="discount-min">{{ game.discount }}% OFF</span>
                <span class="price-original-min">{{ game.price }}€</span>
              </div>
              <span class="price-final-min">PRICE: {{ game.finalPrice }}€</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.centerBlock {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 100px;
  width:95%;
}

.bloque {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--gap-3xs);
  width: 1500px;
  height: 450px;
  position: relative;
  right:2%;
}

.principal, .grid-item {
  display: flex;
  background-color: var(--color-black);
  color: var(--neutral-colors-white);
  padding: 10px;
  position: relative;
  border: 2px solid black;
  border-radius: 10px; 
}
.principal{
  background-color: var(--color-blue);
  color: var(--color-black);
}
.categories {
  position: absolute;
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: 80%;
  top: 10%;
}
.category {
  background-color: var(--color-black);
  color: var(--neutral-colors-white);
  padding: 5px;
  font-size: var(--text-single-200-regular-size);
  font-family: var(--font-orbitron);
  text-align: center;
}

.price {
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  position: relative;
  width: 80%;
  height: 60px;
}
.final-price {
  background-color: var(--color-black);
  color: var(--color-blue);
  font-size: var(--text-smallest-regular-size);
  font-family: var(--font-orbitron);
  padding: 10px;
  width: 100%;
  height: 100%;
  text-align: center;
  font-size: 24px;
}

.info {
  flex: 1;
  top: 40px;
  padding: 10px;
  font-family: var(--font-orbitron);
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}

.image-container {
  flex: 1;
  width: 30%;
}

.imgPrn, .imgMin {
  width: 100%;
  top:10px;
  height: 80%;
  object-fit: cover;
  margin-left: 5%;
  margin-top: 40px;
  border: 3px solid black;
  border-radius: 5px;
}

.info-min {
  flex: 1;
  top: 40px;
  padding: 10px;
  font-family: var(--font-orbitron);
  position: relative;
}

.title-date {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.title-min {
  font-size: var(--text-single-100-regular-size);
  color: var(--color-blue);
  font-family: var(--font-archivo-black);
  position: absolute;
  left: 10px;
  top: 5px;
  width: 50%;
}

.date-min, .date {
  font-size: var(--text-smallest-regular-size);
  color: var(--color-blue);
  font-family: var(--font-roboto);
  position: absolute;
  right: 5px;
  top: 5px;
}


.title{
  color: var(--color-blue);
  font-family: var(--font-archivo-black);
  position: absolute;
  left: 30px;
  top: 5px;
  width: 50%;
  font-size: 35px;
}
.title, .date{
  color: var(--color-black);
}
.date{
  font-size: 24px;
  top:10px;
}

.category-min {
  background-color: var(--color-blue);
  color: var(--color-black);
  padding: 10px;
  font-size: var(--text-single-200-regular-size);
  position: relative;
  font-size: 11px;
  top: 10px;
  margin: 0 auto;
  margin-left: 20px;
  border-radius: 5px;
}

.price-min {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background-color: var(--color-blue);
  padding: 2px;
  border: 1.5px solid black;
  left: 5px;
  position: relative;
  margin-top: 40px;
}

.discount-original-container {
  display: flex;
  align-items: center;
}

.discount-min, .price-original-min {
  margin-right: 10px;
}

.discount-min {
  background-color: var(--color-yellow);
  color: var(--color-black);
  font-size: var(--text-single-200-regular-size);
  font-family: var(--font-orbitron);
  padding: 3px;
  text-align: center;
  flex: none;
  position: relative;
  left: 5px;
}

.price-original-min {
  background-color: var(--color-black);
  font-size: var(--text-smallest-regular-size);
  font-family: var(--font-orbitron);
  color: var(--color-blue);
  padding: 5px;
  position: relative;
  width: 110px;
  text-decoration: line-through;
}

.price-final-min {
  color: var(--color-black);
  font-size: var(--text-single-200-regular-size);
  font-family: var(--font-orbitron);
  font-weight: bold;
  padding: 5px;
  text-align: center;
  width: 100%;
  margin-top: 5px;
}

.grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 10px;
  width: 120%;
}

.grid-item:hover, .principal:hover {
  transform: scale(1.1);
  cursor: pointer;
}

.titleDiscountGames {
  font-size: var(--font-size-9xl);
  color: var(--neutral-colors-white);
  font-family: var(--font-archivo-black);
  margin-left: 10%;
  position: absolute;
  margin-top: 2%;
}
</style>
