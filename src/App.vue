<template>
  <div>
    <div class="contenedor" v-if="this.$route.name === 'landing' || this.$route.name === 'registro' || this.$route.name === 'login'">
      <div
        class="menu">
     
          <a href="/">Inicio</a>
          <a href="login">Login</a>
          <a href="registro">Registro</a>

      </div>
      <div class="cuerpo"></div>
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
  height: 100vh;
  grid-template-columns: repeat(8, 1fr);
  grid-template-rows: 7% 93%;

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

.cuerpo {
  background-color: rgb(255, 255, 255);
  grid-column: 1/-1;
}
</style>
