<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { RouterView, RouterLink, useRouter } from 'vue-router'

interface AuthUser {
  username: string
  userType: number
}

const router = useRouter()
const user = ref<AuthUser | null>(null)

function readSession() {
  const storedUser = localStorage.getItem('user')
  user.value = storedUser ? JSON.parse(storedUser) as AuthUser : null
}

function handleSessionChange() {
  readSession()
}

function logout() {
  localStorage.removeItem('accessToken')
  localStorage.removeItem('user')
  user.value = null
  router.push('/')
}

const isLoggedIn = computed(() => Boolean(localStorage.getItem('accessToken') && user.value))
const isAdmin = computed(() => user.value?.userType === 2)
const isMaster = computed(() => user.value?.userType === 3)
const roleLabel = computed(() => isMaster.value ? 'Master' : isAdmin.value ? 'Administrador' : 'Usuário')

onMounted(() => {
  readSession()
  window.addEventListener('storage', handleSessionChange)
  window.addEventListener('auth-changed', handleSessionChange)
})

onUnmounted(() => {
  window.removeEventListener('storage', handleSessionChange)
  window.removeEventListener('auth-changed', handleSessionChange)
})
</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark mb-4 border-bottom">
    <div class="container">
      <RouterLink to="/" class="navbar-brand fw-bold">MyVent</RouterLink>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mainNavigation" aria-controls="mainNavigation" aria-expanded="false" aria-label="Alternar navegação">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div id="mainNavigation" class="collapse navbar-collapse">
        <div class="navbar-nav me-auto">
          <RouterLink to="/" class="nav-link">Eventos</RouterLink>
          <RouterLink v-if="isAdmin || isMaster" to="/eventcreate" class="nav-link">Criar evento</RouterLink>
          <RouterLink v-if="isMaster" to="/admin" class="nav-link">Aprovar administradores</RouterLink>
        </div>

        <div class="d-flex align-items-center gap-3">
          <template v-if="isLoggedIn">
            <span class="navbar-text text-white">
              {{ user?.username }} <small class="text-secondary">({{ roleLabel }})</small>
            </span>
            <button type="button" class="btn btn-outline-light btn-sm" @click="logout">Sair</button>
          </template>
          <template v-else>
            <RouterLink to="/signin" class="btn btn-outline-light btn-sm">Entrar</RouterLink>
            <RouterLink to="/signup" class="btn btn-primary btn-sm">Criar conta</RouterLink>
          </template>
        </div>
      </div>
    </div>
  </nav>

  <main>
    <RouterView />
  </main>
</template>