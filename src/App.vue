<template>
  <!-- Componente ruteador -->
  <div>
<<<<<<< HEAD
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
=======
    <div>
      <div class="contenedor" v-if="this.$route.name === 'landing' || this.$route.name === 'registro' || this.$route.name === 'login'">
        <div
          class="menu">
            <a href="/">Inicio</a>
            <a href="login">Login</a>
            <a href="registro">Registro</a>
        </div>

      </div>
      <router-view></router-view>
>>>>>>> estilos-landing
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
*{
  padding: 0%;
  margin: 0%;
  font-family:"Helvetica Neue", Helvetica;
}

.contenedor {
  display: grid;
  height: 7vh;
  grid-template-columns: repeat(8, 1fr);
<<<<<<< HEAD
  grid-template-rows: 100%;
=======
  grid-template-rows: 100%; 
>>>>>>> estilos-landing
}

.menu {
  grid-column: 1/-1;
  background-color: #0C427D;
  display: flex;
  color: white;
  align-items: center;
}

.menu > a {
  color: white;
<<<<<<< HEAD
  margin-left: 13px;
=======
  margin:10px;
}

a{
  color: #fff;
  font-weight:800 ;
  padding: 3vh;
}

a:hover{
  background-color: #CCD4EB;
  color: #0C427D;
  font-weight:800 ;
>>>>>>> estilos-landing
}
</style>
