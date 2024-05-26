<template>
    <div class="total-estimated">
      <div class="header">
        <span>Total Estimated</span>
        <span class="price">PRICE</span>
      </div>
      <p class="paragraph">Sales tax will be calculated during checkout (if applicable)</p>
      <button>Go To Payment</button>
    </div>
  </template>
  
  <script setup lang="ts">
      
  </script>
  
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
  