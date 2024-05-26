<script setup lang="ts">
import { ref, computed } from 'vue';

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

// Ejemplo del array de juegos
const initialGames = [
    {
        name: 'The Witcher 3: Wild Hunt',
        description: 'An open world RPG set in a visually stunning fantasy universe full of meaningful choices and impactful consequences.',
        synopsis: 'Play as Geralt of Rivia, a monster hunter for hire, as you embark on an epic journey in a war-ravaged world.',
        price: 39.99,
        discount: 10,
        categories: 'Rol (RPG), Aventura, Acción, Mundo abierto'
    },
    {
        name: 'Hades',
        description: 'A god-like rogue-like dungeon crawler that combines the best aspects of Supergiant\'s critically acclaimed titles.',
        synopsis: 'Defy the god of the dead as you hack and slash out of the Underworld in this rogue-like dungeon crawler from the creators of Bastion.',
        price: 24.99,
        discount: 20,
        categories: 'Acción, Indie, Roguelike, Aventura'
    },
    {
        name: 'Stardew Valley',
        description: 'A farming simulation game where you can grow crops, raise animals, and build the farm of your dreams.',
        synopsis: 'You\'ve inherited your grandfather\'s old farm plot in Stardew Valley. Armed with hand-me-down tools and a few coins, you set out to begin your new life.',
        price: 14.99,
        discount: 0,
        categories: 'Simulación, Indie, Casual, Construcción de ciudades'
    },
    {
        name: 'Half-Life: Alyx',
        description: 'Valve returns to the Half-Life series with this VR-exclusive game set between the events of Half-Life and Half-Life 2.',
        synopsis: 'Playing as Alyx Vance, you are humanity’s only chance for survival against the Combine forces.',
        price: 59.99,
        discount: 15,
        categories: 'Realidad virtual (VR), Acción, Aventura, Ciencia ficción'
    },
    {
        name: 'Among Us',
        description: 'An online multiplayer game where players work together to complete tasks on a spaceship while trying to identify the impostors among them.',
        synopsis: 'Join your crewmates in a multiplayer game of teamwork and betrayal! Play with 4-15 players online or via local WiFi.',
        price: 4.99,
        discount: 0,
        categories: 'Multijugador masivo (MMO), Casual, Indie, Táctico'
    }
];

// Definir las categorías como un conjunto
const categoriesSet = new Set<string>();

// Obtener las categorías únicas de los juegos
initialGames.forEach(game => {
    const categoriesArray = game.categories.split(',').map(category => category.trim());
    categoriesArray.forEach(category => categoriesSet.add(category));
});

// Convertir el conjunto de categorías en un array
const categoryOptions = Array.from(categoriesSet);

const games = ref([...initialGames]);

// Variable de estado para controlar el índice del juego que se está editando
const editingIndex = ref<number | null>(null);

// Variable para guardar el juego original antes de la edición
const originalGame = ref<Object | null>(null);

// Funciones para manejar los botones
const editGame = (index: number) => {
    editingIndex.value = index;
    // Guardar una copia del juego original antes de la edición
    originalGame.value = { ...games.value[index] };
    // Convertir las categorías del juego en un array
    games.value[index].categoriesArray = games.value[index].categories.split(',').map(category => category.trim());
};

const saveGame = () => {
    // Actualizar las categorías del juego con las seleccionadas en el v-select
    games.value[editingIndex.value!].categories = games.value[editingIndex.value!].categoriesArray.join(', ');
    editingIndex.value = null;
    // Limpiar la copia del juego original
    originalGame.value = null;
};
const saveGameCancel = (index: number) => {
    // Restaurar el juego original antes de la edición
    games.value[index] = { ...originalGame.value };
    editingIndex.value = null;
    // Limpiar la copia del juego original
    originalGame.value = null;
};

const deleteGame = (index: number) => {
    games.value.splice(index, 1);
};

</script>

<template>
    <v-card flat>
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
                <v-btn v-if="editingIndex === index" color="primary" @click="saveGame">Guardar</v-btn>
                <v-btn v-if="editingIndex === index" color="primary" @click="saveGameCancel(index)">Cancelar</v-btn>
                <v-btn v-else color="primary" @click="editGame(index)">Editar</v-btn>
                <v-btn color="error" @click="deleteGame(index)">Eliminar</v-btn>
            </template>
        </v-data-table>
    </v-card>
</template>
