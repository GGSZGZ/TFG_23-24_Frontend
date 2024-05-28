<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useApiStore, pinia } from '../store/api';
import { jwtDecode } from 'jwt-decode';

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

const addToCart =async () => {
 const user= localStorage.getItem('jwtToken');
 if(!user || user== 'null') {
  alert('Debes iniciar sesión como usuario para comprar un juego.')
  }else{
    const decodedToken = jwtDecode(user) as { id: number };
    
    //compruebo que el user no tenga ya ese juego en la biblioteca
   const gamesUser= await useApiStore(pinia).fetchGamesLibraryGameUser(decodedToken.id);
   let exist=false;
   gamesUser.forEach((libraryGame:any) => {
      if(libraryGame.gameID==game.value!.gameID) {
        alert('Error, cannot buy same game twice');
        exist=true;
      }
   });
   if(exist==false){
    const message = await useApiStore(pinia).fetchPostGameShoppingCart(decodedToken.id,game.value!.gameID);
    if(message=='Juego añadido al carrito correctamente'){
        router.push({ name: 'cart'});
    }else{
      alert('Error, cannot buy the game twice.');
    }
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
  