<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from 'vue';
import { useApiStore, pinia } from '@/store/api';
import { useRouter } from 'vue-router';

// Define interfaces para los datos esperados (opcional)
interface SearchItem {
    id: number;
    name: string;
    type: string; // Añadimos una propiedad type
}

const searchs = ref<SearchItem[]>([]);
const games = ref([]);
const studios = ref([]);
const searchTerm = ref<string>('');  // Ref para el valor del campo de búsqueda
const showResults = ref<boolean>(false); // Ref para mostrar/ocultar la lista de resultados

const fetch = async () => {
    try {
        games.value = await useApiStore(pinia).fetchGamesGameShop(1);
        studios.value = await useApiStore(pinia).fetchStudios();
    } catch (err) {
        console.error(err);
    } finally {
        // Combinar los datos de games y studios
        searchs.value = [
            ...games.value.map(game => ({ id: game.id, name: game.name, type: 'Game' })),
            ...studios.value.map(studio => ({ id: studio.id, name: studio.name, type: 'Studio' })),
        ];
        console.log(studios.value);
    }
}

fetch();

// Watch para el término de búsqueda
watch(searchTerm, (newTerm) => {
    if (newTerm) {
        showResults.value = true; // Mostrar la lista de resultados cuando hay un término de búsqueda
        // Filtrar los resultados basados en el término de búsqueda
        searchs.value = [
            ...games.value.filter(game => game.name.toLowerCase().includes(newTerm.toLowerCase()))
                          .map(game => ({ id: game.gameId, name: game.name, type: 'Game' })),
            ...studios.value.filter(studio => studio.name.toLowerCase().includes(newTerm.toLowerCase()))
                            .map(studio => ({ id: studio.id, name: studio.name, type: 'Studio' })),
        ];
    } else {
        showResults.value = false; // Ocultar la lista de resultados cuando no hay término de búsqueda
        searchs.value = [];
    }
});

// Listener para detectar clics fuera del contenedor de búsqueda
const handleClickOutside = (event: MouseEvent) => {
    const container = document.querySelector('.search-container') as HTMLElement;
    if (container && !container.contains(event.target as Node)) {
        showResults.value = false; // Ocultar la lista de resultados
    }
};

onMounted(() => {
    document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside);
});

const router = useRouter(); // Inicializa el router

// Función para manejar clics en los elementos de búsqueda
const handleSearchClick = (search: SearchItem) => {
    if (search.type === 'Game') {
        games.value.forEach(game => {
            if(game.name ==search.name){
                router.push(`/game/${game.gameID}`);
            }
        });
    } else if (search.type === 'Studio') {
        studios.value.forEach(studio => {
            if(studio.name == search.name){
                router.push(`/studio/${studio.studioID}`);
            }
        });
    }
};

console.log(searchs.value.forEach(element => {
    element.id, element.name, element.type
}));
</script>

<template>
    <div class="search-container">
        <v-text-field
            v-model="searchTerm"
            label="Search"
            prepend-inner-icon="mdi-magnify"
            class="input-search"
            filled
            dense
            @focus="showResults = true"
        ></v-text-field>
        <ul v-if="showResults && searchs.length > 0" class="search-results">
            <li v-for="search in searchs" :key="search.id" @click="handleSearchClick(search)">
                <div>{{ search.name }}</div>
                <div class="subtitle">{{ search.type }}</div>
            </li>
        </ul>
    </div>
</template>

<style scoped>
.search-container {
    width: 95%;
    display: flex;
    justify-content: flex-end;
    position: relative;
    top: 10px;
}

.v-text-field {
    color: var(--neutral-colors-white);
    width: 30%;
    flex: 0 0 auto;
}

.search-results {
    display: block;
    width: 30%;
    position: absolute;
    top: 50px; /* Ajusta esta propiedad para mover la lista más abajo */
    background-color: var(--neutral-colors-white);
    list-style-type: none;
    padding: 0;
    margin: 0;
    border: 1px solid #ccc;
    z-index: 1000;
    height: 400px;
    overflow-y: scroll;
    
}

.search-results li {
    padding: 10px;
    cursor: pointer;
    font-family: var(--font-orbitron);
}

.search-results li:hover {
    background-color: var(--color-yellow);
}

.subtitle {
    color: gray;
    font-size: 0.9em;
    font-family: var(--font-roboto);
}
</style>
