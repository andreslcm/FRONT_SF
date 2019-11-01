<template>
  <div class="contenedor-agregar-f">
    <div class="cabecera">FACTURA</div>
    <div class="contenedor-fac">
      <div class="datos-cliente">
        <!-- Menú desplegable de clientes-->
        <select class="select-clientes" id="selector" v-model="idCliente">
          <option
            v-for="cliente in getClientes"
            :key="cliente.idCliente"
            :value="cliente.idCliente"
          >{{cliente.nombreCliente}}</option>
        </select>
        <!-- Datos del cliente seleccionado -->
        <div
          class="datos-p"
          v-for="cliente in getClientePorId(idCliente)"
          :key="cliente.nombreCliente"
        >
          <p>{{cliente.nombreCliente}}</p>
          <p>{{cliente.direccion}}</p>
          <p>{{cliente.ciudad}}</p>
          <p>{{cliente.estado}}</p>
          <p>{{cliente.pais}}</p>
          <p>{{cliente.codigoPostal}}</p>
          <p>{{cliente.telefono}}</p>
        </div>
      </div>
      <div class="datos-usuario">
        <!-- Datos del usuario -->
        <div class="datos-p">
          <p>{{getDatosUsuario.nombre}} {{getDatosUsuario.apellido}}</p>
          <p>{{getDatosUsuario.direccion}}</p>
          <p>{{getDatosUsuario.ciudad}}</p>
          <p>{{getDatosUsuario.estado}}</p>
          <p>{{getDatosUsuario.pais}}</p>
          <p>{{getDatosUsuario.codigoPostal}}</p>
          <p>{{getDatosUsuario.telefono}}</p>
        </div>
      </div>
      <div class="datos-varios">
        <hr />
        <div>
          <table class="c-tabla-v">
            <tr>
              <td>
                <label for="numeroFactura">Número de factura</label>
                <input v-model="factura.numeroFactura" type="number" id="numeroFactura" />
              </td>
              <td>
                <label for="ordenCompra">Orden de compra</label>
                <input v-model="factura.ordenCompra" type="text" id="ordenCompra" />
              </td>
              <td>
                <label for="fechaFactura">Fecha</label>
                <input v-model="factura.fechaFactura" type="date" id="fechaFactura" />
              </td>
              <td>
                <label for="fechaVencimiento">Vencimiento</label>
                <input v-model="factura.fechaVencimiento" type="date" id="fechaVencimiento" />
              </td>
            </tr>
          </table>
        </div>
        <hr />
      </div>
      <div class="cuerpo-factura">
        <table class="tabla-detalles">
          <thead>
            <tr>
              <th>Descripción</th>
              <th>Tipo de trabajo</th>
              <th>Tarifa</th>
              <th>Cantidad</th>
              <th>Monto</th>
            </tr>
          </thead>
          <tbody>
            <span v-show="false">{{multiplicacion}}</span>
            <tr v-for="detalle in detalles" :key="detalle.id">
              <td>
                <textarea
                  v-model="detalle.descripcionProyecto"
                  type="text"
                  id="descripcionProyecto"
                  cols="55"
                  rows="2"
                  placeholder="Descripción del proyecto"
                ></textarea>
              </td>
              <td>
                <select class="dm-tarifas" name="tipo" id="seleccion" v-model="detalle.precio">
                  <option :value="getClientePorId(idCliente)[0].palabraTraduccion">Traducción</option>
                  <option :value="getClientePorId(idCliente)[0].palabraEdicion">Edición</option>
                  <option :value="getClientePorId(idCliente)[0].palabraProofreading">Proofreading</option>
                </select>
              </td>
              <td>
                <input v-model="detalle.precio" type="number" step=".01" id="id" />
              </td>
              <td>
                <input id="numeroPalabras" type="number" v-model.number="detalle.numeroPalabras" />
              </td>
              <td>
                <input v-model="detalle.monto" type="number" id="monto" />
              </td>
            </tr>
            <tr>
              <td @click="agregarDetalle">Agregar detalle</td>
            </tr>
            <tr>
              <td style="border: solid;" colspan="3" rowspan="3">
                <textarea placeholder="NOTAS" name id cols="85" rows="10"></textarea>
              </td>
            </tr>
            <tr>
              <td style=" border: solid;" colspan="2" rowspan="2">
                <label for="subtotal">subtotal</label>
                <input v-model="suma" type="text" id="subtotal" />
                <label for="impuestos">Impuestos</label>
                <input v-model="factura.impuestos" type="text" id="impuestos" />
                 <label for="total">Total</label>
                <input v-model="sumaTotal" type="text" id="total" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div></div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      idCliente: 0,
      factura: {
        numeroFactura: "",
        ordenCompra: "",
        fechaFactura: "",
        fechaVencimiento: "",
        subtotal: "",
        impuestos: "",
        total: 0,
        notas: ""
      },
      detalles: []
    };
  },
  computed: {
    ...mapGetters(["getClientes", "getClientePorId", "getDatosUsuario"]),
    suma() {
      return this.detalles.reduce((total, detalle) => {
        return this.factura.subtotal = total + Number(detalle.monto);
      }, 0);
    },
    sumaTotal() {
      return this.factura.total =
        Number(this.factura.subtotal) + Number(this.factura.impuestos);
    },
    multiplicacion() {
      return this.detalles.forEach(detalle => {
        detalle.monto = detalle.precio * detalle.numeroPalabras;
      });
    }
  },
  methods: {
    ...mapActions(["traerDatosUsuario"]),
    agregarDetalle: function() {
      this.contador++;
      this.detalles.push({
        monto: null,
        descripcionProyecto: "",
        precio: "",
        numeroPalabras: ""
      });
    }
  },
  mounted() {
    this.traerDatosUsuario();
    this.agregarDetalle();
  }
};
</script>

