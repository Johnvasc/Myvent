<script setup lang="ts">
import { ref } from 'vue'

const sliding = ref(false)
const slideIndex = ref(0)
</script>

<template>
  <div>
    <!-- Carrossel Nativo do Bootstrap 5 -->
    <div id="meuCarrossel" class="carousel slide" data-bs-ride="carousel">
      <!-- Indicadores (bolinhas/tracinhos) -->
      <div class="carousel-indicators">
        <button type="button" data-bs-target="#meuCarrossel" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
        <button type="button" data-bs-target="#meuCarrossel" data-bs-slide-to="1" aria-label="Slide 2"></button>
        <button type="button" data-bs-target="#meuCarrossel" data-bs-slide-to="2" aria-label="Slide 3"></button>
      </div>

      <!-- Slides -->
      <div class="carousel-inner">
        <div class="carousel-item active" data-bs-interval="4000">
          <img src="https://picsum.photos/1024/480/?image=52" class="d-block w-100" alt="Primeiro Slide">
          <div class="carousel-caption d-none d-md-block text-shadow">
            <h5>Primeiro Slide</h5>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </div>
        </div>

        <div class="carousel-item" data-bs-interval="4000">
          <img src="https://picsum.photos/1024/480/?image=54" class="d-block w-100" alt="Segundo Slide">
          <div class="carousel-caption d-none d-md-block text-shadow">
            <h1>Hello world!</h1>
          </div>
        </div>

        <div class="carousel-item" data-bs-interval="4000">
          <img src="https://picsum.photos/1024/480/?image=58" class="d-block w-100" alt="Terceiro Slide">
          <div class="carousel-caption d-none d-md-block text-shadow">
            <h5>Slide Apenas Imagem</h5>
          </div>
        </div>
      </div>

      <!-- Controles de Anterior e Próximo -->
      <button class="carousel-control-prev" type="button" data-bs-target="#meuCarrossel" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Anterior</span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#meuCarrossel" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Próximo</span>
      </button>
    </div>
  </div>
</template>

<style scoped>
.text-shadow {
  text-shadow: 1px 1px 2px #333;
}

.carousel-item img {
  max-height: 480px;
  object-fit: cover;
}
</style>