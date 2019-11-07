<template>
  <div class="contenedor-facturas">
    <!-- Modal para editar los datos de una factura seleccionada. -->
    <ModalFactura
      v-if="mostrar == true"
      :idFactura="idFactura"
      id="factura-individual"
      :desactivarModal="desactivarModal"
      class="modal-factura"
    />
    <NavLateral class="contenedor-nav-l" :limpiarLista="limpiarLista" />
    <div class="contenedor-cifras">
      <table>
        <tr class="cifras">
          <td class="total">Total: ${{getTotal}}</td>
          <td class="por-cobrar">Total por cobrar: ${{getPorCobrar}}</td>
          <td class="vencidas">Total vencidas: ${{getVencidas}}</td>
          <td class="pagadas">Total pagadas: ${{getPagadas}}</td>
          <td>N.° facturas: {{getFacturas.length}}</td>
        </tr>
      </table>
    </div>
    <!-- Tabla de facturas -->
    <div class="contenedor-tabla-f">
      <div class="tabla-f">
        <table>
          <thead>
            <tr>
              <th>
                <input @click="seleccionarTodo" @change="actualizarLista" type="checkbox" id="todo" />
              </th>
              <th>N°</th>
              <th>Orden</th>
              <th class="orden-f" @click="ordenarPorFecha">Fecha</th>
              <th class="orden-f" @click="ordenarPorFecha">Vencimiento</th>
              <th>Cliente</th>
              <th>Estado</th>
              <th>Monto</th>
            </tr>
          </thead>
          <tbody>
            <tr
              class="seleccionar-f"
              v-for="factura in getFacturas"
              :key="factura.idFactura"
              @click="activarModal(factura.idFactura)"
            >
              <td>
                <input
                  v-model="idFacturas"
                  :value="factura.idFactura"
                  type="checkbox"
                  name="seleccion"
                  @change="actualizarLista"
                />
              </td>
              <td>{{factura.numeroFactura}}</td>
              <td>{{factura.ordenCompra}}</td>
              <td>{{factura.fechaFactura | formatoFecha}}</td>
              <td>{{factura.fechaVencimiento | formatoFecha}}</td>
              <td>{{factura.nombreCliente}}</td>
              <td>{{factura | formatoEstado}}</td>
              <td>{{factura.total}}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import ModalFactura from "./ModalFactura.vue";
import NavLateral from "./NavLateral.vue";
import { mapActions } from "vuex";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      idFacturas: [],
      contador: 0,
      idFactura: "",
      mostrar: false
    };
  },
  components: {
    NavLateral,
    ModalFactura
  },
  computed: {
    ...mapGetters([
      "getFacturas",
      "getListaFacturas",
      "getTotal",
      "getPorCobrar",
      "getVencidas",
      "getPagadas"
    ])
  },
  methods: {
    ...mapActions(["listarIdFacturas", "cargarFacturas"]),
    /**
     * Función para actualizar la lista de id seleccionados.
     */
    actualizarLista: function() {
      this.listarIdFacturas(this.idFacturas);
    },
    /**
     * Función para seleccionar todos los checkboxes.
     */
    seleccionarTodo: function() {
      var todo = document.getElementById("todo");
      var selecciones = document.getElementsByName("seleccion");
      selecciones.forEach(elemento => {
        elemento.checked = todo.checked;
        if (
          todo.checked == true &&
          !this.idFacturas.includes(Number(elemento.value))
        ) {
          this.idFacturas.push(Number(elemento.value));
        } else if (todo.checked == false) {
          this.idFacturas = [];
        }
      });
    },
    /**
     * Función para ordenar las facturas por fecha.
     * @return Array
     */
    ordenarPorFecha: function() {
      this.contador++;
      if (this.contador % 2 != 0) {
        this.getFacturas.sort(function(a, b) {
          return (
            new Date(a.fechaFactura).getTime() -
            new Date(b.fechaFactura).getTime()
          );
        });
      } else {
        this.getFacturas.sort(function(a, b) {
          return (
            new Date(b.fechaFactura).getTime() -
            new Date(a.fechaFactura).getTime()
          );
        });
      }
    },
    /**
     * Función para limpiar la lista de id de facturas.
     */
    limpiarLista: function() {
      this.idFacturas = [];
    },
    /**
     * Función para activar el modal de edición de una factura.
     */
    activarModal: function(idFactura) {
      this.idFactura = idFactura;
      this.mostrar = true;
    },
    /**
     * Función para desactuivar el modal.
     */
    desactivarModal: function() {
      this.cargarFacturas();
      this.mostrar = false;
    }
  },
  filters: {
    /**
     * Filtro para darle formato a las fechas.
     * @param {Date} fecha
     */
    formatoFecha: function(fecha) {
      var miFecha = new Date(fecha);
      var dia =
        miFecha.getDate() <= 9
          ? "0" + String(miFecha.getDate())
          : String(miFecha.getDate());
      var mes =
        miFecha.getMonth() <= 9
          ? "0" + String(miFecha.getMonth())
          : String(miFecha.getMonth());
      var anio = String(miFecha.getFullYear());
      var fechaCompleta = dia + "-" + mes + "-" + anio;
      return fechaCompleta;
    },
    /**
     * Filtro para darle formato al campo del estado de una factura.
     * @param {Object} factura
     * @return String
     */
    formatoEstado: function(factura) {
      var miFecha = new Date(factura.fechaVencimiento);
      var miEstado = "";
      if (
        miFecha.getTime() < new Date().getTime() &&
        factura.estaPagada == false
      ) {
        miEstado = "Vencida";
      } else if (
        miFecha.getTime() > new Date().getTime() &&
        factura.estaPagada == false
      ) {
        miEstado = "Abierta";
      } else if (factura.estaPagada == true) {
        miEstado = "Pagada";
      }
      return miEstado;
    }
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
  background-color: rgba(138, 138, 138, 0.726);
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

.orden-f:hover {
  background-color: #4caf50;
  color: black;
  cursor: pointer;
}

.seleccionar-f:hover {
  background-color: #4caf50;
  color: black;
  cursor: pointer;
}

.cifras {
  font-weight: bold;
}

.pagadas {
  color: green;
}

.por-cobrar {
  color: yellow;
}

.vencidas {
  color: red;
}

.modal-desactivado {
  display: none;
}

.modal-factura {
  position: absolute;
  width: 60%;
  height: 95%;
  background-color: white;
  z-index: 1;
  margin-left: 10%;
  margin-top: 15px;
  overflow: auto;
  border: solid 1 px #f1f1f1;
  box-shadow: 5px 10px 18px #888888;
}
</style>