<script setup lang="ts">
import { ref, onMounted, watchEffect } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();
const props = defineProps<{
  finalPrice: number;
}>();

const formattedFinalPrice = ref('0.00');

watchEffect(() => {
  formattedFinalPrice.value = props.finalPrice.toFixed(2);
});
async function navigateToPayment() {
  // almacenar precio si se quiere hacer algo con el luego
  if(formattedFinalPrice.value!=='0.00'){
  router.push({ name: 'payment'});
  }else{
    alert('Need to select at least one game.')
  }
}
</script>

<template>
  <div class="total-estimated">
    <div class="header">
      <span>Total Estimated</span>
      <span class="price">{{ formattedFinalPrice }}€</span>
    </div>
    <p class="paragraph">Sales tax will be calculated during checkout (if applicable)</p>
    <button @click="navigateToPayment">Go To Payment</button>
  </div>
</template>

  
  <style scoped>
  .total-estimated {
    background-color: var(--color-black);
    color: var(--neutral-colors-white);
    padding: 20px;
    width: 300px;
    text-align: center;
    margin-bottom: 10px;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    height: 200px; /* Ajusta la altura según tus necesidades */
    margin-top: 15px;
    font-family: var(--font-archivo-black);
  }
  
  .header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
    font-weight: bold;
  }
  
  .price {
    font-family: var(--font-orbitron);
  }
  
  .paragraph {
    margin-top: auto;
    text-align: justify;
    margin-bottom: 10px; /* Ajusta el margen si es necesario */
    font-family: var(--font-roboto);
  }
  
  button {
    background: linear-gradient(90deg, var(--color-dark-blue) 0%, var(--color-blue) 100%);
    color: white;
    border: none;
    padding: 10px 10px;
    cursor: pointer;
    font-size: 1em;
    align-self: center;
    width: 100%;
    background-size: 200% 100%;
    transition: background-position 0.5s;
  }
  
  button:hover {
    background-position: -100% 0;
  }
  </style>
  