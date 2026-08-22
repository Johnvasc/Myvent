<script setup lang="ts">
import { ref } from 'vue'

const title = ref('')
const date = ref('')
const location = ref('')
const category = ref('')
const price = ref('Entrada Grátis')
const status = ref<'Disponível' | 'Últimos Ingressos' | 'Esgotado'>('Disponível')
const description = ref('')
const imageUrl = ref('')
const adminName = ref('Administrador')
const errorMessage = ref('')
const successMessage = ref('')

async function createEvent() {
    errorMessage.value = ''
    successMessage.value = ''
    try {
        const response = await fetch('http://localhost:3000/api/events', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify({
                title: title.value,
                date: date.value,
                location: location.value,
                category: category.value,
                price: price.value,
                status: status.value,
                description: description.value || undefined,
                imageUrl: imageUrl.value || undefined
            })
        })
        const data = await response.json().catch(() => ({}))
        if (!response.ok) throw new Error(data.error || 'Não foi possível criar o evento.')
        successMessage.value = 'Evento criado com sucesso.'
    } catch (error) {
        errorMessage.value = error instanceof Error ? error.message : 'Erro ao criar evento.'
    }
}
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
            <input type="datetime-local" v-model="date" class="form-control" id="date" required>
        </div>
        <div class="mb-3">
            <label for="location" class="form-label">Local do Evento</label>
            <input type="text" v-model="location" class="form-control" id="location" required>
        </div>
        <div class="mb-3">
            <label for="imgUrl" class="form-label">URL da Imagem do Evento</label>
            <input type="url" v-model="imageUrl" class="form-control" id="imageUrl">
        </div>
        <div class="mb-3">
            <label for="description" class="form-label">Descrição do Evento</label>
            <textarea v-model="description" class="form-control" id="description" rows="3"></textarea>
        </div>
        <div class="mb-3">
            <label for="category" class="form-label">Categoria</label>
            <input type="text" v-model="category" class="form-control" id="category" required>
        </div>
        <div class="mb-3">
            <label for="price" class="form-label">Preço</label>
            <input type="text" v-model="price" class="form-control" id="price" required>
        </div>
        <div class="mb-3">
            <label for="status" class="form-label">Status</label>
            <select v-model="status" class="form-select" id="status">
                <option>Disponível</option>
                <option>Últimos Ingressos</option>
                <option>Esgotado</option>
            </select>
        </div>
        <button type="submit" class="btn btn-primary">Criar Evento</button>
        </form>
        <p v-if="errorMessage" class="alert alert-danger mt-3">{{ errorMessage }}</p>
        <p v-if="successMessage" class="alert alert-success mt-3">{{ successMessage }}</p>
    </div>
</template>