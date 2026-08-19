<script setup lang="ts">
    import { ref } from 'vue'
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
</script>

<template >
    <div id="event-view">
        <div class="event-details">
          <img :src="imageUrl" alt="Imagem do Evento" class="img-fluid mb-3">
          <h1>{{ title }}</h1>
          <p><strong>Data:</strong> {{ date }}</p>
          <p><strong>Local:</strong> {{ location }}</p>
          <p>{{ description }}</p>
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
      padding: 20px;
}
.event-details {
  max-width: 800px;
  margin: 0 auto;
}
.event-details img {
  width: 100%;
  height: auto;
}
</style>