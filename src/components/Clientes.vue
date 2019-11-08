<template>
  <div class="contenedor-clientes">
    <!-- Contenedor modal para editar los datos de un cliente. -->
    <div id="modal-cliente" class="modal-cliente">
      <label for="nombreCliente">
        <b>Nombre</b>
      </label>
      <input
        v-model="cliente.nombreCliente"
        type="text"
        placeholder="Ingrese el nombre"
        name="nombreCliente"
        required
      />
      <label for="ciudad">
        <b>Ciudad</b>
      </label>
      <input
        v-model="cliente.ciudad"
        type="text"
        placeholder="Ingrese la ciudad"
        name="ciudad"
        required
      />
      <label for="estado">
        <b>Estado</b>
      </label>
      <input
        v-model="cliente.estado"
        type="text"
        placeholder="Ingrese el estado"
        name="estado"
        required
      />
      <label for="pais">
        <b>País</b>
      </label>
      <input v-model="cliente.pais" type="text" placeholder="Ingrese el país" name="pais" required />
      <label for="direccion">
        <b>Dirección</b>
      </label>
      <input
        v-model="cliente.direccion"
        type="text"
        placeholder="Ingrese la dirección"
        name="direccion"
        required
      />
      <label for="codigoPostal">
        <b>Código postal</b>
      </label>
      <input
        v-model="cliente.codigoPostal"
        type="text"
        placeholder="Ingrese el código postal"
        name="codigoPostal"
        required
      />
      <label for="correo">
        <b>Correo electrónico</b>
      </label>
      <input
        v-model="cliente.correo"
        type="text"
        placeholder="Ingrese el correo electrónico"
        name="correo"
        required
      />
      <label for="terminoPago">
        <b>Término de pago</b>
      </label>
      <input
        v-model="cliente.terminoPago"
        type="number"
        placeholder="Ingrese los días del término de pago"
        name="terminoPago"
        required
      />
      <label for="palabraTraduccion">
        <b>Precio palabra traducción</b>
      </label>
      <input
        v-model="cliente.palabraTraduccion"
        type="number"
        placeholder="Ingrese el precio por palabra traducida"
        name="palabraTraduccion"
        step=".01"
        required
      />
      <label for="palabraEdicion">
        <b>Precio palabra edición</b>
      </label>
      <input
        v-model="cliente.palabraEdicion"
        type="number"
        placeholder="Ingrese el precio por palabra editada"
        name="palabraEdicion"
        step=".01"
        required
      />
      <label for="palabraProofreading">
        <b>Precio palabra proofreading</b>
      </label>
      <input
        v-model="cliente.palabraProofreading"
        type="number"
        placeholder="Ingrese el precio por palabra revisada"
        name="palabraProofreading"
        step=".01"
        required
      />
      <hr />
      <button @click="actualizar" class="botones">Enviar</button>
      <button @click="cerrarModal" class="botones">Cancelar</button>
    </div>
    <div class="caja-iconos">
      <img @click="actualizarContador(5)" class="iconos" src="../assets/agregar.png" alt />
    </div>
    <!-- Tabla de clientes -->
    <div class="contenedor-tabla">
      <div class="tabla">
        <table>
          <thead>
            <tr>
              <th>B</th>
              <th>E</th>
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
              <td>
                <img
                  @click="borrarCliente(cliente.idCliente)"
                  class="iconos-tabla"
                  src="../assets/borrar.png"
                  alt
                />
              </td>
              <td>
                <img
                  @click="activarModal(cliente.idCliente)"
                  class="iconos-tabla"
                  src="../assets/editar.png"
                  alt
                />
              </td>
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
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { mapActions } from "vuex";
export default {
  data() {
    return {
      cliente: {
        idCliente: "",
        nombreCliente: "",
        ciudad: "",
        estado: "",
        pais: "",
        correo: "",
        direccion: "",
        codigoPostal: "",
        terminoPago: "",
        palabraTraduccion: "",
        horaTraduccion: "",
        palabraEdicion: "",
        horaEdicion: "",
        palabraProofreading: "",
        horaProofreading: ""
      }
    };
  },
  methods: {
    ...mapActions(["actualizarContador", "borrarCliente", "actualizarCliente"]),
    /**
     * Función para activar el modal de edición.
     * @param {Number} idCliente
     */
    activarModal: function(idCliente) {
      var cliente = this.getClientePorId(idCliente)[0];
      this.cliente.idCliente = cliente.idCliente;
      this.cliente.nombreCliente = cliente.nombreCliente;
      this.cliente.ciudad = cliente.ciudad;
      this.cliente.estado = cliente.estado;
      this.cliente.pais = cliente.pais;
      this.cliente.correo = cliente.correo;
      this.cliente.direccion = cliente.direccion;
      this.cliente.codigoPostal = cliente.codigoPostal;
      this.cliente.terminoPago = cliente.terminoPago;
      this.cliente.palabraTraduccion = cliente.palabraTraduccion;
      this.cliente.palabraEdicion = cliente.palabraEdicion;
      this.cliente.palabraProofreading = cliente.palabraProofreading;
      var modal = document.getElementById("modal-cliente");
      modal.className = "modal-cliente-activado";
    },
    /**
     * Función para cerrar el modal.
     */
    cerrarModal: function() {
      var modal = document.getElementById("modal-cliente");
      modal.className = "modal-cliente";
    },
    /**
     * Función para actualizar los datos de un cliente.
     */
    actualizar: function() {
      this.actualizarCliente(this.cliente);
      this.cerrarModal();
    }
  },
  computed: {
    ...mapGetters(["getClientes", "getClientePorId"])
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
  height: 9%;
  z-index: 1;
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
.tabla {
  position: absolute;
  width: 100%;
}
.iconos-tabla {
  width: 15%;
  cursor: pointer;
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
    height: 9%;
    background-color: rgba(39, 73, 119, 0.199);
    z-index: 1;
    align-self: center;
  }
  .iconos-tabla {
    width: 20%;
    cursor: pointer;
  }
  td {
    padding: 15px;
  }
}
.modal-cliente {
  display: none;
  pointer-events: none;
}
.modal-cliente-activado {
  position: absolute;
  overflow: auto;
  margin-left: 20%;
  margin-top: 5%;
  height: 75vh;
  width: 50%;
  background-color: white;
  border: solid 1 px #f1f1f1;
  box-shadow: 5px 10px 18px #888888;
  z-index: 1;
  padding: 10px;
}
input[type="text"],
input[type="number"] {
  width: 100%;
  padding: 10px;
  margin: 5px 0 15px 0;
  display: inline-block;
  border: none;
  background: #f1f1f1;
}
.botones {
  background-color: #4caf50;
  color: white;
  padding: 12px 20px;
  margin: 8px 0;
  border: none;
  cursor: pointer;
  width: 49%;
  margin-left: 1%;
  opacity: 0.9;
}
.botones:hover {
  opacity: 1;
}
</style>