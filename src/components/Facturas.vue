<template>
  <div class="contenedor-facturas">
    <NavLateral class="contenedor-nav-l"/>
    <div class="contenedor-cifras">
      
    </div>
    <div class="contenedor-tabla-f">
        
    </div>
  </div>
</template>

<script>
import NavLateral from './NavLateral.vue';
export default {
  components: {
    NavLateral,
  }
};
</script>

<style scoped>
* {
  box-sizing: border-box;
}

.contenedor-facturas {
  height: 100%;
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: 50px 50px auto;
  grid-template-areas:
    "nav"
    "cif"
    "tab";
}

.contenedor-tabla-f{
  grid-area: tab;
  height: 100%;
  width: 100%;
  position: relative;
  overflow: auto;
}

.contenedor-nav-l{
  grid-area: nav;
}

.contenedor-cifras{
  grid-area: cif;
  height: 100%;
  width: 100%;
  background-color: aqua;
}
</style>