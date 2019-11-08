<template>
  <!-- Barra lateral -->
  <div class="contenedor-side">
    <img class="imagen" src="../assets/logo-blanco.png" alt />
    <button @click="actualizarContador(1)" class="botones boton-1">Clientes</button>
    <button @click="actualizarContador(2)" class="botones boton-2">Facturas</button>
    <button @click="actualizarContador(3)" class="botones boton-3">Estadísticas</button>
    <button @click="actualizarContador(4)" class="botones boton-4">Usuario</button>
    <img class="logout" src="../assets/logout.png" @click="logout" />
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "SideBar",
  methods: {
    ...mapActions(["logout", "actualizarContador"])
  }
};
</script>

<style scoped>
.contenedor-side {
  height: 100%;
  background-color: rgb(60, 63, 71);
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(14, 1fr);
  grid-template-areas:
    "i i i"
    "i i i"
    ". . ."
    ". b1 ."
    ". . ."
    ". b2 ."
    ". . ."
    ". b3 ."
    ". . ."
    ". b4 ."
    ". . ."
    ". l ."
    ". . ."
    ". . .";
}
.botones {
  background-color: #4caf50;
  border: none;
  color: white;
  padding: 10px 25px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  cursor: pointer;
  opacity: 0.9;
}
.botones:hover {
  opacity: 1;
}
.boton-1 {
  grid-area: b1;
}
.boton-2 {
  grid-area: b2;
}
.boton-3 {
  grid-area: b3;
}
.boton-4 {
  grid-area: b4;
}
.imagen {
  width: 90%;
  margin: 20px auto;
  grid-area: i;
}
.imagen:hover {
  cursor: pointer;
}
.logout {
  margin: auto;
  width: 40%;
  grid-area: l;
}
.logout:hover {
  cursor: pointer;
}
</style>