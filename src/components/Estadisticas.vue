<template>
<div class="contenedor">
  <br>
  <div class="estadisticas12">
    <div class="estadisticas1">
      <table class="paleBlueRows">
        <thead>
          <tr>
            <th>Indice</th>
            <th>Valor</th>
          </tr>
        </thead>
        <tbody>
          <tr>
          <td>Total</td><td>${{getTotal}}</td></tr>
          <tr>
          <td>Total por cobrar</td><td>${{getPorCobrar}}</td></tr>
          <tr>
          <td>Total vencidas</td><td>${{getVencidas}}</td></tr>
          <tr>
          <td>Total pagadas</td><td>${{getPagadas}}</td></tr>
          <tr>
          <td>N.° facturas</td><td>{{getFacturas.length}}</td></tr>
        </tbody>       
      </table>
    </div>
    <div class="estadisticas2">
      <table class="paleBlueRows">
        <thead>
          <tr>
            <th>Indice</th>
            <th>Nombre</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          <tr>
          <td>El mejor cliente</td><td>{{getMejorCliente}}</td><td>${{getMejorPagoDeCliente}}</td></tr>
          <tr>
          <td>Mejor pago de un cliente</td><td>{{getMejorPagoCliente}}</td><td>${{getMejorPagoTotal}}</td></tr>
          <tr>
          <td>Peor pago de un cliente</td><td>{{getPeorPagoCliente}}</td><td>${{getPeorPagoTotal}}</td></tr>
          <tr>
          <td>Factura primedio</td><td colspan="2">${{getFacturaPromedio}}</td></tr>
        </tbody>       
      </table>
    </div>
  </div>
  <br>
  <div class="estadisticas34">
    <div class="estadisticas3">
      <table class="progress">
        <tr>
        <td>Enero</td><td><progress :value="getFacturasEnero" :max="getFacturas.length" :title="getFacturasEnero"></progress></td></tr>
        <tr>
        <td>Febrero</td><td><progress :value="getFacturasFebrero" :max="getFacturas.length" :title="getFacturasFebrero"></progress></td></tr>
        <tr>
        <td>Marzo</td><td><progress :value="getFacturasMarzo" :max="getFacturas.length" :title="getFacturasMarzo"></progress></td></tr>
        <tr>
        <td>Abril</td><td><progress :value="getFacturasAbril" :max="getFacturas.length" :title="getFacturasAbril"></progress></td></tr>
        <tr>
        <td>Mayo</td><td><progress :value="getFacturasMayo" :max="getFacturas.length" :title="getFacturasMayo"></progress></td></tr>
        <tr>
        <td>Junio</td><td><progress :value="getFacturasJunio" :max="getFacturas.length" :title="getFacturasJunio"></progress></td></tr>
        <tr>
        <td>Julio</td><td><progress :value="getFacturasJulio" :max="getFacturas.length" :title="getFacturasJulio"></progress></td></tr>
        <tr>
        <td>Agosto</td><td><progress :value="getFacturasAgosto" :max="getFacturas.length" :title="getFacturasAgosto"></progress></td></tr>
        <tr>
        <td>Septiembre</td><td><progress :value="getFacturasSeptiembre" :max="getFacturas.length" :title="getFacturasSeptiembre"></progress></td></tr>
        <tr>
        <td>Octubre</td><td><progress :value="getFacturasOctubre" :max="getFacturas.length" :title="getFacturasOctubre"></progress></td></tr>
        <tr>
        <td>Noviembre</td><td><progress :value="getFacturasNoviembre" :max="getFacturas.length" :title="getFacturasNoviembre"></progress></td></tr>
        <tr>
        <td>Diciembre</td><td><progress :value="getFacturasDiciembre" :max="getFacturas.length" :title="getFacturasDiciembre"></progress></td></tr>
      </table>
    </div>
    <div class="estadisticas4">
      <table class="paleBlueRows">
        <thead>
          <tr>
            <th>Mes</th>
            <th>Cantidad de Facturas</th>
            <th>Factura Promedio</th>
            <th>Total Mes</th>
          </tr>
        </thead>
          <tbody>
            <tr>
            <td>Enero</td><td>{{getFacturasEnero}}</td><td>${{getPromedioEnero}}</td><td>${{getTotalEnero}}</td></tr>
            <tr>
            <td>Febrero</td><td>{{getFacturasFebrero}}</td><td>${{getPromedioFebrero}}</td><td>${{getTotalFebrero}}</td></tr>
            <tr>
            <td>Marzo</td><td>{{getFacturasMarzo}}</td><td>${{getPromedioMarzo}}</td><td>${{getTotalMarzo}}</td></tr>
            <tr>
            <td>Abril</td><td>{{getFacturasAbril}}</td><td>${{getPromedioAbril}}</td><td>${{getTotalAbril}}</td></tr>
            <tr>
            <td>Mayo</td><td>{{getFacturasMayo}}</td><td>${{getPromedioMayo}}</td><td>${{getTotalMayo}}</td></tr>
            <tr>
            <td>Junio</td><td>{{getFacturasJunio}}</td><td>${{getPromedioJunio}}</td><td>${{getTotalJunio}}</td></tr>
            <tr>
            <td>Julio</td><td>{{getFacturasJulio}}</td><td>${{getPromedioJulio}}</td><td>${{getTotalJulio}}</td></tr>
            <tr>
            <td>Agosto</td><td>{{getFacturasAgosto}}</td><td>${{getPromedioAgosto}}</td><td>${{getTotalAgosto}}</td></tr>
            <tr>
            <td>Septiembre</td><td>{{getFacturasSeptiembre}}</td><td>${{getPromedioSeptiembre}}</td><td>${{getTotalSeptiembre}}</td></tr>
            <tr>
            <td>Octubre</td><td>{{getFacturasOctubre}}</td><td>${{getPromedioOctubre}}</td><td>${{getTotalOctubre}}</td></tr>
            <tr>
            <td>Noviembre</td><td>{{getFacturasNoviembre}}</td><td>${{getPromedioNoviembre}}</td><td>${{getTotalNoviembre}}</td></tr>
            <tr>
            <td>Diciembre</td><td>{{getFacturasDiciembre}}</td><td>${{getPromedioDiciembre}}</td><td>${{getTotalDiciembre}}</td></tr>
          </tbody>  
        </table>
    </div>
  </div>
