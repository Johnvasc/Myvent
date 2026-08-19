<script>
    import { ref } from 'vue';

    const username = ref('');
    const password = ref('');
    const confirmPassword = ref('');
    const errorMessage = ref('');

</script>

<template>
  <div class="container mt-5">
    <h2 class="mb-4">Criar Conta</h2>
    <form @submit.prevent="register">
      <div class="mb-3">
        <label for="username" class="form-label">Nome de Usuário</label>
        <input type="text" v-model="username" class="form-control" id="username" required>
      </div>
      <div class="mb-3">
        <label for="password" class="form-label">Senha</label>
        <input type="password" v-model="password" class="form-control" id="password" required>
      </div>
      <div class="mb-3">
        <label for="confirmPassword" class="form-label">Confirmar Senha</label>
        <input type="password" v-model="confirmPassword" class="form-control" id="confirmPassword" required>
      </div>
      <button type="submit" class="btn btn-primary">Registrar</button>
    </form>
    <p v-if="errorMessage" class="text-danger mt-3">{{ errorMessage }}</p>
    <p>
        já possui uma conta? clique <router-link to="/signin">aqui</router-link> para entrar.
    </p>

  </div>
</template>

<style scoped>
  .container {
    max-width: 400px;
    border: 1px solid #444;
    border-radius: 8px;
    padding: 20px;
  }
</style>