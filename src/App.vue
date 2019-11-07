<template>
  <!-- Componente ruteador -->
  <div>
    <!-- Menú de la página de inicio -->
    <div
      class="contenedor"
      v-if="this.$route.name === 'landing' || this.$route.name === 'registro' || this.$route.name === 'login'"
    >
      <div class="menu">
        <a href="/">Inicio</a>
        <a href="login">Login</a>
        <a href="registro">Registro</a>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {};
</script>

<style>
.contenedor {
  display: grid;
  height: 7vh;
  grid-template-columns: repeat(8, 1fr);
  grid-template-rows: 100%;
}

.menu {
  grid-column: 1/-1;
  background-color: rgb(60, 63, 71);
  display: flex;
  color: white;
  align-items: center;
}

.menu > a {
  color: white;
  margin-left: 13px;
}
</style>
