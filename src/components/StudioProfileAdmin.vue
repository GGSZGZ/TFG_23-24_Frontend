<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
import { useApiStore, pinia } from '../store/api';

// Definimos variables reactivas para almacenar los datos del estudio y el estado de edición
const studioData = ref(null);
const isEditing = ref(false);
const editedData = reactive({
  name: '',
  fundation: '',
  country: '',
  website: '',
  emailContact: '',
  emailLogin: '',
  password: ''
});

onMounted(async () => {
  const studios = await useApiStore(pinia).fetchStudios();
  // TODO: obtener el email de login del estudio desde el localStorage
  const emailLogin = 'studio1@gmail.com';
  const foundStudio = checkStudio(emailLogin, studios);
  if (foundStudio) {
    studioData.value = foundStudio;
    //copia todas las propiedades de foundStudio al objeto editedData.
    Object.assign(editedData, foundStudio);

    
  }
});

function checkStudio(email: string, studios: any) {
  return studios.find((studio: any) => studio.emailLogin === email);
}

const enableEditing = () => {
  isEditing.value = true;
};

const saveChanges = async () => {
  const apiStore = useApiStore(pinia);

  // Validar campos vacíos
  if (!editedData.name.trim() || !editedData.country.trim() || !editedData.password.trim()) {
    alert('Todos los campos deben estar llenos.');
    return;
  }
   // Validación del correo electrónico
   if (!editedData.emailLogin.endsWith('@gmail.com') || editedData.emailLogin.split('@')[0].trim() === '') {
    editedData.emailLogin = `${editedData.name.toLowerCase()}@gmail.com`;
  }
  if (!editedData.emailContact.endsWith('@gmail.com') || editedData.emailContact.split('@')[0].trim() === '') {
    editedData.emailContact = `${editedData.name.toLowerCase()}@gmail.com`;
  }

  // Crear un objeto plano con los datos editados
  const studioPayload = { ...editedData };

  // Eliminar las propiedades que quieres quitar
  delete studioPayload.games;
  delete studioPayload.studioID;
  delete studioPayload.fundation;

  await apiStore.fetchUpdateStudio(studioData.value.studioID, studioPayload);
  studioData.value = { ...studioPayload };
  isEditing.value = false;
};

</script>

<template>
    <div class="card" v-if="studioData">
        <img src="/src/assets/cyber_site.jpg" alt="Descripción de la imagen" class="card-image">
        <div class="card-content">
            <div class="card-column">
                <div class="card-username">
                    <p class="username-title">Name</p>
                    <template v-if="isEditing">
                        <input v-model="editedData.name" class="editable-input" />
                    </template>
                    <template v-else>
                        <h2 class="username-subtitle">{{ studioData.name }}</h2>
                    </template>
                </div>
                <div class="card-name">
                    <p class="name-title">Country</p>
                    <template v-if="isEditing">
                        <input v-model="editedData.country" class="editable-input" />
                    </template>
                    <template v-else>
                        <h2 class="name-subtitle">{{ studioData.country }}</h2>
                    </template>
                </div>
                <div class="card-name">
                    <p class="name-title">Website</p>
                    <template v-if="isEditing">
                        <input v-model="editedData.website" class="editable-input" />
                    </template>
                    <template v-else>
                        <h2 class="name-subtitle">{{ studioData.website }}</h2>
                    </template>
                </div>
            </div>
            <div class="card-column">
                <div class="card-email">
                    <p class="email-title">Email-Contact</p>
                    <template v-if="isEditing">
                        <input v-model="editedData.emailContact" class="editable-input" />
                    </template>
                    <template v-else>
                        <h2 class="email-subtitle">{{ studioData.emailContact }}</h2>
                    </template>
                </div>
                <div class="card-email">
                    <p class="email-title">Email-Login</p>
                    <template v-if="isEditing">
                        <input v-model="editedData.emailLogin" class="editable-input" />
                    </template>
                    <template v-else>
                        <h2 class="email-subtitle">{{ studioData.emailLogin }}</h2>
                    </template>
                </div>
                <div class="card-phone">
                    <p class="phone-title">Password</p>
                    <template v-if="isEditing">
                        <input v-model="editedData.password" type="password" class="editable-input" />
                    </template>
                    <template v-else>
                        <h2 class="phone-subtitle">{{ studioData.password }}</h2>
                    </template>
                </div>
            </div>
        </div>
        <template v-if="isEditing">
            <button class="card-button" @click="saveChanges">Confirm</button>
        </template>
        <template v-else>
            <button class="card-button" @click="enableEditing">Edit Profile</button>
        </template>
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
  
  .card-button {
      position: absolute;
      bottom: 20px;
      right: 20px;
      background-color: var(--color-black);
      color: var(--neutral-colors-white);
      border: none;
      padding: 10px 20px;
      border-radius: 5px;
      cursor: pointer;
      outline: none;
      font-family: var(--font-roboto);
  }
  
  .card-button:hover {
      color: var(--color-blue);
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
  
  