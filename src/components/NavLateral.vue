<template>
  <div class="barra-lateral">
    <div class="b-agregar">
      <button class="boton">Agregar</button>
    </div>
    <div class="b-borrar">
      <button class="boton">Borrar</button>
    </div>
    <div class="b-pagar">
      <button class="boton">Pagar</button>
    </div>
      <div class="menu-d">
      <button class="boton-dm">
        Clientes ▼
      </button>
      <div class="contenido-dm">
        <a
          href="#"
          v-for="cliente in getClientes"
          :key="cliente.idCliente"
          @click="filtrar({tipo: 'clientes', nombre: cliente.nombreCliente})"
        >{{cliente.nombreCliente}}</a>
        <a href="#" @click="filtrar({tipo: 'todos', nombre: ''})">Todos</a>
      </div>
    </div>
      <div class="menu-d">
      <button class="boton-dm">
        Estado ▼
      </button>
      <div class="contenido-dm">
        <a href="#" @click="filtrar({tipo: 'estados', nombre: 'pagadas'})">Pagadas</a>
        <a href="#" @click="filtrar({tipo: 'estados', nombre: 'vencidas'})">Vencidas</a>
        <a href="#" @click="filtrar({tipo: 'estados', nombre: 'por cobrar'})">Abierta</a>
        <a href="#" @click="filtrar({tipo: 'todos', nombre: ''})">Todos</a>
      </div>
    </div>
  </div>
</template>

<script>
// import { mapActions } from "vuex";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "NavLateral",
  computed: {
    ...mapGetters(['getClientes'])
  },
  methods: {
    ...mapActions(['filtrar'])
  }
};
</script>

<style scoped>
* {
  box-sizing: border-box;
}

.barra-lateral {
  height: 50px;
  width: 100%;
  background-color: rgb(60, 63, 71);
  display: flex;
}

.boton {
  background-color: #4caf50;
  color: white;
  padding: 7px 15px;
  margin: 10px 5px;
  border: none;
  cursor: pointer;
  opacity: 0.9;
}

.boton:hover {
  opacity: 1;
}

.menu-d {
  position: relative;
  display: inline-block;
}

.boton-dm{
  color: white;
  padding: 7px 15px;
  margin: 10px 5px;
  border: none;
  cursor: pointer;
  background-color: rgb(60, 63, 71);
}

.contenido-dm {
  display: none;
  color: black;
  position: absolute;
  background-color: #f1f1f1;
  min-width: 180px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
}

.contenido-dm a {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}

.contenido-dm a:hover {
  background-color: #ddd;
}

.menu-d:hover .contenido-dm {
  display: block;
}

.menu-d:hover .boton-dm {
  background-color: #3e8e41;
}
</style>