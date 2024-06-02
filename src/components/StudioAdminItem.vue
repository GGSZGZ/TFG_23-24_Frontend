<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { VNumberInput } from 'vuetify/labs/VNumberInput';
import { useApiStore, pinia } from '../store/api';
import s3Service from '../services/s3Service';

const nuevoJuego = ref({
  name: '',
  description: '',
  synopsis: '',
  price: '',
  discount: '',
  genre: '',
  categories: [],
  images: [] as File[]
});

const categories = ref([]);

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
  let discount: number = 0;

  if (nuevoJuego.value.discount !== undefined && nuevoJuego.value.discount !== null && nuevoJuego.value.discount !== '') {
    discount = parseFloat(nuevoJuego.value.discount);
  }

  if (!name || !description || !synopsis || !price || !categories) {
    alert('Faltan campos por completar');
  } else {
    const categoriesString = nuevoJuego.value.categories.join(', ');
    const studioLocal = localStorage.getItem('studioLogged');
    if (studioLocal && studioLocal !== 'null') {
      const studioObject = JSON.parse(studioLocal);
      const gameData = {
        name,
        description,
        synopsis,
        categories: categoriesString,
        releaseDate: new Date().toISOString(),
        price,
        discount,
        studioID: studioObject.studioID,
        storeID: '1'
      };

      const addedGame = await useApiStore(pinia).fetchPostGame(gameData);

      if (nuevoJuego.value.images.length > 0) {
        await uploadImages(addedGame.gameID, studioObject.studioID);
      }

      cleanFields();
    }
  }
}

async function uploadImages(gameID: number, studioID: number) {
  for (let i = 0; i < nuevoJuego.value.images.length; i++) {
    const image = nuevoJuego.value.images[i];
    const jpgImage = await convertImageToJPG(image);
    const renamedFile = new File([jpgImage], `img${i + 1}.jpg`, { type: 'image/jpeg' });
    //no static keys or user account with permissions 
    // await s3Service.uploadImage(`Studio${studioID}/Game${gameID}`, renamedFile);
  }
}

function handleImageUpload(event: Event) {
  const files = (event.target as HTMLInputElement).files;
  if (files) {
    const selectedFiles = Array.from(files).slice(0, 5);
    nuevoJuego.value.images = selectedFiles;
    previewImages.value = selectedFiles.map(file => URL.createObjectURL(file));
  }
}
async function convertImageToJPG(image: File): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const imgElement = new Image();
      imgElement.src = event.target?.result as string;

      imgElement.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = imgElement.width;
        canvas.height = imgElement.height;

        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(imgElement, 0, 0);
          canvas.toBlob((blob) => {
            if (blob) {
              resolve(blob);
            } else {
              reject(new Error('Conversion to blob failed'));
            }
          }, 'image/jpeg', 0.95);
        } else {
          reject(new Error('Could not get canvas context'));
        }
      };

      imgElement.onerror = (error) => {
        reject(error);
      };
    };
    reader.onerror = (error) => {
      reject(error);
    };
    reader.readAsDataURL(image);
  });
}

function cleanFields() {
  alert('Game has been added correctly.');
  window.scrollTo(0, 0);
  window.location.reload();
}

const previewImages = ref<string[]>([]);

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
            v-model="nuevoJuego.discount"
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
          <input type="file" multiple @change="handleImageUpload" accept="image/*" style="display: none;" id="upload-images"/>
          <label for="upload-images" class="custom-upload-button">Upload Images</label>
        </v-col>
        <v-col cols="auto">
          <button @click.prevent="addGame">Add Game</button>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <div class="preview-images">
            <img v-for="(src, index) in previewImages" :key="index" :src="src" class="preview-image"/>
          </div>
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
.custom-upload-button {
  padding: 10px;
  margin: 5px;
  background-color: var(--color-black);
  color: #ffffff;
  cursor: pointer;
  font-size: 16px;
  border-radius: 5px;
  transition: background-color 0.3s, color 0.3s;
  display: inline-block;
}
.custom-upload-button:hover {
  color: var(--color-blue);
}
.custom-form {
  width: 100%;
}
.v-row {
  flex-wrap: wrap;
}
.preview-images {
  display: flex;
  gap: 10px;
  margin-top: 10px;
}
.preview-image {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border: 1px solid #ddd;
  border-radius: 5px;
}
</style>