<style scoped>
.contenedor-agregar-f {
  position: relative;
  overflow: auto;
  height: 100%;
  display: grid;
  grid-template-columns: 100px auto 100px;
  grid-template-rows: 35px auto;
  grid-template-areas:
    ". cab ."
    ". con .";
}

.contenedor-fac {
  margin-bottom: 20px;
  grid-area: con;
  border: solid 1px #f1f1f1;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: repeat(3, 90px) 90px repeat(5, 1fr) repeat(4, 5px);
  grid-template-areas:
    ". dc dc dc dc . . du du du du ."
    ". dc dc dc dc . . du du du du ."
    ". dc dc dc dc . . du du du du ."
    ". df df df df df df df df df df ."
    ". fa fa fa fa fa fa fa fa fa fa ."
    ". fa fa fa fa fa fa fa fa fa fa ."
    ". fa fa fa fa fa fa fa fa fa fa ."
    ". fa fa fa fa fa fa fa fa fa fa ."
    ". fa fa fa fa fa fa fa fa fa fa ."
    ". . . . . . . . . . . ."
    ". . . . . . . . . . . ."
    ". . . . . . . . . . . ."
    ". . . . . . . . . . . .";
}

.cabecera {
  grid-area: cab;
  padding: 7px;
  background-color: rgb(60, 63, 71);
  color: white;
  text-align: center;
  font-weight: bold;
  font-size: 15pt;
  letter-spacing: 5px;
}

.datos-cliente {
  grid-area: dc;
  background-color: aqua;
}

.datos-usuario {
  grid-area: du;
  background-color: blue;
}

.cuerpo-factura {
  grid-area: fa;
  background-color: blueviolet;
  box-sizing: content-box;
}

.datos-varios {
  grid-area: df;
  background-color: yellow;
}

.c-tabla-v > tr {
  display: flex;
  justify-content: space-evenly;
}

.c-tabla-v > tr > td {
  flex: 1;
  background-color: blue;
  font-weight: bold;
  margin: 3px;
  padding: 3px;
}

.select-clientes {
  border: 0px;
}

.datos-p {
  font-weight: bold;
  font-size: 15pt;
}

p {
  margin-top: 2px;
  margin-bottom: 2px;
}

input {
  border: 0px;
  height: 25px;
  width: 100%;
}

hr {
  border: 1px solid #f1f1f1;
}

.tabla-detalles > thead {
  background-color: grey;
}
.tabla-detalles > thead > tr >th:nth-child(1n+3) {
  width: 90px;
  color: red;
  
}
.tabla-detalles > thead > tr >th:nth-child(2) {
  width: 120px;
  color: yellow;
}

.dm-tarifas {
  width: 100%;
  border: 0px;
  height: 25px;
}

textarea{
  border: none;
}

textarea:hover{
  background-color: rgb(250, 250, 190);
}
</style>