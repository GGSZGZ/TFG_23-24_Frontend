<script setup lang="ts">
import GameItem from '@/components/GameItem.vue'
import BuyItem from '@/components/BuyItem.vue'
import DescriptionItem from '@/components/DescriptionItem.vue'
import SimilarGames from '@/components/SimilarGames.vue'
import GameComments from '@/components/GameComments.vue'
</script>

<template>
  <div class="backgroudCol"></div>
    <GameItem />
    <hr class="line" />
    <div class="table">
        <div class="left-column">
            <BuyItem class="buy-item" />
            <DescriptionItem class="description-item" />
        </div>
        <GameComments class="game-comments"/>
    </div>
    <div class="secondary-content">
        <SimilarGames />
    </div>
</template>

<style scoped>

hr {
    width: 90%;
    border-color: var(--neutral-colors-white);
    margin-left: 5%;
    margin-top: 20px;
}

.secondary-content {
  widtH: 80%;
  flex: 1;
  padding: 20px;
  margin-left: 10%;
}

.table {
  display: grid;
  grid-template-columns: 2fr 1fr; /* Ajusta las fracciones para que Buy y Description ocupen más espacio */
  width: 80%;
  gap: 20px;
  margin-top: 20px;
  margin-left: 10%;
}

.left-column {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.buy-item, .description-item {
  padding: 20px;
  flex: 1;
  margin-bottom: 20px;
}
.description-item{
  margin-top: 100px;
  margin-bottom: 0px;
}

.buy-item{
    padding: 0px;
    position: relative;
    margin-bottom: -100px;
}

.game-comments {
  padding: 20px;
  margin-top: -30px;
}

@media (max-width: 750px){
  .table{
    display: block;
  }
}

</style>