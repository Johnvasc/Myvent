<script setup lang="ts">
import { RouterView, RouterLink } from 'vue-router'
</script>

<template>
  <!-- Barra de Navegação Global -->
  <nav class="navbar navbar-dark bg-dark mb-4 border-bottom">
    <div class="container">
      <RouterLink to="/" class="navbar-brand fw-bold">MyVent</RouterLink>
      <RouterLink to="/signup" class="navbar-brand fw-bold">Criar Conta</RouterLink>
      <RouterLink to="/signin" class="navbar-brand fw-bold">Entrar</RouterLink>
    </div>
  </nav>

  <!-- O Vue Router renderiza a página da rota atual aqui -->
  <main>
    <RouterView />
  </main>
</template>