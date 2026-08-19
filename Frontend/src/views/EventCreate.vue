<script>
    import { ref } from 'vue';
    const title = ref('');
    const date = ref('');
    const location = ref('');
    const description = ref('');
    const imgUrl = ref('');
    const adminName = ref('John Doe');
</script>

<template>
    <h1 class="text-center mb-4">Bem-vindo, {{ adminName }}!</h1>
    <div class="container mt-5">
        <h2>Criar Evento</h2>
        <form @submit.prevent="createEvent">
        <div class="mb-3">
            <label for="title" class="form-label">Título do Evento</label>
            <input type="text" v-model="title" class="form-control" id="title" required>
        </div>
        <div class="mb-3">
            <label for="date" class="form-label">Data do Evento</label>
            <input type="date" v-model="date" class="form-control" id="date" required>
        </div>
        <div class="mb-3">
            <label for="location" class="form-label">Local do Evento</label>
            <input type="text" v-model="location" class="form-control" id="location" required>
        </div>
        <div class="mb-3">
            <label for="imgUrl" class="form-label">URL da Imagem do Evento</label>
            <input type="text" v-model="imgUrl" class="form-control" id="imgUrl">
        </div>
        <div class="mb-3">
            <label for="description" class="form-label">Descrição do Evento</label>
            <textarea v-model="description" class="form-control" id="description" rows="3"></textarea>
        </div>
        <button type="submit" class="btn btn-primary">Criar Evento</button>
        </form>
    </div>
</template>