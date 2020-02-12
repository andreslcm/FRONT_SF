<template>
<div>
<img class="titulo" src="../assets/tituloclientes.png"/>

  <div class="contenedor-ac"  @keyup="agregarCliente()">
    <!-- Contenedor izquierdo de datos del cliente -->
    <div class="datos-izquierda">
      <h2>Datos del cliente</h2>
     
      <label for="nombreCliente">
        <b>Nombre</b>
      </label>
      <input
        v-model="cliente.nombreCliente"
        type="text"
        placeholder="Ingrese el nombre"
        name="nombreCliente"
        id="nombreCliente"
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
        id="ciudad"
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
        id="estado"
        required
      />
      <label for="pais">
        <b>País</b>
      </label>
      <input v-model="cliente.pais" type="text" placeholder="Ingrese el país" name="pais" id="pais" required />
      <label for="direccion">
        <b>Dirección</b>
      </label>
      <input
        v-model="cliente.direccion"
        type="text"
        placeholder="Ingrese la dirección"
        name="direccion"
        id="direccion"
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
        id="codigoPostal"
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
        id="correo"
        required
      />
    </div>
    <!-- Contenedor derecho de datos del cliente -->
    <div class="datos-derecha">
      <h2>Términos y tarifas</h2>
     
      <label for="terminoPago">
        <b>Término de pago</b>
      </label>
      <input
        v-model="cliente.terminoPago"
        type="number"
        placeholder="Ingrese los días del término de pago"
        name="terminoPago"
        id="terminoPago"
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
        id="palabraTraduccion"
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
        id="palabraEdicion"
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
        id="palabraProofreading"
        step=".01"
        required
      />
      
      <button class="boton-enviar" id="boton-enviar" @click="agregarCliente(cliente)">Enviar</button>
    </div>
  </div>
</div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      cliente: {
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
    ...mapActions(["agregarCliente"]),
    agregarCliente(){
      /*
      Variables
      */
      var nombreClientes = document.getElementById("nombreCliente").value;
      var ciudad = document.getElementById("ciudad").value;
      var estado = document.getElementById("estado").value;
      var pais = document.getElementById("pais").value;
      var correo = document.getElementById("correo").value;
      var direccion = document.getElementById("direccion").value;
      var codigoPostal = document.getElementById("codigoPostal").value;
      var terminoPago = document.getElementById("terminoPago").value;
      var palabraTraduccion = document.getElementById("palabraTraduccion").value;
      var palabraEdicion = document.getElementById("palabraEdicion").value;
      var palabraProofreading = document.getElementById("palabraProofreading").value;
      var camposVacios = false;
      var camposNumeros = false;

      /*
      Evalua si hay campos vacios
      */
      if (nombreClientes != "" && ciudad != "" && estado != "" && pais != "" && correo != "" && direccion != "" && codigoPostal != ""
      && terminoPago != "" && palabraTraduccion != "" && palabraEdicion != "" && palabraProofreading != "") {
        camposVacios = true
      } else {
        camposVacios = false
      }
      /*
      Evalua si hay campos numericos menores de 0
      */
      if (palabraEdicion > 0 && terminoPago > 0 && palabraEdicion > 0 && palabraProofreading > 0) {
        camposNumeros = true
      } else {
        camposNumeros = false
      }
      /*
      muestra el boton de "enviar" al cumplirse las condiciones dadas
      */
      if (camposVacios && camposNumeros) {
        document.getElementById("boton-enviar").style.display = this.$block;
      } else {
        document.getElementById("boton-enviar").style.display = this.$none
      }
    }
  }
};
</script>

<style scoped>
* {
  box-sizing: border-box;
  height: 82%;
  margin: 0;
}

html{
	background-image: url(../assets/fondo.jpg);
	background-repeat: no-repeat;
	background-size: 100%;
}


h2{
color: #0C427D;
margin-top: -5%;
}

.titulo{
	width: 55%;
	height: 8%;
	float: right;
	margin-top: 2.8%;
}

.contenedor-ac {
  height: 10%;
  margin-left: 12%;
  width: 80%;
  margin-right: 6%;
  margin-top: 4.6%;
  float: right;
  display: grid;
  grid-template-columns: 50%, 50%;
  grid-template-rows: 2% 96% 2%;
  grid-template-areas:
    "c c"
    "d i"
    "p p";
}

.formulario{
  height: 100%;
}
.datos-izquierda {
  grid-area: d;
  width: 100%;
  padding: 0 10px;
  margin-left: 2%;
  border-right: solid 1px #f1f1f1;
}
.datos-derecha {
  width: 100%;
  grid-area: i;
  padding: 0 20px;
  margin-right: 15px;
}
input[type="text"],
input[type="number"] {
  width: 100%;
  padding: 10px;
  margin: 5px 0 15px 0;
  display: inline-block;
  border: none;
  background: #CCD4EB;
  color: #0C427D;
}
label{
  color: rgb(255, 255, 255);
}
hr {
  border: 1px solid #f1f1f1;
}
.boton-enviar {
  background-color: #0C427D;
  color: white;
  padding: 12px 20px;
  margin: 8px 0;
  border: none;
  cursor: pointer;
  width: 100%;
  opacity: 0.9;
  text-align: center;
  margin-top: 1%;
  display: none;
}
.boton-enviar:hover {
  opacity: 1;
}
   
.contenedor-side {
  height: 150%;
  width: 20%;
  float:left;
  background-color: #0C427D;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(14, 1fr);
  grid-template-areas:
         "i i i"
         "i i i"
         ". . ."
         ". b1 ."
         ". . ."
         ". b2 ."
         ". . ."
         ". b3 ."
         ". . ."
         ". b4 ."
         ". . ."
         ". l ."
         ". . ."
         ". . ."
}
.botones {
  background-color: #CCD4EB;
  border: none;
  color: white;
  padding: 10px 25px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  cursor: pointer;
}
.boton-1 {
  grid-area: b1;
  color: #0C427D;
}
.boton-2 {
  grid-area: b2;
  color: #0C427D;
  margin-top: -15%;
}
.boton-3 {
  grid-area: b3;
  color: #0C427D;
  margin-top: -29%;
}
.boton-4 {
  grid-area: b4;
  color: #0C427D;
  margin-top: -44%;
}

.imagen{
  margin-top: 10%;
  margin-left: 10%;
  grid-area: i;
}
.imagen:hover {
  cursor: pointer;
}
.logout{
  margin-top: -58%;
  width: 100%;
  height: 90%;
  grid-area: l;
}
.logout:hover{
  cursor: pointer;
}

.imagen1{
  margin-left:-14%;
  margin-top: 37%;
  width: 8%;
  height: 30%;
  float: left;
}


</style>

