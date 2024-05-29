<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import AnotherComponent from '@/components/AnotherComponent.vue';
import { useApiStore, pinia } from '../store/api';
import { jwtDecode } from 'jwt-decode'; // Asegúrate de que este import está correcto.


const token = localStorage.getItem('jwtToken');

const items = ref([]);
const search = ref('');
const headers = [
  { text: 'Name', value: 'name' },
  { text: 'Action', value: 'action', sortable: false }, // Añadimos una columna para las acciones
];

if (!token || token === 'null') {
  alert('Debes iniciar sesión como usuario para comprar un juego.');
} else {
  const decodedToken = jwtDecode(token) as { id: number };

  const fetchGames = async () => {
    const gamesUser = await useApiStore(pinia).fetchGamesLibraryGameUser(decodedToken.id);
    items.value = gamesUser.map((game: any) => ({ name: game.name, gameID: game.gameID }));
  };

  onMounted(fetchGames);
}

const filteredItems = computed(() => {
  const query = search.value.trim().toLowerCase();
  if (!query) {
    return items.value;
  } else {
    return items.value.filter(item => item.name.toLowerCase().includes(query));
  }
});

const emit = defineEmits(['item-click']);

const handleClick = (item: any) => {
  emit('item-click', { component: AnotherComponent, data: item.gameID });
};
</script>

<template>
  <v-card flat>
    <v-text-field
      v-model="search"
      label="Search"
      prepend-inner-icon="mdi-magnify"
      variant="outlined"
      hide-details
      single-line
    ></v-text-field>
    <v-data-table-virtual
      :headers="headers"
      :items="filteredItems"
      height="400"
    >
      <template v-slot:item="{ item }">
        <tr @click="() => handleClick(item)">
          <td style="cursor: pointer">{{ item.name }}</td>
          <td>
            <v-btn style="display: none;" @click="() => handleClick(item)">Select</v-btn>
          </td>
        </tr>
      </template>
    </v-data-table-virtual>
  </v-card>
</template>




<style scoped>
.v-card {
  margin-bottom: 10px;
}
</style>
