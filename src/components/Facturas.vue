<template>
  <div class="contenedor-facturas">
    <NavLateral class="contenedor-nav-l" />
    <div class="contenedor-cifras"></div>
    <div class="contenedor-tabla-f">
      <div class="tabla-f">
        <table>
          <thead>
            <tr>
              <th>
                <input type="checkbox" id="todo" />
              </th>
              <th>N°</th>
              <th>Orden</th>
              <th id="fecha">Fecha</th>
              <th>Vencimiento</th>
              <th>Cliente</th>
              <th>Estado</th>
              <th>Monto</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="factura in getFacturas" :key="factura.idFactura">
              <td>
                <input type="checkbox" name="seleccion" />
              </td>
              <td>{{factura.numeroFactura}}</td>
              <td>{{factura.ordenCompra}}</td>
              <td>{{factura.fechaFactura}}</td>
              <td>{{factura.fechaVencimiento}}</td>
              <td>{{factura.nombreCliente}}</td>
              <td>{{factura.estado}}</td>
              <td>{{factura.total}}</td>
              <td>
                <button>↕</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import NavLateral from "./NavLateral.vue";
// import { mapActions } from "vuex";
import { mapGetters } from "vuex";
export default {
  components: {
    NavLateral
  },
  computed: {
    ...mapGetters(["getFacturas"])
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
  grid-template-rows: 50px 40px auto;
  grid-template-areas:
    "nav"
    "cif"
    "tab";
}

.contenedor-tabla-f {
  grid-area: tab;
  height: 100%;
  width: 100%;
  position: relative;
  overflow: auto;
}

.contenedor-nav-l {
  grid-area: nav;
}

.contenedor-cifras {
  grid-area: cif;
  height: 100%;
  width: 100%;
  background-color: aqua;
}

.contenedor-tabla-f {
  width: 100%;
  position: relative;
  overflow: auto;
}
table {
  text-align: center;
  width: 100%;
}
thead {
  background-color: rgb(60, 63, 71);
  color: white;
}

tbody > tr:nth-child(even) {
  background-color: rgb(168, 164, 164);
}

td {
  padding: 10px;
}

.tabla-f {
  position: absolute;
  width: 100%;
}
</style>