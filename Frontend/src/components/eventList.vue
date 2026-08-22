<script setup lang="ts">
import { ref, onMounted} from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter();

interface Evento {
  id: number
  title: string
  category: string
  date: string
  location: string
  price: string
  status: 'Disponível' | 'Últimos Ingressos' | 'Esgotado'
}

const loading = ref(true)
const errorMessage = ref('')
const eventos = ref<Evento[]>([])

function formatDate(date: string) {
  return new Date(date).toLocaleString('pt-BR', {
    dateStyle: 'short',
    timeStyle: 'short'
  })
}

function getBadgeClass(status: Evento['status']) {
  switch (status) {
    case 'Disponível':
      return 'bg-success'
    case 'Últimos Ingressos':
      return 'bg-warning text-dark'
    case 'Esgotado':
      return 'bg-danger'
    default:
      return 'bg-secondary'
  }
}
async function fetchEventos() {
  try {
    const response = await fetch('http://localhost:3000/api/events');
    if (!response.ok) {
      throw new Error(`Erro ao buscar eventos: ${response.statusText}`);
    }
    eventos.value = await response.json() as Evento[]
  } catch (error) {
    errorMessage.value = 'Erro ao buscar eventos.';
    console.error('Erro ao buscar eventos:', error);
  } finally {
    loading.value = false;
  }
}
onMounted(() => {
  fetchEventos();
});
</script>

<template>
  <div class="card shadow-sm border-0">
    <div class="card-header bg-dark text-white d-flex justify-content-between align-items-center py-3">
      <h5 class="mb-0 fw-semibold">
        <i class="bi bi-calendar-event me-2"></i>Todos os Eventos
      </h5>
      <span class="badge bg-primary">{{ eventos.length }} eventos</span>
    </div>

    <div v-if="loading" class="p-4 text-center text-muted">Carregando eventos...</div>
    <div v-else-if="errorMessage" class="alert alert-danger m-3">{{ errorMessage }}</div>
    <div v-else-if="eventos.length === 0" class="p-4 text-center text-muted">Nenhum evento encontrado.</div>

    <ul v-else class="list-group list-group-flush event-list">
      <li
        v-for="(evento, index) in eventos"
        :key="evento.id"
        class="list-group-item event-item p-3"
        :class="index % 2 === 0 ? 'bg-cor-a' : 'bg-cor-b'"
      >
        <div class="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-2">
          <!-- Detalhes do Evento -->
          <div>
            <div class="d-flex align-items-center gap-2 mb-1">
              <span class="badge rounded-pill bg-light text-dark border">{{ evento.category }}</span>
              <span class="badge" :class="getBadgeClass(evento.status)">{{ evento.status }}</span>
            </div>
            <h6 class="fw-bold mb-1 text-white">{{ evento.title }}</h6>
            <div class="text-muted small d-flex flex-wrap gap-3">
              <span><i class="bi bi-clock me-1"></i>{{ formatDate(evento.date) }}</span>
              <span><i class="bi bi-geo-alt me-1"></i>{{ evento.location }}</span>
            </div>
          </div>

          <!-- Preço e Ação -->
          <div class="d-flex align-items-center justify-content-between justify-content-md-end gap-3 mt-2 mt-md-0">
            <span class="fw-bold fs-6 text-primary">{{ evento.price }}</span>
            <button
              class="btn btn-sm btn-outline-primary"
              :disabled="evento.status === 'Esgotado'"
              @click="() => router.push(`/event/${evento.id}`)"
            >
              Ver Detalhes
            </button>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<style scoped>
/* Alternância de cores personalizada */
.bg-cor-a {
  background-color: #212529;
}

.bg-cor-b {
  background-color: #1d2024; /* Tom cinza-claro sutil */
}

.event-item {
  transition: background-color 0.2s ease, transform 0.1s ease;
}

.event-item:hover {
  background-color: #3d3e42 !important; /* Destaque ao passar o mouse */
}
</style>