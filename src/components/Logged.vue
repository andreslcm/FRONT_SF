<template>
  <!-- Página que se muestra después de iniciar sesión de manera exitosa -->
  <div id="contenedor" class="contenedor">
    <SideBar class="sideBar" />
    <Clientes class="pagina" v-if="getContador === 1" />
    <Facturas class="pagina" v-else-if="getContador === 2" />
    <Estadisticas class="pagina" v-else-if="getContador === 3" />
    <Usuario class="pagina" v-else-if="getContador === 4" />
    <AgregarCliente class="pagina" v-else-if="getContador === 5" />
    <AgregarFactura class="pagina" v-else-if="getContador === 6" />
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { mapGetters } from "vuex";
import SideBar from "./SideBar.vue";
import Clientes from "./Clientes.vue";
import Facturas from "./Facturas.vue";
import Estadisticas from "./Estadisticas.vue";
import Usuario from "./Usuario.vue";
import AgregarCliente from "./AgregarCliente.vue";
import AgregarFactura from "./AgregarFactura.vue";
export default {
  components: {
    SideBar,
    Clientes,
    Facturas,
    Estadisticas,
    Usuario,
    AgregarCliente,
    AgregarFactura
  },
  methods: {
    ...mapActions(["cargarClientes", "cargarFacturas", "traerDatosUsuario"])
  },
  computed: {
    ...mapGetters(["getContador"])
  },
  created() {
    this.cargarClientes();
    this.cargarFacturas();
    this.traerDatosUsuario();
  }
};
</script>

<style scoped>
* {
  box-sizing: border-box;
}
.contenedor {
  display: grid;
  height: 100vh;
  grid-template-columns: 170px auto;
  grid-template-rows: 100%;
  grid-template-areas: "s c";
}
.sideBar {
  grid-area: s;
}
.pagina {
  grid-area: c;
}
</style>