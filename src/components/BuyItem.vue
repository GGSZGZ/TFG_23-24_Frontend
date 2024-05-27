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


const calculateDiscountedPrice = (price, discount) => {
  return (price - (price * (discount / 100))).toFixed(2);
};

const addToCart = () => {
 const user= localStorage.getItem('jwtToken');
 if(!user || user== 'null') {
  alert('Debes iniciar sesión como usuario para comprar un juego.')
  }else{
    //CHECK games of user if is already bought!!!!!!!!!!!!!!!!!
 //SAVE GAMES
    let gamesSelected = JSON.parse(localStorage.getItem('gamesSelected') || '[]');

    // Verificar si el ID de juego ya está presente en el array
    if (!gamesSelected.includes(game.value.gameID)) {
        gamesSelected.push(game.value.gameID);
        // Almacenar el array actualizado en localStorage
        localStorage.setItem('gamesSelected', JSON.stringify(gamesSelected));
        router.push({ name: 'cart'});
    } else {
        alert('No puedes comprar el mismo juego dos veces')
    }
}
};


</script>


<template>
    <div class="buy-section" v-if="game!=null">
      <div class="buy-container">
        <h1>Buy:&nbsp; {{ game.name }}</h1>
      </div>
        <div class="purchase-info">
          <div class="price">{{calculateDiscountedPrice(game.price, game.discount)}}€</div>
          <button class="cart" @click="addToCart(game.gameID)">BUY</button>
        </div>
      
    </div>
  </template>
  
  <style scoped>
  .buy-section {
    /* background-color: #002d2d; */
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 10px;
    width: 100%;
  }
  
  .buy-container {
    width: 100%;
    background-color: var(--color-blue);
    height: 130px;
    padding: 20px;
    font-family: var(--font-archivo-black);
  }
  
  .purchase-info {
    display: flex;
    justify-content: flex-end; /* Alinea los elementos al final (derecha) */
    align-items: center;
    width: 100%; /* Extiende el contenedor a lo largo de toda la sección */
    margin-top: -10px;
    margin-right: 10px;
  }
  
  .price{
    width:max-content;
    padding: 10px;
    border: solid 2px var(--color-black);
    background-color: var(--color-dark-blue);
    color: var(--neutral-colors-white);
    font-family: var(--font-roboto);
  }
  
  .cart {
    background-color: var(--color-yellow);
    padding: 10px;
    color: var(--color-black);
    border: solid 2px var(--color-black);
    margin-right: 20px;
    font-family: var(--font-roboto);
  }
  </style>
  