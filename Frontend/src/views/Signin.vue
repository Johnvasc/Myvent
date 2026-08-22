<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const username = ref('');
const password = ref('');
const errorMessage = ref('');
const successMessage = ref('');

async function login() {
  errorMessage.value = '';
  successMessage.value = '';

  try {
    const res = await fetch('http://localhost:3000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: username.value,
        password: password.value
      })
    });

    const data = await res.json().catch(() => ({}));

    if (res.ok) {
      if (data.accessToken) localStorage.setItem('accessToken', data.accessToken);
      if (data.user) localStorage.setItem('user', JSON.stringify(data.user));
      window.dispatchEvent(new Event('auth-changed'));

      successMessage.value = 'Login bem-sucedido! Redirecionando…';
      setTimeout(() => {
        router.push('/');
      }, 1500);
    } else {
      errorMessage.value = data.error || data.msg || 'Erro ao fazer login.';
    }
  } catch (error) {
    errorMessage.value = 'Ocorreu um erro ao fazer login. Por favor, tente novamente.';
  }
}
</script>

<template>
  <div class="container mt-5">
    <h2 class="mb-4">Entrar</h2>
    <form @submit.prevent="login">
      <div class="mb-3">
        <label for="username" class="form-label">Nome de Usuário</label>
        <input type="text" v-model="username" class="form-control" id="username" required>
      </div>
      <div class="mb-3">
        <label for="password" class="form-label">Senha</label>
        <input type="password" v-model="password" class="form-control" id="password" required>
      </div>
      <button type="submit" class="btn btn-primary">Entrar</button>
    </form>

    <div v-if="errorMessage" class="alert alert-danger mt-3">
      {{ errorMessage }}
    </div>

    <div v-if="successMessage" class="alert alert-success mt-3">
      {{ successMessage }}
    </div>

    <div class="mt-3">
      <p>
        Para criar uma conta, clique <router-link to="/signup">aqui</router-link>.
      </p>
    </div>
  </div>
</template>

<style scoped>
.container {
  max-width: 400px;
  border: 1px solid #444;
  padding: 20px;
  border-radius: 8px;
}
</style>