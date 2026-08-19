<template>
<div class="mt-4">
  <!-- Filtro Rápido -->
  <div class="card p-3 shadow-sm border-0 mb-4 bg-dark">
    <div class="row g-2 align-items-center">
      <div class="col-md-5">
        <input type="text" class="form-control" placeholder="Buscar eventos, shows, teatros...">
      </div>
      <div class="col-md-4">
        <select class="form-select">
          <option selected>Todas as categorias</option>
          <option>Música</option>
          <option>Tecnologia</option>
          <option>Gastronomia</option>
        </select>
      </div>
      <div class="col-md-3">
        <button class="btn btn-primary w-100"><i class="bi bi-search me-1"></i> Filtrar</button>
      </div>
    </div>
  </div>

  <!-- Categorias Rápidas -->
  <h5 class="fw-bold mb-3">Navegue por Categorias</h5>
  <div class="d-flex gap-2 flex-wrap mb-4" >
    <button class="btn btn-outline-secondary btn-sm"><i class="bi bi-music-note-beamed me-1"></i> Shows</button>
    <button class="btn btn-outline-secondary btn-sm"><i class="bi bi-laptop me-1"></i> Tecnologia</button>
    <button class="btn btn-outline-secondary btn-sm"><i class="bi bi-cup-hot me-1"></i> Gastronomia</button>
    <button class="btn btn-outline-secondary btn-sm"><i class="bi bi-controller me-1"></i> Games</button>
  </div>
</div>
</template>