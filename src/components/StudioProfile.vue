<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useApiStore, pinia } from '../store/api';

// Definimos variables reactivas para almacenar los datos del estudio
const studioData = ref(null);

onMounted(async () => {
  const studios = await useApiStore(pinia).fetchStudios();
  // TODO: obtener el email de login del estudio desde el localStorage
  const emailLogin = 'bandainamco@gmail.com';
  const foundStudio = checkStudio(emailLogin, studios);
  if (foundStudio) {
    studioData.value = foundStudio;
  }
});

function checkStudio(email: string, studios: any) {
  return studios.find((studio: any) => studio.emailLogin === email);
}

</script>

<template>
    <div class="card" v-if="studioData">
        <img src="/src/assets/cyber_site.jpg" alt="Descripción de la imagen" class="card-image">
        <div class="card-content">
            <div class="card-column">
                <div class="card-username">
                    <p class="username-title">Name</p>
                    <h2 class="username-subtitle">{{ studioData.name }}</h2>
                </div>
                <div class="card-name">
                    <p class="name-title">Website</p>
                    <h2 class="name-subtitle">{{ studioData.website }}</h2>
                </div>
            </div>
            <div class="card-column">
                <div class="card-email">
                    <p class="email-title">Email-Contact</p>
                    <h2 class="email-subtitle">{{ studioData.emailContact }}</h2>
                </div>
                <div class="card-name">
                    <p class="name-title">Country</p>
                    <h2 class="name-subtitle">{{ studioData.country }}</h2>
                </div>
            </div>
        </div>
    </div>
</template>


  
  
  
  <style scoped>
  .card {
      position: relative;
      display: flex;
      align-items: flex-start;
      width: 80%;
      height: 390px;
      left: 10%;
      margin-top: 40px;
      margin-bottom: 40px;
      background: linear-gradient(to right, var(--color-black), var(--color-dark-blue), var(--color-blue));
      border-radius: 20px;
      overflow: hidden;
  }
  
  .card-image {
      width: 20%;
      height: 60%;
      border-radius: 20px;
      margin-left: 3%;
      margin-top: 5%;
  }
  
  .card-content {
    margin-top: 50px;
      display: flex;
      flex-direction: row;
      padding: 20px;
      flex-grow: 1;
  }
  
  .card-column {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      margin-left: 50px;
  }
  
  .card-column:nth-child(2) {
      margin-left: 200px;
  }
  
  .username-title,
  .name-title,
  .email-title,
  .phone-title {
      margin-top: 20px;
      color: var(--color-gray);
      font-family: var(--font-orbitron);
  }
  
  .username-subtitle,
  .name-subtitle,
  .email-subtitle,
  .phone-subtitle {
      margin: 0;
      color: var(--neutral-colors-white);
      font-family: var(--font-archivo-black);
  }
  
  .editable-input {
      color: white;
      background-color: transparent;
      border: none;
      border-bottom: 1px solid white;
      padding: 4px;
      font-size: var(--text-single-100-regular-size);
  }
  
  .editable-input:focus {
      outline: none;
  }
  </style>
  
  
