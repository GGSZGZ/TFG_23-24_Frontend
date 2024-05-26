<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { useApiStore, pinia } from '../store/api';
import { jwtDecode } from 'jwt-decode';

let userLoggedID:any;
// Definir una interfaz para el tipo de datos de usuario
interface User {
  name: string;
  username: string;
  password: string;
  email: string;
  role: string;
  userID: number; // Añadir userID al tipo de usuario
}

// Definir users como un array de tipo User
const users = ref<User[]>([]);

onMounted(async () => {
  const token = localStorage.getItem('jwtToken');
   
  if (token && token !== 'null') {
    const decodedToken = jwtDecode(token!) as { id: number };
   userLoggedID=decodedToken.id;
    try {
      const apiStore = useApiStore(pinia);
      // Obtener los usuarios de la API
      const fetchedUsers = await apiStore.fetchUsers();

      // Mapear los usuarios devueltos por la API
      users.value = fetchedUsers.map((user: any) => {
        return {
          name: user.name,
          username: user.surname,
          password: user.password,
          email: user.email,
          role: user.role,
          userID: user.userID // Guardar también el userID
        };
      });
    } catch (error) {
      console.error('Error al obtener los usuarios:', error);
    }
  }
});

const search = ref('');
const headers = ref([
  { key: 'name', title: 'Name', align: 'start', sortable: false },
  { key: 'username', title: 'Username' },
  { key: 'password', title: 'Password' },
  { key: 'email', title: 'E-mail' },
  { key: 'role', title: 'Role' },
  { key: 'actions', title: 'Actions', align: 'center', sortable: false } // Columna para eliminar
]);

// Función para eliminar un usuario
async function deleteUser(user: User) {
  if(!(user.userID == userLoggedID!)){
  try {
    const apiStore = useApiStore(pinia);
    
    await apiStore.fetchDeleteLibraryGameUser(user.userID);
    await deleteMessagesUser(user.userID);
    await apiStore.fetchDeleteUser(user.userID);
    // Filtra los usuarios y excluye el usuario eliminado
    users.value = users.value.filter(u => u.userID !== user.userID);
  } catch (error) {
    console.error('Error al eliminar usuario:', error);
  }
  }else{
    alert('Error, no puedes eliminarte a ti mismo.')
  }
}
async function deleteMessagesUser(userID: number) {
  try {
    const apiStore = useApiStore(pinia);
    // Obtener los mensajes del usuario
    const messagesUser = await apiStore.fetchMessagesUser(userID);
    
    // Iterar sobre los mensajes y eliminar cada uno de ellos
    for (const message of messagesUser) {
      await apiStore.fetchDeleteCommunity(message.messageID);
    }
  } catch (error) {
    console.error('Error al eliminar mensajes del usuario:', error);
  }
}
</script>

<template>
  <v-card title="User List" flat>
    <template v-slot:text>
      <v-text-field
        v-model="search"
        label="Search"
        prepend-inner-icon="mdi-magnify"
        variant="outlined"
        hide-details
        single-line
      ></v-text-field>
    </template>
    <v-data-table :headers="headers" :items="users" :search="search">
      <template #item="{ item }">
        <tr>
          <td>{{ item.name }}</td>
          <td>{{ item.username }}</td>
          <td>{{ item.password }}</td>
          <td>{{ item.email }}</td>
          <td>{{ item.role }}</td>
          <td class="actions">
            <v-btn color="error" small @click="deleteUser(item)">Delete</v-btn>
          </td>
        </tr>
      </template>
    </v-data-table>
  </v-card>
</template>


<style scoped>
.actions {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-right: 16px;
}
button{
  position: absolute;
  margin-right: 63px
}


::v-deep .bg-error { 
    color: #ffffff; 
    cursor: pointer; 
    font-size: var(--text-single-100-regular-size); 
    transition: background-color 0.3s, color 0.3s ;
    font-family: var(--font-roboto) ;
}
::v-deep .bg-error:hover {
    color: var(--color-blue) !important;
}
</style>
