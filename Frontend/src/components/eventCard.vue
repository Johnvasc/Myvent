<script setup lang="ts">
  import { ref } from 'vue'
  const title = ref('Evento Incrível: Música, Arte e Diversão!');
  const imageUrl = ref('https://picsum.photos/200/300/?image=52');
  const eventDate = ref('2024-06-15');
  const link = ref('/event/1');
</script>

<template>
  <div class="card" style="width: 18rem;">
    <img :src="imageUrl" class="card-img-top" alt="Event Image">
    <div class="card-body">
      <h5 class="card-title">{{ title }}</h5>
      <p class="card-text">Data do Evento: {{ eventDate }}</p>
      <a :href="link" class="btn btn-primary">Saiba Mais</a>
    </div>
  </div>
</template>

<style scoped>
.card {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s;
}
.card:hover {
  transform: scale(1.05);
}
.card img {
  height: 200px;
  object-fit: cover;
  cursor: pointer;
}
</style>