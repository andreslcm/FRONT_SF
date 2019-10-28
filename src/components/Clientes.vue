<template>
  <div class="contenedor-clientes">
    <div class="caja-iconos">
      <img @click="actualizarContador(5)" class="iconos" src="../assets/agregar.png" alt />
      <img class="iconos" src="../assets/editar.png" alt />
      <img class="iconos" src="../assets/borrar.png" alt />
    </div>
    <div class="contenedor-tabla">
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>País</th>
            <th>Términos</th>
            <th>Tarifa traducción</th>
            <th>Tarifa edición</th>
            <th>Tarifa proofreading</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="cliente in getClientes" :key="cliente.idCliente">
            <td>{{cliente.nombreCliente}}</td>
            <td>{{cliente.pais}}</td>
            <td>{{cliente.terminoPago}}</td>
            <td>{{cliente.palabraTraduccion}}</td>
            <td>{{cliente.palabraEdicion}}</td>
            <td>{{cliente.palabraProofreading}}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import {mapActions} from 'vuex';
export default {
  methods: {
    ...mapActions(['actualizarContador'])
  },
  computed: {
    ...mapGetters(['getClientes'])
  }
};
</script>

<style scoped>
* {
  box-sizing: border-box;
}
.contenedor-clientes {
  height: 100%;
  display: grid;
  grid-template-columns: 97% 3%;
  grid-template-rows: 100%;
  grid-template-areas: "t c";
}

.caja-iconos {
  grid-column: 2/-1;
  grid-row: 1/-1;
  width: 100%;
  height: 21%;
  background-color: rgba(39, 73, 119, 0.199);
  align-self: center;
}

.iconos {
  width: 80%;
  margin-top: 15px;
  margin-left: 5px;
}
.iconos:hover {
  cursor: pointer;
}
.contenedor-tabla {
  grid-column: 1 / span 2;
  grid-row: 1/-1;
  width: 100%;
}

table {
  text-align: center;
  width: 100%;
}

thead {
  background-color: rgb(60, 63, 71);
  color: white;
}

tbody > tr:nth-child(odd) {
  background-color: rgb(168, 164, 164);
}

@media screen and (max-width: 1400px) {
  .iconos {
    width: 80%;
    margin-top: 12px;
    margin-left: 4px;
  }
  .caja-iconos {
    grid-area: c;
    width: 100%;
    height: 23%;
    background-color: rgba(39, 73, 119, 0.199);
    z-index: 1;
    align-self: center;
  }
}
</style>