<script>
    import { ref } from 'vue';

    const username = ref('');
    const password = ref('');
    const errorMessage = ref('');

    async function login() {
        try {
            const res = await fetch('/signin', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });
            if (res.ok) {
                showMsg('Login bem-sucedido! Redirecionando…', true);
                setTimeout(() => { window.location.href = '/'; }, 1500);
            } else {
                const data = await res.json().catch(() => ({}));
                showMsg(data.msg || 'Erro ao fazer login.', false);
            }
        } catch (error) {
            errorMessage.value = 'Ocorreu um erro ao fazer login. Por favor, tente novamente.';
        }
    }

</script>

<template>
  <div class="container mt-5">
    <h2>Entrar</h2>
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
    <div>
        <p>
            para criar uma conta, clique <router-link to="/signup">aqui</router-link>.
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