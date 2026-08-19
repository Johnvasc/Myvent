<script setup lang="ts">
import { ref } from 'vue'

interface Evento {
  id: number
  titulo: string
  categoria: string
  data: string
  local: string
  preco: string
  status: 'Disponível' | 'Últimos Ingressos' | 'Esgotado'
}

// Dados simulados (placeholders)
const eventos = ref<Evento[]>([
  {
    id: 1,
    titulo: 'Festival de Inverno & Música Acústica',
    categoria: 'Música',
    data: '15/09/2026 às 19:30',
    local: 'Teatro Municipal',
    preco: 'R$ 80,00',
    status: 'Disponível'
  },
  {
    id: 2,
    titulo: 'Tech Summit Brasil: IA e Futuro Web',
    categoria: 'Tecnologia',
    data: '22/09/2026 às 09:00',
    local: 'Centro de Convenções',
    preco: 'R$ 150,00',
    status: 'Últimos Ingressos'
  },
  {
    id: 3,
    titulo: 'Circuito Gastronômico & Degustação de Cafés',
    categoria: 'Gastronomia',
    data: '28/09/2026 às 16:00',
    local: 'Praça das Artes',
    preco: 'Entrada Grátis',
    status: 'Disponível'
  },
  {
    id: 4,
    titulo: 'Campeonato Regional de E-Sports',
    categoria: 'Games',
    data: '05/10/2026 às 14:00',
    local: 'Arena Digital',
    preco: 'R$ 45,00',
    status: 'Esgotado'
  },
  {
    id: 5,
    titulo: 'Workshop: Fotografia Urbana e Iluminação',
    categoria: 'Artes',
    data: '12/10/2026 às 10:00',
    local: 'Galeria Central',
    preco: 'R$ 60,00',
    status: 'Disponível'
  }
])

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
</script>

<template>
  <div class="card shadow-sm border-0">
    <div class="card-header bg-dark text-white d-flex justify-content-between align-items-center py-3">
      <h5 class="mb-0 fw-semibold">
        <i class="bi bi-calendar-event me-2"></i>Todos os Eventos
      </h5>
      <span class="badge bg-primary">{{ eventos.length }} eventos</span>
    </div>

    <ul class="list-group list-group-flush event-list">
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
              <span class="badge rounded-pill bg-light text-dark border">{{ evento.categoria }}</span>
              <span class="badge" :class="getBadgeClass(evento.status)">{{ evento.status }}</span>
            </div>
            <h6 class="fw-bold mb-1 text-dark">{{ evento.titulo }}</h6>
            <div class="text-muted small d-flex flex-wrap gap-3">
              <span><i class="bi bi-clock me-1"></i>{{ evento.data }}</span>
              <span><i class="bi bi-geo-alt me-1"></i>{{ evento.local }}</span>
            </div>
          </div>

          <!-- Preço e Ação -->
          <div class="d-flex align-items-center justify-content-between justify-content-md-end gap-3 mt-2 mt-md-0">
            <span class="fw-bold fs-6 text-primary">{{ evento.preco }}</span>
            <button
              class="btn btn-sm btn-outline-primary"
              :disabled="evento.status === 'Esgotado'"
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