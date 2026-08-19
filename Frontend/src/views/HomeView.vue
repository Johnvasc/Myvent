<script setup lang="ts">
import { ref } from 'vue'
import Carousel from '../components/carousel.vue'
import EventCard from '../components/eventCard.vue'
import Search from '../components/search.vue'
import EventList from '../components/eventList.vue'


const titulo = ref('Bem-vindo à minha aplicação!')
const contador = ref(0)

function incrementar() {
  contador.value++
}
</script>

<template>
  <!-- O HTML / Bootstrap da sua página -->
  <main id="home" class="p-4">
    <div>
      <carousel />
      <search />
      <event-list />
    </div>
    <div style="padding: 0; margin: 0; display: flex; flex-direction: column; gap: 1rem;">
      <event-card />
      <event-card />
      <event-card />

    </div>
  </main>
</template>

<style scoped>
  #home{
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: center;
    height: 100%;
    gap: 2rem;
  }
</style>