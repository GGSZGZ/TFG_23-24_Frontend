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
    studio.value = null; // Restablecer el estudio si es inválido
  }
}

// Computed properties para determinar el estado de inicio de sesión
const isUserLoggedIn = computed(() => decodedToken?.role === 'user' && !studioData.value);
const isAdminLoggedIn = computed(() => decodedToken?.role === 'admin' && !studioData.value);
const isStudioLoggedIn = computed(() => !decodedToken && studioData.value);
const isGuest = computed(() => !decodedToken && !studioData.value);

// Imprimir información de depuración
console.log(decodedToken?.role + ', ' + (studioData.value ? studioData.value.studioID : 'No Studio Data'));

//Máscara
document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById("myCanvasH") as HTMLCanvasElement;
    const ctx = canvas.getContext('2d')!;

    let animationId: number | null = null; // ID de la animación
    const canvasHeight = 220; // Ancho específico del canvas
    let maskY = canvasHeight-100;

    if (ctx) {
        canvas.addEventListener('mouseenter', startAnimation);
        canvas.addEventListener('mouseleave', stopAnimation);

        drawStop();
    }
    function startAnimation() {
            if (!animationId) {
                maskY = canvasHeight-100;
                drawMask(); // Iniciar la animación
            }
        }
    function drawMask(){
      ctx.clearRect(0, 0, canvas.width, canvasHeight); // Limpiar el canvas
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, '#1eb6e8');
      gradient.addColorStop(0.5, '#5073e7');
      gradient.addColorStop(1, '#8a45c4');
      //Máscara Forma
      ctx.beginPath()
        ctx.lineTo(29, 113+maskY);
        ctx.lineTo(24, 92+maskY);
        ctx.lineTo(12, 93+maskY);
        ctx.lineTo(12, 133+maskY);
        ctx.lineTo(31, 134+maskY);
        ctx.lineTo(34, 146+maskY);
        ctx.lineTo(83, 169+maskY);
        ctx.lineTo(84, 177+maskY);
        ctx.lineTo(114, 177+maskY);
        ctx.lineTo(116, 169+maskY);
        ctx.lineTo(166, 145+maskY);
        ctx.lineTo(169, 133+maskY);
        ctx.lineTo(188, 133+maskY);
        ctx.lineTo(188, 94+maskY);
        ctx.lineTo(174, 92+maskY);
        ctx.lineTo(171, 115+maskY);
        ctx.quadraticCurveTo(136, 135+maskY, 116, 111+maskY);
        ctx.lineTo(85, 111+maskY);
        ctx.quadraticCurveTo(54, 136+maskY, 29, 113+maskY);
        ctx.lineWidth = 8;
        ctx.strokeStyle = gradient;
        ctx.stroke();
        ctx.closePath();
        //Líneas Máscara
        ctx.beginPath()
        ctx.lineTo(28, 113+maskY);
        ctx.lineTo(31, 134+maskY);
        ctx.lineTo(43, 123+maskY);
        ctx.lineTo(45, 151+maskY);
        ctx.lineTo(56, 124+maskY);
        ctx.lineTo(57, 157+maskY);
        ctx.lineTo(68, 121+maskY);
        ctx.lineTo(71, 165+maskY);
        ctx.lineTo(84, 111+maskY);
        ctx.lineTo(84, 169+maskY);
        ctx.moveTo(115, 112+maskY);
        ctx.lineTo(116, 171+maskY);
        ctx.lineTo(132, 121+maskY);
        ctx.lineTo(128, 166+maskY);
        ctx.lineTo(144, 124+maskY);
        ctx.lineTo(141, 157+maskY);
        ctx.lineTo(156, 121+maskY);
        ctx.lineTo(154, 151+maskY);
        ctx.lineTo(170, 115+maskY);
        ctx.lineTo(168, 135+maskY);
        ctx.moveTo(100, 110+maskY);
        ctx.lineTo(100, 137+maskY);
        ctx.moveTo(100, 177+maskY);
        ctx.lineTo(100, 149+maskY);
        ctx.lineWidth = 4;
        ctx.strokeStyle = gradient;
        ctx.stroke();
        ctx.closePath();
        //Gafas
        ctx.beginPath()
        ctx.lineTo(84, 109-maskY);
        ctx.lineTo(84, 76-maskY);
        ctx.lineTo(71, 101-maskY);
        ctx.lineTo(36, 101-maskY);
        ctx.lineTo(18, 73-maskY);
        ctx.lineTo(5, 72-maskY);
        ctx.lineTo(5, 49-maskY);
        ctx.lineTo(18, 49-maskY);
        ctx.lineTo(18, 73-maskY);
        ctx.moveTo(115, 109-maskY);
        ctx.lineTo(116, 75-maskY);
        ctx.lineTo(128, 102-maskY);
        ctx.lineTo(164, 102-maskY);
        ctx.lineTo(182, 73-maskY);
        ctx.lineTo(195, 73-maskY);
        ctx.lineTo(195, 49-maskY);
        ctx.lineTo(181, 49-maskY);
        ctx.lineTo(182, 74-maskY);
        ctx.moveTo(18, 49-maskY);
        ctx.bezierCurveTo(59, 17-maskY, 68, 53-maskY, 98, 49-maskY)
        ctx.bezierCurveTo(131, 53-maskY, 141, 19-maskY, 180, 47-maskY)
        ctx.moveTo(18, 48-maskY);
        ctx.moveTo(19, 45-maskY);
        ctx.bezierCurveTo(52, 0-maskY, 78, 48-maskY, 99, 37-maskY)
        ctx.bezierCurveTo(125, 48-maskY, 137, 1-maskY, 180, 44-maskY)
        ctx.moveTo(84, 73-maskY);
        ctx.lineTo(87, 67-maskY);
        ctx.lineTo(112, 67-maskY);
        ctx.lineTo(115, 72-maskY);
        ctx.lineWidth = 8;
        ctx.strokeStyle = gradient;
        ctx.stroke();
        ctx.closePath();
        maskY -=3;

        if (maskY >-1) {
          animationId = requestAnimationFrame(drawMask); // Solicitar el próximo cuadro de animación
          
        } else{
          //Reflejo
          ctx.beginPath();
          ctx.moveTo(40, 85);
          ctx.lineTo(60, 56);
          ctx.moveTo(40, 56);
          ctx.lineTo(61, 85);
          ctx.moveTo(158, 85);
          ctx.lineTo(136, 54);
          ctx.moveTo(137, 86);
          ctx.lineTo(158, 54);
          ctx.lineWidth = 8;
          ctx.strokeStyle = gradient;
          ctx.stroke();
          ctx.closePath();
        }
      }

    function drawStop(){
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, '#1eb6e8');
      gradient.addColorStop(0.5, '#5073e7');
      gradient.addColorStop(1, '#8a45c4');
      //Máscara Forma
      ctx.beginPath()
        ctx.lineTo(29, 113);
        ctx.lineTo(24, 92);
        ctx.lineTo(12, 93);
        ctx.lineTo(12, 133);
        ctx.lineTo(31, 134);
        ctx.lineTo(34, 146);
        ctx.lineTo(83, 169);
        ctx.lineTo(84, 177);
        ctx.lineTo(114, 177);
        ctx.lineTo(116, 169);
        ctx.lineTo(166, 145);
        ctx.lineTo(169, 133);
        ctx.lineTo(188, 133);
        ctx.lineTo(188, 94);
        ctx.lineTo(174, 92);
        ctx.lineTo(171, 115);
        ctx.quadraticCurveTo(136, 135, 116, 111);
        ctx.lineTo(85, 111);
        ctx.quadraticCurveTo(54, 136, 29, 113);
        ctx.lineWidth = 8;
        ctx.strokeStyle = gradient;
        ctx.stroke();
        ctx.closePath();
        //Líneas Máscara
        ctx.beginPath()
        ctx.lineTo(28, 113);
        ctx.lineTo(31, 134);
        ctx.lineTo(43, 123);
        ctx.lineTo(45, 151);
        ctx.lineTo(56, 124);
        ctx.lineTo(57, 157);
        ctx.lineTo(68, 121);
        ctx.lineTo(71, 165);
        ctx.lineTo(84, 111);
        ctx.lineTo(84, 169);
        ctx.moveTo(115, 112);
        ctx.lineTo(116, 171);
        ctx.lineTo(132, 121);
        ctx.lineTo(128, 166);
        ctx.lineTo(144, 124);
        ctx.lineTo(141, 157);
        ctx.lineTo(156, 121);
        ctx.lineTo(154, 151);
        ctx.lineTo(170, 115);
        ctx.lineTo(168, 135);
        ctx.moveTo(100, 110);
        ctx.lineTo(100, 137);
        ctx.moveTo(100, 177);
        ctx.lineTo(100, 149);
        ctx.lineWidth = 4;
        ctx.strokeStyle = gradient;
        ctx.stroke();
        ctx.closePath();
        //Gafas
        ctx.beginPath()
        ctx.lineTo(84, 109);
        ctx.lineTo(84, 76);
        ctx.lineTo(71, 101);
        ctx.lineTo(36, 101);
        ctx.lineTo(18, 73);
        ctx.lineTo(5, 72);
        ctx.lineTo(5, 49);
        ctx.lineTo(18, 49);
        ctx.lineTo(18, 73);
        ctx.moveTo(115, 109);
        ctx.lineTo(116, 75);
        ctx.lineTo(128, 102);
        ctx.lineTo(164, 102);
        ctx.lineTo(182, 73);
        ctx.lineTo(195, 73);
        ctx.lineTo(195, 49);
        ctx.lineTo(181, 49);
        ctx.lineTo(182, 74);
        ctx.moveTo(18, 49);
        ctx.bezierCurveTo(59, 17, 68, 53, 98, 49)
        ctx.bezierCurveTo(131, 53, 141, 19, 180, 47)
        ctx.moveTo(18, 48);
        ctx.moveTo(19, 45);
        ctx.bezierCurveTo(52, 0, 78, 48, 99, 37)
        ctx.bezierCurveTo(125, 48, 137, 1, 180, 44)
        ctx.moveTo(84, 73);
        ctx.lineTo(87, 67);
        ctx.lineTo(112, 67);
        ctx.lineTo(115, 72);
        ctx.lineWidth = 8;
        ctx.strokeStyle = gradient;
        ctx.stroke();
        ctx.closePath();
        //Reflejo
        ctx.beginPath();
        ctx.moveTo(40, 85);
        ctx.lineTo(60, 56);
        ctx.moveTo(40, 56);
        ctx.lineTo(61, 85);
        ctx.moveTo(158, 85);
        ctx.lineTo(136, 54);
        ctx.moveTo(137, 86);
        ctx.lineTo(158, 54);
        ctx.lineWidth = 8;
        ctx.strokeStyle = gradient;
        ctx.stroke();
        ctx.closePath();
    }
    function stopAnimation() {
            if (animationId) {
                cancelAnimationFrame(animationId); // Detener la animación
                animationId = null; // Restablecer el ID de la animación
                ctx.clearRect(0, 0, canvas.width, canvasHeight); // Limpiar el canvas
                drawStop();
            }
        }
});

</script>

<template>
  <link
    rel="stylesheet"
    href="https://fonts.googleapis.com/css2?family=Playfair Display:wght@400;600;700&display=swap"
  />
  <div class="logo">
    <canvas id="myCanvasH" width="286px" height="220px" class="logo-1-icon"> </canvas>
    <h1 class="logo-name">FlashGamingHub</h1>
  </div>

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
          to="/studio&admin"
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
  position: relative;
  top: 0;
  left: 0;
  width: 458px;
  height: 110px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.logo-1-icon {
  position: relative;
  top: 0;
  left: 10px;
  width: 143px;
  height: 110px;
  object-fit: cover;
}
.logo-name{
  position: relative;
  font-family: var(--font-orbitron);
  background: linear-gradient(90deg, var(--color-blue), #8a45c4); /* Degradado de azul a morado */
  background-clip: text;
  -webkit-text-fill-color: transparent;
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
.logo{
  
}


</style>
