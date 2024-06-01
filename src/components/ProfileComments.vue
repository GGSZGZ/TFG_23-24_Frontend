<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useApiStore, pinia } from '../store/api';
import {jwtDecode} from 'jwt-decode';

const token = localStorage.getItem('jwtToken');
const decodedToken = jwtDecode(token!) as { id: number };

const router = useRouter();
const userNames = ref<Record<number, string>>({});
const messages = ref<Array<{ messageID: number, publicationDate: string, message: string, gameID: number }>>([]);
const editingMessageID = ref<number | null>(null);
const newMessageContent = ref<string>('');

onMounted(async () => {
  try {
    const apiStore = useApiStore(pinia);
    const fetchedMessages = await apiStore.fetchMessagesUser(decodedToken.id);
    
    messages.value = fetchedMessages;

    // Obtener y almacenar los nombres de usuario para cada mensaje
    for (const message of messages.value) {
      const gameName = await obtainGameName(message.gameID);
      userNames.value[message.messageID] = gameName;
    }
  } catch (error) {
    console.error('Error al obtener los mensajes:', error);
  }
});

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = date.toLocaleString('en-US', { month: 'short' });
  const day = String(date.getDate()).padStart(2, '0');
  return `${day}-${month}-${year}`;
};

async function obtainGameName(gameID: number) {
  const apiStore = useApiStore(pinia);
  const game = await apiStore.fetchGame(gameID);
  return game.name;
}

const startEditing = (messageID: number, currentMessage: string) => {
  editingMessageID.value = messageID;
  newMessageContent.value = currentMessage;
};

const saveMessage = async (messageID: number) => {
  try {
    const messageDTO={
        message : newMessageContent.value,
        edited : true
    }
    const apiStore = useApiStore(pinia);
    await apiStore.fetchUpdateCommunity(messageID, messageDTO);
    const messageIndex = messages.value.findIndex(msg => msg.messageID === messageID);
    if (messageIndex !== -1) {
      messages.value[messageIndex].message = newMessageContent.value;
      messages.value[messageIndex].edited = true;
    }
    editingMessageID.value = null;
  } catch (error) {
    console.error('Error al actualizar el mensaje:', error);
  }
};
</script>

<template>
    <div>
      <v-container class="comments-container" fluid>
        <div class="comments-list">
          <div v-for="message in messages" :key="message.messageID" class="comment">
            <div class="comment-left">
              <div class="user-info">
                <strong class="username">{{ userNames[message.messageID] }}</strong>
                <span class="date">{{ formatDate(message.publicationDate) }}</span>
                <p class="comment-text" v-if="editingMessageID !== message.messageID">{{ message.message }}</p>
                <input v-else v-model="newMessageContent" class="comment-input" />
                <span v-if="message.edited" class="edited-label"><em>Edited</em></span>
              </div>
            </div>
            <div class="comment-right">
              <button @click="startEditing(message.messageID, message.message)" v-if="editingMessageID !== message.messageID" class="bg-primary">Modificar</button>
              <button @click="saveMessage(message.messageID)" v-else class="bg-primary">Guardar</button>
            </div>
          </div>
        </div>
      </v-container>
    </div>
  </template>

<style scoped>
.like.not-allowed {
  cursor: not-allowed;
}
.comments-container {
  max-height: 500px;
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

.comment-right {
  display: flex;
  align-items: center;
  margin-top: 10px;
  margin-left: 4%;
}
.comment-right button {
  background-color: transparent;
  border: none;
  padding: 10px;
  cursor: pointer;
  flex-grow: 0;
}
.comment-right button:hover {
  background-color: var(--color-yellow);
  transform: scale(1.1);
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

.comment-input {
  margin: 5px 0;
  font-family: var(--font-roboto);
  line-height: 1.4;
  text-align: justify;
  color: var(--neutral-colors-white);
  background-color: var(--color-dark-blue);
  padding: 10px;
  width: 100%;
}

.bg-primary {
  margin-top: 10px;
  font-family: var(--font-orbitron);
  background-color: var(--color-yellow) !important;
  color: var(--color-black) !important;
}

.edited-label {
  margin-top: 5px;
  margin-left: 310px;
  font-style: italic;
  color: gray;
}
</style>
