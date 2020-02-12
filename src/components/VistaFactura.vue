<template>
  <!-- Vista previa de la factura antes de imprimirlar o descargarla como PDF -->
  <div class="imprimir-factura">
    <div @click="guardarPdf" class="icono-i">Descargar PDF</div>
    <div id="guardar" class="contenido">
      <!-- Datos del usuario -->
      <div class="datos-usuario">
        <p class="nombre">{{getDatosUsuario.nombre}} {{getDatosUsuario.apellido}}</p>
        <p>{{getDatosUsuario.direccion}}</p>
        <p>{{getDatosUsuario.ciudad}}</p>
        <p>{{getDatosUsuario.estado}}, {{getDatosUsuario.codigoPostal}}</p>
        <p>{{getDatosUsuario.pais}}</p>
      </div>
      <div class="numero-factura">
        <p class="titulo-factura">Factura</p>
        N.° {{factura.numeroFactura}}
      </div>
      <!-- Datos del cliente -->
      <div class="datos-cliente">
        <p class="cliente">Para:</p>
        <p>{{cliente.nombreCliente}}</p>
        <p>{{cliente.direccion}}</p>
        <p>{{cliente.ciudad}}</p>
        <p>{{cliente.estado}}, {{cliente.codigoPostal}}</p>
        <p>{{cliente.pais}}</p>
      </div>
      <!-- Términos -->
      <div class="terminos">
        <table class="tabla1">
          <thead>
            <th>Fecha</th>
            <th>Término</th>
            <th>Vencimiento</th>
            <th>Orden</th>
          </thead>
          <tbody>
            <tr>
              <td>{{factura.fechaFactura}}</td>
              <td>{{cliente.terminoPago}} días</td>
              <td>{{factura.fechaVencimiento}}</td>
              <td>{{factura.ordenCompra}}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="tabla">
        <hr />
        <!-- Tabla de datos de la factura -->
        <table class="tabla2">
          <thead>
            <tr>
              <th>Descripción</th>
              <th>Tarifa</th>
              <th>Palabras</th>
              <th>Monto</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="detalle in detalles" :key="detalle.id">
              <td>{{detalle.descripcionProyecto}}</td>
              <td>{{detalle.precio}}</td>
              <td>{{detalle.numeroPalabras}}</td>
              <td>{{detalle.monto}}</td>
            </tr>
            <tr class="totales">
              <td colspan="2"></td>
              <td>Subtotal</td>
              <td>${{factura.subtotal}}</td>
            </tr>
            <tr class="totales">
              <td colspan="2"></td>
              <td>Impuestos</td>
              <td>${{factura.impuestos}}</td>
            </tr>
            <tr class="totales">
              <td colspan="2"></td>
              <td>Total</td>
              <td>${{factura.total}}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- Notas -->
      <div class="pago">
        <p class="titulo-notas">Notas:</p>
        Pagar a: {{getDatosUsuario.datosPaypal}}
      </div>
    </div>
  </div>
</template>

<script>
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      cliente: ""
    };
  },
  props: {
    factura: Object,
    idCliente: Number,
    detalles: Array
  },
  computed: {
    ...mapGetters(["getDatosUsuario", "getClientePorId"])
  },
  methods: {
    /**
     * Función para obtener el cliente de la factura.
     * @param {Number} idCliente
     */
    obtenerCliente: function(idCliente) {
      this.cliente = this.getClientePorId(idCliente)[0];
    },
    /**
     * Función para guardar la factura como PDF.
     */
    guardarPdf: function() {
      html2canvas(document.getElementById("guardar")).then(function(canvas) {
        var imgData = canvas.toDataURL("image/png", 1);
        var doc = new jsPDF("p", "mm", "a4");
        doc.addImage(imgData, "PNG", 8, 5);
        doc.autoPrint();
        doc.save("prueba.pdf");
      });
    }
  },
  mounted() {
    this.obtenerCliente(this.idCliente);
  }
};
</script>

