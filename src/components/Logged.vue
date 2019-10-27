<template>
  <div class="contenedor">
    <SideBar class="sideBar"/>
  </div>
</template>

<script>
import SideBar from './SideBar.vue'
export default {
  components:{
    SideBar,
  }
}
</script>

<style scoped>
*{
  box-sizing: border-box;
}

.contenedor {
  display: grid;
  height: 100vh;
  grid-template-columns: 170px auto;
  grid-template-rows: 100%;
  grid-template-areas:
    "s c";
}

.sideBar {
  grid-area: s;
}

.pagina {
  grid-area: c;
}

</style>