<script setup lang="ts">
import { ref,onMounted } from 'vue';
import { VNumberInput } from 'vuetify/labs/VNumberInput'
import { useApiStore, pinia } from '../store/api';

const nuevoJuego = ref({
    name: '',
    description: '',
    synopsis: '',
    price: '',
    discount: '',
    genre: '',
    categories: []
});
const categories = ref([]); // Inicializar ref para las categorías
// Función para cargar las categorías desde un archivo JSON
async function loadCategories() {
    try {
        const response = await fetch('/src/assets/gameCategories.json');
        if (!response.ok) {
            throw new Error('Error al cargar las categorías: ' + response.statusText);
        }
        const data = await response.json();
        categories.value = data;
    } catch (error) {
        console.error(error);
    }
}

loadCategories();


async function addGame() {
    let { name, description, synopsis, price, categories } = nuevoJuego.value;
    let discount: number = 0; // Inicializar discount como número y establecerlo en 0
    
    // Verificar si se proporciona un valor válido para discount
    if (nuevoJuego.value.discount !== undefined && nuevoJuego.value.discount !== null && nuevoJuego.value.discount !== '') {
        discount = parseFloat(nuevoJuego.value.discount); // Convertir el valor a número
    }
    
    if (!name || !description || !synopsis || !price || !categories) {
        alert('Faltan campos por completar');
    } else {
        const categoriesString = nuevoJuego.value.categories.join(', ');
        // CAMBIAR EL ID DEL ESTUDIO
        const gameData = {
            name,
            description,
            synopsis,
            categories: categoriesString,
            releaseDate: new Date().toISOString(),
            price,
            discount,
            studioID : '1'
        };
        await useApiStore(pinia).fetchPostGame(gameData);
        cleanFields();
    }
}
function cleanFields(){
    alert('Game has been added correctly.')
    window.scrollTo(0, 0);
    window.location.reload();

}



const nameRules = ref([
    (value: string) => !!value || 'El campo no puede estar vacío',
]);
</script>

<template>
    <v-form class="custom-form">
        <v-container>
            <v-row>
                <v-col cols="12" md="4">
                    <v-text-field clearable
                        v-model="nuevoJuego.name"
                        :rules="nameRules"
                        label="Name"
                        placeholder="Elden Ring"
                        counter="20"
                        required
                    ></v-text-field>
                </v-col>

                <v-col cols="12" md="4">
                    <v-textarea clearable
                        v-model="nuevoJuego.description"
                        :rules="nameRules"
                        label="Description"
                        placeholder="Un juego que te hará querer explorar más y más sobre el resto del mundo"
                        required
                        rows="3"
                        auto-grow
                        counter="1000"
                    ></v-textarea>
                </v-col>

                <v-col cols="12" md="4">
                    <v-textarea clearable
                        v-model="nuevoJuego.synopsis"
                        :rules="nameRules"
                        label="Synopsis"
                        placeholder="Un juego que te hará querer explorar más y más sobre el resto del mundo"
                        required
                        rows="3"
                        auto-grow
                        counter="300"
                    ></v-textarea>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12" md="4">
                    <v-number-input
                        :reverse="false"
                        controlVariant="split"
                        v-model="nuevoJuego.price"
                        label="Price"
                        :hideInput="false"
                        :inset="false"
                        :min="0"
                    ></v-number-input>
                </v-col>

                <v-col cols="12" md="4">
                    <v-number-input
                        :reverse="false"
                        controlVariant="split"
                        v-model:="nuevoJuego.discount"
                        label="Discount (%)"
                        :hideInput="false"
                        :inset="false"
                        :min="0"
                        :max="100"
                    ></v-number-input>
                </v-col>

                <v-col cols="12" md="4">
                    <v-select
                        v-model="nuevoJuego.categories"
                        :rules="nameRules"
                        label="Categories"
                        :items="categories"
                        required
                        multiple
                        chips clearable
                    ></v-select>
                </v-col>
            </v-row>
            <v-row justify="end">
                <v-col cols="auto">
                    <button @click.prevent="addGame">Add Game</button>
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
    font-size: 16px; 
    border-radius: 5px; 
    transition: background-color 0.3s, color 0.3s;
}
button:hover {
    color: var(--color-blue);
}
.custom-form {
    width: 100%;
}
.v-row {
    flex-wrap: wrap;
}
</style>
