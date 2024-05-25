<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useApiStore, pinia } from '../store/api';
import {jwtDecode} from 'jwt-decode';

let user;
const router = useRouter();
const game = ref(null);
const userNames = ref<Record<number, string>>({});
const newComment = ref('');
const likeDisabled = reactive<{ [key: number]: boolean }>({});  // Estado de botones de "like" deshabilitados

onMounted(async () => {
  const gameId = Number(router.currentRoute.value.params.id);
  const gameData = await useApiStore(pinia).fetchGame(gameId);
  game.value = gameData!;
  
  // Obtener y almacenar los nombres de usuario para cada mensaje
  for (const message of gameData.messages) {
    const userName = await obtainUser(message.userID);
    userNames.value[message.messageID] = userName;
    likeDisabled[message.messageID] = false;  // Inicialmente, todos los botones de "like" están habilitados
  }
});

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = date.toLocaleString('en-US', { month: 'short' });
  const day = String(date.getDate()).padStart(2, '0');
  return `${day}-${month}-${year}`;
};

async function obtainUser(userID: number) {
  user = await useApiStore(pinia).fetchUser(userID);
  return user ? user.name : 'Anonymous';
}

async function submitComment() {
  const token = localStorage.getItem('jwtToken');
  if (token !== 'null') {
    const decodedToken = jwtDecode(token) as { id: number };
    
    const communityDTO = {
      message: newComment.value,
      publicationDate: new Date().toISOString(),
      activeMember: true,
      likesCount: 0,
      gameID: game.value!.gameID,
      userID: decodedToken.id
    };
    
    if (newComment.value.trim() === '') {
      alert('Debes escribir algo si quieres comentar');
    } else {
      const newMessage = await useApiStore(pinia).fetchPostCommunity(communityDTO);
      
      // Añadir el nuevo comentario a la lista de mensajes
      game.value!.messages.push({
        messageID: newMessage.messageID,
        userID: newMessage.userID,
        message: newMessage.message,
        likesCount: newMessage.likesCount,
        publicationDate: newMessage.publicationDate
      });
      
      // Obtener y almacenar el nombre de usuario para el nuevo mensaje
      userNames.value[newMessage.messageID] = await obtainUser(newMessage.userID);
      likeDisabled[newMessage.messageID] = false;  // Inicialmente, el botón de "like" está habilitado para el nuevo comentario
      
      newComment.value = '';
    }
  } else {
    alert('Error, el usuario debe registrarse primero.');
  }
}

async function likeComment(messageID: number) {
  const token = localStorage.getItem('jwtToken');
  
  if (token !== 'null') {
    const decodedToken = jwtDecode(token!) as { id: number };
  const messages=await useApiStore(pinia).fetchMessagesUser(decodedToken.id);
  const message = messages.find((m:any) => m.messageID === messageID);
  if(!message){
  const messageIndex = game.value!.messages.findIndex((msg: any) => msg.messageID === messageID);
  if (messageIndex !== -1) {
    const message = game.value!.messages[messageIndex];
    const originalLikesCount = message.likesCount;
    const updatedLikesCount = originalLikesCount + 1;

    let liked = localStorage.getItem('messageLiked');

    // Si ya hay un valor, parsearlo; de lo contrario, inicializar liked como una cadena vacía
    liked = liked ? liked : '';

    let likedArray = liked.split(',');

    if (!likedArray.includes(messageID.toString())) {
      // Si no está presente, agregar el nuevo idmensaje y asegurarse de que estén separados por comas
      liked += (liked === '' ? '' : ',') + messageID;
    }
    localStorage.setItem('messageLiked', liked);
    
    if(!likedArray.includes(messageID.toString())){

    // Actualiza localmente el contador de likes
    localStorage.setItem('liked',JSON.stringify(messageID));
    message.likesCount = updatedLikesCount;
    likeDisabled[message.messageID] = true;  // Deshabilita el botón de "like"

    try {
      const likes = { likesCount: updatedLikesCount };
      await useApiStore(pinia).fetchUpdateCommunity(messageID, likes);
    } catch (error) {
      console.error('Error al actualizar los likes:', error);
      // Revertir el contador de likes en caso de error
      message.likesCount = originalLikesCount;
      likeDisabled[message.messageID] = false;
    }
  }else{
    alert('Lo sentimos,no puedes darle me gusta dos veces al mismo comentario.');
  }
  }
}else{
  alert('Lo sentimos no puedes darte like a ti mismo.')
}
  }else{
    alert('Error, el usuario debe registrarse primero para dar like.');
  }
}

