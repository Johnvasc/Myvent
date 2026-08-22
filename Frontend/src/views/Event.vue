<script setup lang="ts">
    import { ref, onMounted } from 'vue'
    import { useRoute } from 'vue-router'

    const route = useRoute()
    const eventId = route.params.id
    const title = ref('Titulo do Evento')
    const date = ref('Data do Evento')
    const location = ref('Local do Evento')
    const description = ref('Descrição do Evento')
    const imageUrl = ref('https://picsum.photos/800/400/?image=52')
    const isLogin = ref(true) // Variável para controlar o estado de login
    const isParticipant = ref(false) // Variável para controlar se o usuário é participante

    async function fetchEventDetails() {
        try {
            const response = await fetch(`http://localhost:3000/api/events/${eventId}`);
            if (!response.ok) {
                throw new Error(`Erro ao buscar detalhes do evento: ${response.statusText}`);
            }
            const data = await response.json();
            title.value = data.title;
            date.value = new Date(data.date).toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' });
            location.value = data.location;
            description.value = data.description || 'Sem descrição disponível.';
            imageUrl.value = data.imageUrl || 'https://picsum.photos/800/400/?image=52';
        } catch (error) {
            console.error('Erro ao buscar detalhes do evento:', error);
        }
    }

    onMounted(() => {
        fetchEventDetails();
    });
</script>

<template >
    <div id="event-view">
        <div class="event-details">
          <img :src="imageUrl" alt="Imagem do Evento" class="img-fluid mb-3" id="event-image"/>
          <h1 id="title">{{ title }}</h1>
          <p><strong>Data:</strong> {{ date }}</p>
          <p id="location"><strong>Local:</strong> {{ location }}</p>
          <p id="description">{{ description }}</p>
        </div>
        <div v-if="eventId" class="alert alert-info mt-3 p-3">
          Detalhes do evento com ID: {{ eventId }}
        </div>
        <div v-if="isParticipant" class="mt-3 p-3">
          <button class="btn btn-success">
              Sair do evento
          </button>
        </div>
        <div v-else-if="isLogin" class=" mt-3 p-3">
          <button class="btn btn-primary mt-3">
              Quero participar!
          </button>
        </div>
        <div v-else>
          <p>Quer participar do evento? <router-link to="/signin">Faça login</router-link>.</p>
        </div>
    </div>
</template>

<style scoped>
#event-view {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 20px;
  min-height: 100vh;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  color: #e2e8f0;
}

.event-details {
  width: 100%;
  max-width: 760px;
  background: #1e293b; /* Superfície do card */
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.5), 0 8px 10px -6px rgba(0, 0, 0, 0.4);
  border: 1px solid #334155;
}

#event-image {
  width: 100%;
  height: 340px;
  object-fit: cover;
  display: block;
}

/* Área de conteúdo interno */
.event-details > *:not(#event-image) {
  padding: 0 28px;
}

#title {
  font-size: 2rem;
  font-weight: 700;
  margin: 24px 0 16px 0;
  color: #f8fafc; /* Branco de alto contraste */
  line-height: 1.25;
}

.event-details p {
  font-size: 1rem;
  margin-bottom: 10px;
  color: #94a3b8; /* Cinza médio suave para textos secundários */
}

.event-details p strong {
  color: #cbd5e1;
}

#description {
  margin-top: 20px;
  margin-bottom: 28px;
  padding-top: 16px;
  border-top: 1px solid #334155;
  line-height: 1.7;
  color: #cbd5e1;
  white-space: pre-line;
}

/* Alertas e avisos */
.alert-info {
  background-color: rgba(30, 58, 138, 0.3);
  color: #60a5fa;
  border: 1px solid #1e40af;
  border-radius: 10px;
  font-size: 0.9rem;
  max-width: 760px;
  width: 100%;
  text-align: center;
}

/* Botões de Ação */
.btn {
  font-weight: 600;
  padding: 12px 28px;
  border-radius: 10px;
  border: none;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
}

.btn-primary {
  background-color: #3b82f6;
  color: #ffffff;
  box-shadow: 0 4px 14px rgba(59, 130, 246, 0.35);
}

.btn-primary:hover {
  background-color: #2563eb;
  transform: translateY(-1px);
  box-shadow: 0 6px 20px rgba(59, 130, 246, 0.45);
}

.btn-success {
  background-color: #ef4444;
  color: #ffffff;
  box-shadow: 0 4px 14px rgba(239, 68, 68, 0.35);
}

.btn-success:hover {
  background-color: #dc2626;
  box-shadow: 0 6px 20px rgba(239, 68, 68, 0.45);
}

/* Links */
a {
  color: #60a5fa;
  text-decoration: none;
  font-weight: 600;
}

a:hover {
  text-decoration: underline;
  color: #93c5fd;
}
</style>