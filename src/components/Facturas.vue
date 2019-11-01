<template>
  <div class="contenedor-facturas">
    <NavLateral class="contenedor-nav-l" :limpiarLista="limpiarLista"/>
    <div class="contenedor-cifras"></div>
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
            <tr class="seleccionar-f" v-for="factura in getFacturas" :key="factura.idFactura">
              <td>
                <input v-model="idFacturas" :value="factura.idFactura" type="checkbox" name="seleccion" @change="actualizarLista"/>
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
import NavLateral from "./NavLateral.vue";
import { mapActions } from "vuex";
import { mapGetters } from "vuex";
export default {
  data(){
    return {
      idFacturas: [],
      contador: 0
    }
  },
  components: {
    NavLateral
  },
  computed: {
    ...mapGetters(['getFacturas', 'getListaFacturas'])
  },
  methods: {
    ...mapActions(['listarIdFacturas']),

    actualizarLista: function(){
      this.listarIdFacturas(this.idFacturas);
    },

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
    limpiarLista: function() {
      this.idFacturas = [];
    }
  },
  filters: {
    formatoFecha: function(fecha) {
      var miFecha = new Date(fecha);
      var dia =
        miFecha.getDate() + 1 <= 9
          ? "0" + String(miFecha.getDate() + 1)
          : String(miFecha.getDate() + 1);
      var mes =
        miFecha.getMonth() + 1 <= 9
          ? "0" + String(miFecha.getMonth() + 1)
          : String(miFecha.getMonth() + 1);
      var anio = String(miFecha.getFullYear());
      var fechaCompleta = dia + "-" + mes + "-" + anio;
      return fechaCompleta;
    },
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

.orden-f:hover{
  background-color: #4caf50;
  color: black;
  cursor: pointer;
}

.seleccionar-f:hover{
  background-color: #4caf50;
  color: black;
  cursor: pointer;
}
</style>