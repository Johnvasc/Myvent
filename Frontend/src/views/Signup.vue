<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const username = ref('');
const password = ref('');
const email = ref('');
const confirmPassword = ref('');
const userType = ref('user');
const errorMessage = ref('');
const successMessage = ref('');

async function register() {
  errorMessage.value = '';
  successMessage.value = '';

  if (password.value !== confirmPassword.value) {
    errorMessage.value = 'As senhas não coincidem.';
    return;
  }

  try {
    const res = await fetch('http://localhost:3000/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: username.value,
        email: email.value,
        password: password.value,
        userType: userType.value
      })
    });

    const data = await res.json().catch(() => ({}));

    if (res.ok) {
      if (data.accessToken) localStorage.setItem('accessToken', data.accessToken);
      successMessage.value = data.message
        ? 'Cadastro de administrador enviado para aprovação do master.'
        : 'Conta criada! Redirecionando para o login…';
      setTimeout(() => {
        router.push('/signin');
      }, 1500);
    } else {
      errorMessage.value = data.error || data.msg || 'Erro ao criar conta.';
    }
  } catch (error) {
    errorMessage.value = 'Ocorreu um erro ao registrar. Por favor, tente novamente.';
  }
}
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
        <label for="email" class="form-label">Email</label>
        <input type="email" v-model="email" class="form-control" id="email" required>
      </div>
      <div class="mb-3">
        <label for="password" class="form-label">Senha</label>
        <input type="password" v-model="password" class="form-control" id="password" required>
      </div>
      <div class="mb-3">
        <label for="confirmPassword" class="form-label">Confirmar Senha</label>
        <input type="password" v-model="confirmPassword" class="form-control" id="confirmPassword" required>
      </div>
      <div class="mb-3">
        <label for="userType" class="form-label">Tipo de Usuário</label>
        <select v-model="userType" class="form-control" id="userType">
          <option value="user">Usuário</option>
          <option value="admin">Criador de eventos</option>
        </select>
      </div>
      <button type="submit" class="btn btn-primary">Registrar</button>
    </form>

    <p v-if="errorMessage" class="text-danger mt-3">{{ errorMessage }}</p>
    <p v-if="successMessage" class="text-success mt-3">{{ successMessage }}</p>

    <p class="mt-3">
      Já possui uma conta? Clique <router-link to="/signin">aqui</router-link> para entrar.
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