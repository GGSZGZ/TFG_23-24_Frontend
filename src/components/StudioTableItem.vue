<script setup lang="ts">
import { ref, onMounted,watch } from 'vue';
import { useApiStore, pinia } from '../store/api';

const search = ref('');
const headers = ref([
    { key: 'name', title: 'Name', align: 'start', sortable: false },
    { key: 'description', title: 'Description' },
    { key: 'synopsis', title: 'Synopsis' },
    { key: 'price', title: 'Price' },
    { key: 'discount', title: 'Discount' },
    { key: 'categories', title: 'Categories' },
    { key: 'actions', title: 'Actions', align: 'center', sortable: false }
]);

interface Game {
    gameID: number;
    name: string;
    description: string;
    synopsis: string;
    price: number;
    discount: number;
    categories: string;
}

const initialGames = ref<Game[]>([]);

onMounted(async () => {
    const apiStore = useApiStore(pinia);
    const games = await apiStore.fetchGamesStudio(1); // AJUSTAR ID DEL ESTUDIO

    initialGames.value = games.map((game: any) => ({
        gameID: game.gameID,
        name: game.name,
        description: game.description,
        synopsis: game.synopsis,
        price: game.price,
        discount: game.discount,
        categories: game.categories
    }));

    // Obtener las categorías únicas de los juegos
    const categoriesSet = new Set<string>();
    initialGames.value.forEach(game => {
        const categoriesArray = game.categories.split(',').map(category => category.trim());
        categoriesArray.forEach(category => categoriesSet.add(category));
    });

    // Convertir el conjunto de categorías en un array
    categoryOptions.value = Array.from(categoriesSet);
});

const categoryOptions = ref<string[]>([]);

// Variable para almacenar los juegos en la tabla
const games = ref<Game[]>([]);

watch(initialGames, (newGames) => {
    games.value = [...newGames];
}, { immediate: true });

// Variable de estado para controlar el índice del juego que se está editando
const editingIndex = ref<number | null>(null);

// Variable para guardar el juego original antes de la edición
const originalGame = ref<Game | null>(null);

// Función para manejar el botón de editar
const editGame = (index: number) => {
    editingIndex.value = index;
    originalGame.value = { ...games.value[index] };
    games.value[index].categoriesArray = games.value[index].categories.split(',').map(category => category.trim());
};

// Función para guardar los cambios del juego editado
const saveGame = async(index: number) => {
    const gameID = games.value[index].gameID;
    games.value[editingIndex.value!].categories = games.value[editingIndex.value!].categoriesArray.join(', ');
    const gameDTO={
        name: games.value[editingIndex.value!].name,
        description: games.value[editingIndex.value!].description,
        synopsis: games.value[editingIndex.value!].synopsis,
        price: Number(games.value[editingIndex.value!].price),
        discount: Number(games.value[editingIndex.value!].discount),
        categories: games.value[editingIndex.value!].categoriesArray.join(', ')
    }
    console.log(gameDTO);
    
    
        const apiStore = useApiStore(pinia);
        await apiStore.fetchUpdateGame(gameID,gameDTO);
        alert('Game has been succesfully updated')
    editingIndex.value = null;
    originalGame.value = null;
    
};

// Función para cancelar la edición y restaurar el juego original
const saveGameCancel = (index: number) => {
    games.value[index] = { ...originalGame.value };
    editingIndex.value = null;
    originalGame.value = null;
};

// Función para eliminar un juego de la tabla
const deleteGame = async (index: number) => {
    const gameID = games.value[index].gameID;
    
    try {
        const apiStore = useApiStore(pinia);
        await apiStore.fetchDeleteGame(gameID);
        games.value.splice(index, 1);
        alert('Game has been succesfully deleted')
    } catch (error) {
        console.error('Error deleting game:', error);
    }
};


</script>

<template>
    <v-card flat >
        <template v-slot:title>
            <span style="font-weight: bold; text-decoration: underline;">Games</span>
        </template>
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
  
        <v-data-table
            :headers="headers"
            :items="games"
            :search="search"
        >
            <template v-slot:item.name="{ item, index }">
                <div v-if="editingIndex === index">
                    <v-textarea v-model="item.name" label="Name" width="100px" auto-grow></v-textarea>
                </div>
                <div v-else>{{ item.name }}</div>
            </template>

            <template v-slot:item.description="{ item, index }">
                <div v-if="editingIndex === index">
                    <v-textarea v-model="item.description" label="Description" rows="3" auto-grow></v-textarea>
                </div>
                <div v-else>{{ item.description }}</div>
            </template>

            <template v-slot:item.synopsis="{ item, index }">
                <div v-if="editingIndex === index">
                    <v-textarea v-model="item.synopsis" label="Synopsis" rows="3" auto-grow></v-textarea>
                </div>
                <div v-else>{{ item.synopsis }}</div>
            </template>

            <template v-slot:item.price="{ item, index }">
                <div v-if="editingIndex === index">
                    <v-text-field v-model="item.price" label="Price" type="number"></v-text-field>
                </div>
                <div v-else>{{ item.price }}</div>
            </template>

            <template v-slot:item.discount="{ item, index }">
                <div v-if="editingIndex === index">
                    <v-text-field v-model="item.discount" label="Discount" type="number"></v-text-field>
                </div>
                <div v-else>{{ item.discount }}</div>
            </template>

            <template v-slot:item.categories="{ item, index }">
                <div v-if="editingIndex === index">
                    <v-select v-model="item.categoriesArray" :items="categoryOptions" label="Categories" multiple></v-select>
                </div>
                <div v-else>{{ item.categories }}</div>
            </template>

            <template v-slot:item.actions="{ item, index }">
                <v-btn v-if="editingIndex === index" color="primary" @click="saveGame(index)">Save</v-btn>
                <v-btn v-if="editingIndex === index" color="primary" @click="saveGameCancel(index)">Cancel</v-btn>
                <v-btn v-else color="primary" @click="editGame(index)">Edit</v-btn>
                <v-btn color="error" @click="deleteGame(index)">Delete</v-btn>
            </template>
        </v-data-table>
    </v-card>
</template>

<style scoped>
::v-deep .bg-error,.bg-primary { 
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
