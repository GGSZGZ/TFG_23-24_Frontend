<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useApiStore, pinia } from '../store/api';
import { useRouter } from 'vue-router';
import s3Service from '../services/s3Service';

// Definimos variables reactivas para almacenar los datos del estudio
const studioData = ref(null);
const router = useRouter();
const studioImageUrl = ref('');

onMounted(async () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });

const studioID = Number(router.currentRoute.value.params.id);
  const studioFetch = await useApiStore(pinia).fetchStudio(studioID);
  
  if (studioData) {
    studioData.value = studioFetch;
    studioImageUrl.value = await s3Service.getStudioImageUrl(`Studio${studioID}`);
  }
});

</script>

<template>
    <div class="card" v-if="studioData">
        <img src="/src/assets/ProfileImage.png" alt="Studio Image" class="card-image">
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
  @media (max-width:750px){

    .card{
        display: block;
        height: auto;
        width: 90%;
        left:20px;
        background: linear-gradient(to bottom, var(--color-black), var(--color-dark-blue), var(--color-blue));
    }
    .card-content{
        display: block;
    }
    .card-column{
        margin-left: 0px;
    }
    .card-column:nth-child(2){
        margin-left: 0px;
    }
  }
  </style>
  
  