</div>
</template>

<script>

import { mapGetters } from "vuex";
export default {
  data() {
    return {
      idFacturas: [],
      contador: 0,
      idFactura: "",
      mostrar: false,
    };
  },
  computed: {
    ...mapGetters([
      "getFacturas",
      "getListaFacturas",
      "getTotal",
      "getPorCobrar",
      "getVencidas",
      "getPagadas",
      "getMejorCliente",
      "getMejorPagoTotal",
      "getMejorPagoCliente",
      "getMejorPagoDeCliente",
      "getPeorPagoTotal",
      "getPeorPagoCliente",
      "getFacturaPromedio",
      "getFacturasEnero",
      "getFacturasFebrero",
      "getFacturasMarzo",
      "getFacturasAbril",
      "getFacturasMayo",
      "getFacturasJunio",
      "getFacturasJulio",
      "getFacturasAgosto",
      "getFacturasSeptiembre",
      "getFacturasOctubre",
      "getFacturasNoviembre",
      "getFacturasDiciembre",
      "getPromedioEnero",
      "getPromedioFebrero",
      "getPromedioMarzo",
      "getPromedioAbril",
      "getPromedioMayo",
      "getPromedioJunio",
      "getPromedioJulio",
      "getPromedioAgosto",
      "getPromedioSeptiembre",
      "getPromedioOctubre",
      "getPromedioNoviembre",
      "getPromedioDiciembre",
      "getTotalEnero",
      "getTotalFebrero",
      "getTotalMarzo",
      "getTotalAbril",
      "getTotalMayo",
      "getTotalJunio",
      "getTotalJulio",
      "getTotalAgosto",
      "getTotalSeptiembre",
      "getTotalOctubre",
      "getTotalNoviembre",
      "getTotalDiciembre"

    ])
  },
}
</script>

<style>

</style>