<style scoped>
.imprimir-factura {
  display: absolute;
  overflow: auto;
  display: grid;
  height: 100%;
  width: 100%;
  grid-template-columns: auto 40% auto;
  grid-template-rows: 100%;
  grid-template-areas: "i con .";
  background-color: #f1f1f1;
}
.icono-i {
  grid-area: i;
  text-align: center;
  margin-top: 20px;
  cursor: pointer;
  font-size: 15pt;
  color: blue;
}
.contenido {
  margin-top: 10px;
  margin-bottom: 10px;
  grid-area: con;
  height: 100%;
  width: 100%;
  display: grid;
  grid-template: repeat(6, 1fr);
  grid-template-rows: repeat(2, 65px) repeat(2, 65px) repeat(8, 1fr);
  grid-template-areas:
    " du du . . . nf"
    " du du . . . ."
    " dc dc . . . ."
    " dc dc . . . ."
    " t t t . . ."
    " da da da da da da"
    " da da da da da da"
    " da da da da da da"
    " da da da da da da"
    " . . . . . ."
    " p p p p . ."
    " . . . . . .";
  padding: 10px;
  background-color: white;
}
.datos-usuario {
  grid-area: du;
  width: 100%;
  height: 100%;
}
.numero-factura {
  grid-area: nf;
  width: 100%;
  height: 100%;
  text-align: end;
}
.datos-cliente {
  grid-area: dc;
  width: 100%;
  height: 100%;
}
.terminos {
  grid-area: t;
  width: 100%;
  height: 100%;
}
.terminos > table > thead > th {
  text-align: start;
  width: 33%;
  color: orange;
}
.terminos > table > tbody > tr {
  width: 100%;
  font-weight: bold;
}
.tabla {
  grid-area: da;
  width: 100%;
  height: 100%;
}
.pago {
  grid-area: p;
  width: 100%;
  height: 100%;
}
p {
  margin: 0;
}
.nombre {
  font-size: 20pt;
  letter-spacing: 3px;
  font-weight: bold;
}
.tabla2 {
  width: 100%;
  text-align: start;
  border: 0.5px solid #f1f1f1;
  border-collapse: collapse;
  margin-top: 10px;
}
.tabla2 > thead > tr > th:nth-child(1) {
  text-align: left;
}
.tabla2 > thead > tr > th {
  border: 0.5px solid #f1f1f1;
}
.tabla2 > thead > tr {
  background-color: orange;
  color: white;
}
.tabla2 > tbody > tr > td:nth-child(1n + 2) {
  text-align: center;
}
.tabla2 > tbody > tr > td {
  border: 0.5px solid #f1f1f1;
}
tr:nth-child(even) {
  background-color: #f1f1f1;
}
.totales > td:nth-child(1n + 2) {
  background-color: orange;
  color: white;
  font-weight: bold;
}
.totales > td:nth-child(1) {
  background-color: white;
}
.totales > td:nth-child(2) {
  border-right: none;
}
.totales > :first-child {
  border-bottom: solid 0.1px white;
  border-left: solid 0.1px white;
}
.tabla2 > tbody > tr:nth-last-child(4) {
  border: 0.5px solid #f1f1f1;
}
td {
  padding: 5px;
}
.titulo-factura {
  font-weight: bold;
  color: orange;
  font-size: 15pt;
}
.titulo-notas {
  font-weight: bold;
  font-size: 15pt;
}
.cliente {
  color: orange;
  font-size: 13pt;
  font-weight: bold;
}
hr {
  border: 0.5px solid #f1f1f1;
}
@media screen and (max-width: 1400px) {
  .imprimir-factura {
    display: absolute;
    overflow: auto;
    display: grid;
    height: 100%;
    width: 100%;
    grid-template-columns: auto 60% auto;
    grid-template-rows: 100%;
    grid-template-areas: "i con .";
    background-color: #f1f1f1;
  }
}
</style>