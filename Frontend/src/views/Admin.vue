<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Chart from 'chart.js/auto'

interface UserRequest {
  id: number
  name: string
  email: string
  avatar: string
  dataSolicitacao: string
  tipo: 'Organizador' | 'Participante'
}

// Métricas do Dashboard
const stats = ref([
  { label: 'Eventos Ativos', valor: '148', icone: 'bi-calendar-check', cor: 'primary', variacao: '+12% este mês' },
  { label: 'Total de Usuários', valor: '2.450', icone: 'bi-people', cor: 'success', variacao: '+5.4% esta semana' },
  { label: 'Receita de Ingressos', valor: 'R$ 48.920', icone: 'bi-currency-dollar', cor: 'warning', variacao: '+18% vs meta' },
  { label: 'Solicitações Pendentes', valor: '3', icone: 'bi-hourglass-split', cor: 'danger', variacao: 'Requer atenção' }
])

// Lista de Solicitações
const solicitacoes = ref<UserRequest[]>([
  {
    id: 1,
    name: 'John Doe',
    email: 'john.doe@example.com',
    avatar: 'https://i.pravatar.cc/150?img=11',
    dataSolicitacao: '19/08/2026',
    tipo: 'Organizador'
  },
  {
    id: 2,
    name: 'Mariana Silva',
    email: 'mariana.silva@devmail.com',
    avatar: 'https://i.pravatar.cc/150?img=5',
    dataSolicitacao: '18/08/2026',
    tipo: 'Organizador'
  },
  {
    id: 3,
    name: 'Carlos Mendes',
    email: 'carlos.mendes@empresa.com',
    avatar: 'https://i.pravatar.cc/150?img=13',
    dataSolicitacao: '17/08/2026',
    tipo: 'Participante'
  }
])

// Ações
function approveUser(userId: number) {
  solicitacoes.value = solicitacoes.value.filter(u => u.id !== userId)
}

function rejectUser(userId: number) {
  solicitacoes.value = solicitacoes.value.filter(u => u.id !== userId)
}

function deleteUser(userId: number) {
  solicitacoes.value = solicitacoes.value.filter(u => u.id !== userId)
}

// Inicialização dos Gráficos com Chart.js
onMounted(() => {
  // Gráfico 1: Crescimento de Eventos (Linha)
  const ctxEvents = document.getElementById('eventsChart') as HTMLCanvasElement
  if (ctxEvents) {
    new Chart(ctxEvents, {
      type: 'line',
      data: {
        labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago'],
        datasets: [{
          label: 'Eventos Criados',
          data: [25, 40, 35, 60, 80, 75, 110, 148],
          borderColor: '#0d6efd',
          backgroundColor: 'rgba(13, 110, 253, 0.1)',
          fill: true,
          tension: 0.35
        }]
      },
      options: {
        responsive: true,
        plugins: { legend: { display: false } }
      }
    })
  }

  // Gráfico 2: Novos Usuários por Categoria (Barra)
  const ctxUsers = document.getElementById('usersChart') as HTMLCanvasElement
  if (ctxUsers) {
    new Chart(ctxUsers, {
      type: 'bar',
      data: {
        labels: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'],
        datasets: [{
          label: 'Novos Cadastros',
          data: [12, 19, 25, 18, 30, 45, 38],
          backgroundColor: '#198754',
          borderRadius: 6
        }]
      },
      options: {
        responsive: true,
        plugins: { legend: { display: false } }
      }
    })
  }
})
</script>

<template>
  <div class="container-fluid py-4 px-md-5">
    <!-- Cabeçalho -->
    <div class="d-flex justify-content-between align-items-center mb-4">
      <div>
        <h2 class="fw-bold mb-1">Painel Administrativo</h2>
        <p class="text-muted mb-0">Visão geral de métricas, performance e solicitações de usuários.</p>
      </div>
      <button class="btn btn-primary">
        <i class="bi bi-download me-1"></i> Baixar Relatório
      </button>
    </div>

    <!-- Cards de Métricas -->
    <div class="row g-3 mb-4">
      <div v-for="(stat, index) in stats" :key="index" class="col-12 col-sm-6 col-xl-3">
        <div class="card shadow-sm border-0 h-100 p-3">
          <div class="d-flex align-items-center justify-content-between">
            <div>
              <span class="text-muted small fw-medium">{{ stat.label }}</span>
              <h3 class="fw-bold my-1">{{ stat.valor }}</h3>
              <small class="text-secondary">{{ stat.variacao }}</small>
            </div>
            <div :class="`bg-${stat.cor} bg-opacity-10 text-${stat.cor} p-3 rounded-circle fs-4`">
              <i :class="`bi ${stat.icone}`"></i>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Seção de Gráficos -->
    <div class="row g-4 mb-4">
      <div class="col-12 col-lg-6">
        <div class="card shadow-sm border-0 p-3 h-100">
          <h5 class="fw-bold mb-3"><i class="bi bi-graph-up text-primary me-2"></i>Crescimento de Eventos</h5>
          <canvas id="eventsChart"></canvas>
        </div>
      </div>
      <div class="col-12 col-lg-6">
        <div class="card shadow-sm border-0 p-3 h-100">
          <h5 class="fw-bold mb-3"><i class="bi bi-bar-chart-line text-success me-2"></i>Novos Usuários na Semana</h5>
          <canvas id="usersChart"></canvas>
        </div>
      </div>
    </div>

    <!-- Tabela de Solicitações -->
    <div class="card shadow-sm border-0">
      <div class="card-header border-0 bg-transparent py-3 d-flex justify-content-between align-items-center">
        <h5 class="fw-bold mb-0">Solicitações Pendentes</h5>
        <span class="badge bg-danger">{{ solicitacoes.length }} pendentes</span>
      </div>

      <div class="table-responsive">
        <table class="table align-middle mb-0">
          <thead class="table-light">
            <tr>
              <th>Usuário</th>
              <th>Tipo</th>
              <th>Data</th>
              <th class="text-end pe-4">Ações</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in solicitacoes" :key="item.id">
              <td>
                <div class="d-flex align-items-center gap-3">
                  <img :src="item.avatar" class="rounded-circle" width="40" height="40" alt="Avatar">
                  <div>
                    <span class="fw-semibold d-block">{{ item.name }}</span>
                    <span class="text-muted small">{{ item.email }}</span>
                  </div>
                </div>
              </td>
              <td>
                <span class="badge bg-secondary bg-opacity-25 text-white border">
                  {{ item.tipo }}
                </span>
              </td>
              <td class="text-muted small">{{ item.dataSolicitacao }}</td>
              <td class="text-end pe-4">
                <button @click="approveUser(item.id)" class="btn btn-sm btn-outline-success me-2" title="Aprovar">
                  <i class="bi bi-check-lg"></i> Aprovar
                </button>
                <button @click="rejectUser(item.id)" class="btn btn-sm btn-outline-warning me-2" title="Rejeitar">
                  <i class="bi bi-x-lg"></i> Rejeitar
                </button>
                <button @click="deleteUser(item.id)" class="btn btn-sm btn-outline-danger" title="Deletar">
                  <i class="bi bi-trash"></i>
                </button>
              </td>
            </tr>
            <tr v-if="solicitacoes.length === 0">
              <td colspan="4" class="text-center py-4 text-muted">
                Nenhuma solicitação pendente no momento.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>