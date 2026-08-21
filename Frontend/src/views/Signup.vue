<script>
    import { ref } from 'vue';

    const username = ref('');
    const password = ref('');
    const email = ref('');
    const confirmPassword = ref('');
    const userType = ref('user'); // Default user type
    const errorMessage = ref('');

    async function register() {
        if(password.value !== confirmPassword.value){
            errorMessage.value = 'As senhas não coincidem.';
            return;
        }
        try{
          const res = await fetch('/signup', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ username, email, password })
          });
          if(res.ok){
              showMsg('Conta criada! Redirecionando para o login…', true);
              setTimeout(() => { window.location.href = '/signin'; }, 1500);
          }else{
              const data = await res.json().catch(() => ({}));
              showMsg(data.msg || 'Erro ao criar conta.', false);
          }
        }catch (error) {
            errorMessage.value = 'Ocorreu um erro ao registrar. Por favor, tente novamente.';
            return;
        }


        console.log('Registrando usuário:', {
            username: username.value,
            password: password.value,
            userType: userType.value
        });

        username.value = '';
        password.value = '';
        confirmPassword.value = '';
        userType.value = 'user';
        errorMessage.value = '';
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