<template>
  <div class="contenedor-agregar-f">
    <div class="cabecera">FACTURA</div>
    <div class="contenedor-fac">
      <div class="datos-cliente">
        <!-- Datos del cliente -->
        <div
          class="datos-p"
          v-for="cliente in getClientePorId(factura.idCliente)"
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
            <tr class="fila-detalles" v-for="detalle in detalles" :key="detalle.id">
              <td class="td-menos">
                <img @click="eliminarDetalle" class="menos" src="../assets/menos.png" alt />
                <textarea
                  v-model="detalle.descripcionProyecto"
                  type="text"
                  id="descripcionProyecto"
                  cols="55"
                  rows="2"
                  placeholder="Descripción del proyecto"
                ></textarea>
              </td>
              <td v-if="idCliente!=null">
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
                <input v-model="detalle.monto" type="number" id="monto" readonly />
              </td>
            </tr>
            <tr>
              <td class="agregar-detalle" colspan="5" @click="agregarDetalle">Agregar detalle</td>
            </tr>
            <tr>
              <td class="area-notas" colspan="3" rowspan="3">
                <textarea placeholder="NOTAS" name id cols="85" rows="10"></textarea>
              </td>
            </tr>
            <tr>
              <td class="montos" colspan="2" rowspan="2">
                <label for="subtotal">subtotal</label>
                <input v-model="suma" type="text" id="subtotal" readonly />
                <label for="impuestos">Impuestos</label>
                <input v-model="factura.impuestos" type="text" id="impuestos" />
                <label for="total">Total</label>
                <input v-model="sumaTotal" type="text" id="total" readonly />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="boton-enviar">
        <div>
          <button
            @click="enviarFactura({factura: factura, detalles: detalles, idCliente: idCliente})"
            class="boton-f"
          >Enviar</button>
        </div>
        <div>
          <button @click="cerrar" class="boton-f">Cancelar</button>
        </div>
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
      idCliente: null,
      factura: {
        numeroFactura: "",
        ordenCompra: "",
        fechaFactura: "",
        fechaVencimiento: "",
        subtotal: "",
        impuestos: 0,
        total: 0,
        notas: ""
      },
      detalles: [],
    };
  },
  props: {
    idF: Number,
    desactivarModal: Function
  },
  computed: {
    ...mapGetters([
      "getClientes",
      "getFacturas",
      "getDatosUsuario",
      "getClientePorId"
    ]),
    suma() {
      return this.detalles.reduce((total, detalle) => {
        return total + Number(detalle.monto);
      }, 0);
    },
    sumaTotal() {
      return this.suma + Number(this.factura.impuestos);
    },
    multiplicacion() {
      return this.detalles.forEach(detalle => {
        detalle.monto = detalle.precio * detalle.numeroPalabras;
      });
    }
  },
  methods: {
    ...mapActions(["traerDatosUsuario", "agregarFactura"]),
    sumar: function() {
      this.factura.subtotal = document.getElementById("subtotal").value;
      this.factura.total = document.getElementById("total").value;
    },
    enviarFactura: function(factura, detalles, idCliente) {
      this.sumar();
      this.agregarFactura(factura, detalles, idCliente);
    },
    agregarDetalle: function() {
      this.detalles.push({
        monto: null,
        descripcionProyecto: "",
        precio: "",
        numeroPalabras: "",
        modalFactura:0,
      });
    },
    eliminarDetalle: function() {
      this.detalles.splice(this.detalles.length - 1, 1);
    },
    encontrarFactura: function() {
      this.getFacturas.forEach(factura => {
        if (factura.idFactura == this.idF) {
          this.idCliente = factura.idCliente;
          this.detalles = factura.detalles;
          this.factura = factura;
        }
      });
    },
    cerrar: function(){
      this.desactivarModal();
    }
  },
  mounted() {
    this.traerDatosUsuario();
    this.agregarDetalle();
    this.encontrarFactura();
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
  grid-template-rows: repeat(3, 60px) 90px repeat(5, 1fr) 5px 60px repeat(
      2,
      5px
    );
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
    ". . . bot bot bot bot bot . . . ."
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
}

.datos-usuario {
  grid-area: du;
}

.cuerpo-factura {
  grid-area: fa;
  border: solid 1px #f1f1f1;
  box-sizing: content-box;
}

.datos-varios {
  grid-area: df;
}

.c-tabla-v > tr {
  display: flex;
  justify-content: space-evenly;
}

.c-tabla-v > tr > td {
  flex: 1;
  font-weight: bold;
  margin: 3px;
  padding: 3px;
}

.select-clientes {
  border: 0px;
}

.datos-p {
  font-weight: bold;
  font-size: 13pt;
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

table {
  border-collapse: collapse;
}
.tabla-detalles > thead {
  background-color: #f1f1f1;
}
.tabla-detalles > thead > tr > th:nth-child(1n + 3) {
  width: 90px;
}
.tabla-detalles > thead > tr > th:nth-child(2) {
  width: 120px;
}

.dm-tarifas {
  width: 100%;
  border: 0px;
  height: 25px;
}

textarea {
  border: none;
  width: 99%;
}

textarea:hover,
input:hover,
select:hover {
  background-color: rgb(250, 250, 190);
}

.boton-enviar {
  grid-area: bot;
  display: flex;
}

.boton-enviar > div {
  flex: 1;
  margin: auto;
  text-align: center;
}

.boton-f {
  background-color: #4caf50;
  color: white;
  padding: 7px 15px;
  margin: 10px 5px;
  border: none;
  cursor: pointer;
  opacity: 0.9;
  width: 70%;
}

.boton-f:hover {
  opacity: 1;
}

.montos {
  border: 1px solid #f1f1f1;
  text-align: center;
  background-color: #f1f1f1;
}

.montos > label {
  font-size: 13pt;
  font-weight: bold;
}

.montos > input {
  text-align: center;
}
.agregar-detalle {
  padding: 5px 0px;
  border: 1px solid #f1f1f1;
  color: blue;
  font-weight: bold;
  background-color: #f1f1f1;
}

.agregar-detalle:hover {
  cursor: pointer;
}

.fila-detalles > td > input {
  text-align: center;
}

.menos {
  flex: 1;
  width: 15px;
  height: 15px;
  margin: auto;
  padding: 5px;
}

.menos:hover {
  cursor: pointer;
}

.td-menos {
  display: flex;
}
</style>