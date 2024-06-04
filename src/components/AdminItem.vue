<script setup lang="ts">
import { ref } from 'vue';
import { VDateInput } from 'vuetify/labs/VDateInput';
import { useApiStore, pinia } from '../store/api';
import { jwtDecode } from 'jwt-decode';

const show1 = ref(false);
const nuevoUser = ref({
  name: '',
  surname: '',
  password: '',
  birthdate: null,
  gmail: '',
  role: ''
});

function isValidEmail(email: string): boolean {
  if (!email.endsWith('@gmail.com') || email.split('@')[0].trim() === '') {
    return false;
  }
  return true;
}
function calcAge(birthDate: Date): number {
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}

function addGame() {

  const { name, surname, password, birthdate, gmail, role } = nuevoUser.value;

  if (!name || !surname || !password || !birthdate || !gmail || !role) {
    alert('Faltan campos por completar');
    return;
  }

  if (!isValidEmail(gmail)) {
    alert('El correo electrónico no es válido');
    return;
  }
let newAge=calcAge(nuevoUser.value.birthdate);

let userAdd={
  name: nuevoUser.value.name,
  surname: nuevoUser.value.surname,
  password: nuevoUser.value.password,
  age: newAge,
  email: nuevoUser.value.gmail,
  registerDate: new Date().toISOString(),
  role: nuevoUser.value.role
}

  
  // Aquí puedes añadir la lógica para enviar los datos al backend
  fetchPostUser(userAdd);

  // Vaciar los campos
  nuevoUser.value.name = '';
  nuevoUser.value.surname = '';
  nuevoUser.value.password = '';
  nuevoUser.value.birthdate = null;
  nuevoUser.value.gmail = '';
  nuevoUser.value.role = '';

}

function updateUserIds(userId : any){
  const objectIds = {
    libraryGameUserID : userId
  }
  useApiStore(pinia).fetchUpdateUser(userId,objectIds);
};


const fetchPostUser = async (values: any) => {
  try {
    const token=await useApiStore(pinia).fetchPostRegisterUser(values,true);
    
    if (token==='User already exists') {
      alert(token)
    }else{
      await postUpdateTables(token);
      alert('El usuario se ha creado correctamente');
      window.location.reload();
    }
  } catch (err) {
    console.error(err);
  }
};

const postUpdateTables = async(token:any)=>{
    

  // Decodificar el token JWT
  const decodedToken = jwtDecode(token) as { id: number };
    postLibraryCommunity(decodedToken.id);
    updateUserIds(decodedToken.id);
}

function postLibraryCommunity(userId : any){
  const libraryUserDTO = {
      addedDate: Date.now,
      userID : userId
    };
    useApiStore(pinia).fetchPostLibraryGameUser(libraryUserDTO);
}


</script>

<template>
  <v-form class="custom-form">
    <v-container>
      <v-row>
        <v-col cols="12" md="4">
          <v-text-field
            clearable
            v-model="nuevoUser.name"
            label="Name"
            placeholder="Paco"
            counter="20"
            required
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="4">
          <v-text-field
            clearable
            v-model="nuevoUser.surname"
            label="Username"
            placeholder="surname"
            required
            counter="30"
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="4">
          <v-text-field
            v-model="nuevoUser.password"
            :append-icon="show1 ? 'mdi-eye' : 'password'"
            :type="show1 ? 'text' : 'password'"
            label="Password"
            required
            counter="15"
            @click:append="show1 = !show1"
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" md="4">
          <v-date-input
            clearable
            v-model="nuevoUser.birthdate"
            label="Birth Date"
            readonly
            required
          ></v-date-input>
        </v-col>

        <v-col cols="12" md="4">
          <v-text-field
            clearable
            v-model="nuevoUser.gmail"
            label="E-mail"
            placeholder="E-Mail"
            required
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="4">
          <v-select
            v-model="nuevoUser.role"
            label="Role"
            :items="['admin', 'user']"
            required
          ></v-select>
        </v-col>
      </v-row>

      <v-row justify="end">
        <v-col cols="auto">
          <button @click.prevent="addGame">Add User</button>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>


<style scoped>
button { 
    padding: 10px; 
    margin: 5px; 
    background-color: var(--color-black); 
    color: #ffffff; 
    cursor: pointer; 
    font-size: var(--text-single-100-regular-size); 
    border-radius: 5px; 
    transition: background-color 0.3s, color 0.3s;
}
button:hover {
    color: var(--color-blue);
}
.custom-form {
    width: 100%;
    color: var(--neutral-colors-white);
}
/* .v-text-field{
  color: var(--neutral-colors-white);
} */
.v-row {
    flex-wrap: wrap;
}
</style>
