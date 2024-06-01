<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import {jwtDecode} from 'jwt-decode';

// Obtener el token JWT del almacenamiento local
const token = ref<string | null>(localStorage.getItem("jwtToken"));

// Inicializar el token decodificado
let decodedToken: { role: string } | null = null;

if (token.value) {
  try {
    // Decodificar el token JWT
    decodedToken = jwtDecode<{ role: string }>(token.value);
  } catch (error) {
    console.error('Invalid token specified:', error);
    token.value = null; // Restablecer el token si es inválido
  }
}

// Obtener la información del estudio del almacenamiento local
const studio = ref<string | null>(localStorage.getItem("studioLogged"));
const studioData = ref<any>(null);

if (studio.value && studio.value !== 'null') {
  try {
    // Analizar la información del estudio
    studioData.value = JSON.parse(studio.value);
  } catch (error) {
    console.error('Error parsing studio data:', error);
    studio.value = null; // Restablecer el estudio si es inválido
  }
}

// Verificar los cambios en el valor de `studio`
watch(studio, (newValue) => {
  if (newValue && newValue !== 'null') {
    try {
      studioData.value = JSON.parse(newValue);
    } catch (error) {
      console.error('Error parsing studio data:', error);
      studio.value = null; // Restablecer el estudio si es inválido
    }
  }
});

// Computed properties para determinar el estado de inicio de sesión
const isUserLoggedIn = computed(() => decodedToken?.role === 'user' && !studioData.value);
const isAdminLoggedIn = computed(() => decodedToken?.role === 'admin' && !studioData.value);
const isStudioLoggedIn = computed(() => !decodedToken && studioData.value);
const isGuest = computed(() => !decodedToken && !studioData.value);

// Computed para obtener el id del estudio
const studioId = computed(() => studioData.value?.studioID || '');

// Imprimir información de depuración
console.log(decodedToken?.role + ', ' + (studioData.value ? studioData.value.studioID : 'No Studio Data'));
</script>

<template>
  <link
    rel="stylesheet"
    href="https://fonts.googleapis.com/css2?family=Playfair Display:wght@400;600;700&display=swap"
  />

  <nav class="sections">
    <h3 class="home">
      <slot name="home"></slot>
    </h3>

    <h3 class="about">
      <slot name="about">
        <RouterLink
        v-if="isUserLoggedIn"
          to="/library"
          style="text-decoration: none; color: var(--neutral-colors-headings-black)"
          >Library</RouterLink
        >
      </slot>
    </h3>
    <h3 class="about">
      <slot name="contact"></slot>
    </h3>
    <h3 class="profile">
      <slot name="profile">
        <RouterLink
          v-if="isUserLoggedIn"
          to="/profile"
          style="text-decoration: none; color: var(--neutral-colors-headings-black);"
        >
          Profile
        </RouterLink>
        <RouterLink
          v-else-if="isAdminLoggedIn"
          to="/admin"
          style="text-decoration: none; color: var(--neutral-colors-headings-black);"
        >
          Admin
        </RouterLink>
        <RouterLink
          v-else-if="isStudioLoggedIn"
          :to="`/studio/${studioId}`"
          style="text-decoration: none; color: var(--neutral-colors-headings-black);"
        >
          Studio
        </RouterLink>
        <RouterLink
          v-else-if="isGuest"
          to="/login&register"
          style="text-decoration: none; color: var(--neutral-colors-headings-black);"
        >
          Login
        </RouterLink>
      </slot>
    </h3>
  </nav>
  <slot name="hrindex">
    <hr class="header-line-hr" />
  </slot>
  <slot name="iconregister"></slot>
</template>

<style scoped>
/* Tu CSS existente */
.logo {
  position: absolute;
  top: 0;
  left: 0;
  width: 458px;
  height: 80px;
}
.logo-1-icon {
  position: absolute;
  top: 0;
  left: 0;
  width: 143px;
  height: 110px;
  object-fit: cover;
}
.sections {
  transform: scale(0.7);
  right: 10px;
  position: absolute;
  top: 46px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  gap: 38px;
  text-align: center;
  font-size: 28px;
  color: #000000;
  font-family: var(--font-roboto);
}
.header-line-hr {
  position: absolute;
  top: 109px;
  width: 100%;
  border-color: #000;
}
.home {
  margin: 0;
  position: relative;
  line-height: 18px;
  font-weight: 400;
  font-family: inherit;
}
.about {
  margin: 0;
  position: relative;
  line-height: 18px;
  font-weight: 400;
  font-family: inherit;
  cursor: pointer;
}
.profile {
  margin: 0;
  position: relative;
  line-height: 18px;
  font-weight: 400;
  font-family: inherit;
  transition: color 1s;
}
.profile:hover {
  color: var(--color-blue);
}
</style>
