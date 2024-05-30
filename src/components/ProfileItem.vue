<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
import { useApiStore, pinia } from '../store/api';
import {jwtDecode} from 'jwt-decode';

let userID: number;
const userData = ref(null);
const isEditing = ref(false);
const editedData = reactive({
  surname: '',
  name: '',
  email: '',
  password: ''
});
const errorMessage = ref('');

onMounted(async () => {
  const token = localStorage.getItem('jwtToken');
  if (token && token !== 'null') {
    const decodedToken = jwtDecode(token) as { id: number };
    const apiStore = useApiStore(pinia);
    userID=decodedToken.id;
    userData.value = await apiStore.fetchUser(decodedToken.id);
    if (userData.value) {
      editedData.surname = userData.value.surname;
      editedData.name = userData.value.name;
      editedData.email = userData.value.email;
      editedData.password = userData.value.password;
    }
  }else{
    alert('User not logged.')
  }
});

const enableEditing = () => {
  isEditing.value = true;
};

const saveChanges = async () => {
  // Validación de campos vacíos
  if (!editedData.surname.trim() || !editedData.name.trim() || !editedData.password.trim()) {
    errorMessage.value = 'Todos los campos deben estar llenos.';
    return;
  }

  // Validación del correo electrónico
  if (!editedData.email.endsWith('@gmail.com') || editedData.email.split('@')[0].trim() === '') {
    editedData.email = `${editedData.name.toLowerCase()}@gmail.com`;
  }

  const apiStore = useApiStore(pinia);

  // Crear un objeto plano con los datos editados
  const userPayload = {
    surname: editedData.surname,
    name: editedData.name,
    email: editedData.email,
    password: editedData.password
  };

  await apiStore.fetchUpdateUser(Number(userID), userPayload);
  userData.value = { ...editedData };
  isEditing.value = false;
  errorMessage.value = '';
};
</script>

<template>
  <div class="card" v-if="userData">
    <img src="/src/assets/cyber_site.jpg" alt="Descripción de la imagen" class="card-image">
    <div class="card-content">
      <div class="card-column">
        <div class="card-username">
          <p class="username-title">Username</p>
          <template v-if="isEditing">
            <input v-model="editedData.surname" class="editable-input" />
          </template>
          <template v-else>
            <h2 class="username-subtitle">{{ userData.surname }}</h2>
          </template>
        </div>
        <div class="card-name">
          <p class="name-title">Name</p>
          <template v-if="isEditing">
            <input v-model="editedData.name" class="editable-input" />
          </template>
          <template v-else>
            <h2 class="name-subtitle">{{ userData.name }}</h2>
          </template>
        </div>
      </div>
      <div class="card-column">
        <div class="card-email">
          <p class="email-title">Email</p>
          <template v-if="isEditing">
            <input v-model="editedData.email" class="editable-input" />
          </template>
          <template v-else>
            <h2 class="email-subtitle">{{ userData.email }}</h2>
          </template>
        </div>
        <div class="card-phone">
          <p class="phone-title">Password</p>
          <template v-if="isEditing">
            <input v-model="editedData.password" type="password" class="editable-input" />
          </template>
          <template v-else>
            <h2 class="phone-subtitle">{{ userData.password }}</h2>
          </template>
        </div>
      </div>
    </div>
    <template v-if="isEditing">
      <button class="card-button" @click="saveChanges">Confirmar</button>
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
    height: 250px;
    left: 10%;
    margin-top: 40px;
    background: linear-gradient(to right, var(--color-black), var(--color-dark-blue), var(--color-blue));
    border-radius: 20px;
    overflow: hidden;
}

.card-image {
    width: 20%;
    height: 60%;
    border-radius: 20px;
    margin-left: 3%;
    margin-top: 3%;
}

.card-content {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 20px;
    flex-grow: 1;
}

.card-column {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-right: 20px;
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