function handleInput(event: Event) {
  const input = event.target as HTMLTextAreaElement;
  
  if (input.value.length >= 100) {
    input.value = input.value.slice(0, 100);
  }
}

</script>

<template>
  <div>
    <v-container class="comments-container" fluid v-if="game">
      <h2>Comments</h2>
      <hr />
      <div class="comments-list">
        <div v-for="message in game.messages" :key="message.messageID" class="comment">
          <div class="comment-left">
            <div class="user-info">
              <!-- Mostrar el nombre de usuario almacenado -->
              <strong class="username">{{ userNames[message.messageID] }}</strong>
              <span class="date">{{ formatDate(message.publicationDate) }}</span>
              <p class="comment-text">{{ message.message }}</p>
            </div>
            <div class="comment-actions">
              <span class="like-count">Likes: {{ message.likesCount }}</span>
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <button
                    class="like"
                    v-bind="attrs"
                    v-on="on"
                    @click="likeComment(message.messageID)"
                    :disabled="likeDisabled[message.messageID]"
                    :class="{ 'not-allowed': likeDisabled[message.messageID] }"
                  >
                    LIKE
                  </button>
                </template>
                <span v-if="likeDisabled[message.messageID]">Prohibido</span>
              </v-tooltip>
            </div>
          </div>
        </div>
      </div>
    </v-container>
    <div class="new-comment">
      <v-textarea
        v-model="newComment"
        label="Add a comment"
        outlined
        dense
        rows="2"
        class="comment-textarea"
        @input="handleInput"
      ></v-textarea>
      <v-btn
        color="primary"
        class="comment-btn"
        @click="submitComment"
      >
        Submit
      </v-btn>
    </div>
  </div>
</template>








<style scoped>
.like.not-allowed {
  cursor: not-allowed;
}
.comments-container {
  max-height: 400px; /* Ajustar según sea necesario */
  overflow-y: auto;
  background-color: var(--color-dark-blue);
  padding: 20px;
}

h2 {
  color: var(--neutral-colors-white);
}

hr {
  width: 100%;
  border-color: var(--neutral-colors-white);
  margin-top: 10px;
  margin-bottom: 10px;
}

.comment {
  display: flex;
  flex-direction: column;
  padding: 10px 0;
  margin-top: 10px;
  background-color: var(--color-blue);
}

.comment-left {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-right: 20px;
  margin-left: 10px;
}

.user-info {
  font-size: 0.9em;
}

.username {
  font-size: 1.2em;
  font-family: var(--font-archivo-black);
}

.date {
  font-family: var(--font-orbitron);
}

.user-info strong {
  display: block;
}

.comment-text {
  margin: 5px 0;
  font-family: var(--font-roboto);
  line-height: 1.4;
  text-align: justify;
  color: var(--neutral-colors-white);
  background-color: var(--color-dark-blue);
  padding: 10px;
}

.comment-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: justify;
}

.like-count {
  font-family: var(--font-roboto);
}

.like {
  font-family: var(--font-orbitron);
  color: var(--color-black);
  border-radius: 5px;
  background-color: var(--color-yellow);
  padding: 10px;
  padding-inline: 20px;
}

.new-comment {
  margin-top: 20px;
  background-color: var(--color-dark-blue);
  padding: 10px;
  border-radius: 5px;
}

.comment-textarea {
  background-color: var(--color-dark-blue);
  color: var(--neutral-colors-white);
}

.comment-btn {
  margin-top: 10px;
  background-color: var(--color-yellow);
  color: var(--color-black);
}
.bg-primary{
  margin-top: 10px;
  font-family: var(--font-orbitron);
  background-color: var(--color-yellow) !important;
  color: var(--color-black) !important;
} 
</style>
