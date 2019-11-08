<template>
  <div class="barra-lateral">
    <div class="b-agregar">
      <button @click="actualizarContador(6)" class="boton">Agregar</button>
    </div>
    <div class="b-borrar">
      <button @click="borrar" class="boton">Borrar</button>
    </div>
    <div class="b-pagar">
      <button @click="pagar" class="boton">Pagar</button>
    </div>
    <div class="menu-d">
      <button class="boton-dm">Clientes ▼</button>
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
      <button class="boton-dm">Estado ▼</button>
      <div class="contenido-dm">
        <a href="#" @click="filtrar({tipo: 'estados', nombre: 'pagadas'})">Pagadas</a>
        <a href="#" @click="filtrar({tipo: 'estados', nombre: 'vencidas'})">Vencidas</a>
        <a href="#" @click="filtrar({tipo: 'estados', nombre: 'por cobrar'})">Abierta</a>
        <a href="#" @click="filtrar({tipo: 'todos', nombre: ''})">Todos</a>
      </div>
    </div>
    <div class="fechas">
      <label for="desde">Desde</label>
      <input class="quitar-borde" type="date" name="desde" id="desde" />
      <label for="hasta">Hasta</label>
      <input class="quitar-borde" type="date" name="desde" id="hasta" />
    </div>
    <img class="buscar" src="../assets/buscar.png" @click="filtrar({tipo: 'fechas', nombre: ''})" />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "NavLateral",
  computed: {
    ...mapGetters(["getClientes"])
  },
  methods: {
    ...mapActions([
      "filtrar",
      "pagarFacturas",
      "borrarFacturas",
      "actualizarContador"
    ]),

    pagar: function() {
      this.limpiarLista();
      this.pagarFacturas();
    },

    borrar: function() {
      this.limpiarLista();
      this.borrarFacturas();
    }
  },
  props: {
    limpiarLista: Function
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
  background-color:#0C427D;
  display: flex;
}

.boton {
  background-color: #CCD4EB;
  color: #0C427D;
  padding: 7px 15px;
  margin: 10px 5px;
  border: none;
  cursor: pointer;
  opacity: 0.9;
}

.boton:hover {
  opacity: 1;
  background-color: rgb(199, 205, 223);
  color: #0C427D;
}

.menu-d {
  position: relative;
  display: inline-block;
}

.boton-dm {
  color: #0C427D;
  padding: 7px 15px;
  margin: 10px 5px;
  border: none;
  cursor: pointer;
  background-color:rgb(199, 205, 223);
}

.contenido-dm {
  display: none;
  color: #0C427D;
  position: absolute;
  background-color: #f1f1f1;
  min-width: 180px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
}

.contenido-dm a {
  color:#0C427D;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}

.contenido-dm a:hover {
  background-color: rgb(199, 205, 223);
  color: #0C427D;
}

.menu-d:hover .contenido-dm {
  display: block;
}

.menu-d:hover .boton-dm {
  background-color: rgb(199, 205, 223);
  color: #0C427D;
}

.buscar {
  width: 5%;
}

.fechas > input {
  padding: 7px 15px;
  margin: 5px 5px;
  color: #0C427D;
}
.fechas > label {
  color: white;
  padding: 7px 15px;
  margin: 5px 5px;
}

.buscar:hover {
  cursor: pointer;
}
</style>