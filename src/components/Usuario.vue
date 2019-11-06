<template>
<div>
<img class="EditPerfil" src="../assets/Eperfil.png">

  <div class="contenedor-usuario">
    
    <div class="u-datos">
      <label for="nombreUsuario">
        <b>Nombre</b>
      </label>
      <input
        v-model="usuario.nombre"
        type="text"
        placeholder="Ingrese el nombre"
        name="nombreUsuario"
        required
      />

      <label for="apellidoCliente">
        <b>Apellido</b>
      </label>
      <input
        v-model="usuario.apellido"
        type="text"
        placeholder="Ingrese el apellido"
        name="apellidoCliente"
        required
      />

      <label for="nombreUsuario">
        <b>Nombre de usuario</b>
      </label>
      <input
        v-model="usuario.nombreUsuario"
        type="text"
        placeholder="Ingrese de usuario"
        name="nombreUsuario"
        required
      />

      <label for="contrasena">
        <b>Contraseña</b>
      </label>
      <input
        v-model="usuario.contrasena"
        type="password"
        placeholder="Ingrese su contraseña"
        name="contrasena"
        required
      />

      <label for="ciudad">
        <b>Ciudad</b>
      </label>
      <input
        v-model="usuario.ciudad"
        type="text"
        placeholder="Ingrese la ciudad"
        name="ciudad"
        required
      />

      <label for="estado">
        <b>Estado</b>
      </label>
      <input
        v-model="usuario.estado"
        type="text"
        placeholder="Ingrese el estado"
        name="estado"
        required
      />

      <label for="pais">
        <b>País</b>
      </label>
      <input v-model="usuario.pais" type="text" placeholder="Ingrese el país" name="pais" required />

      <label for="direccion">
        <b>Dirección</b>
      </label>
      <input
        v-model="usuario.direccion"
        type="text"
        placeholder="Ingrese la dirección"
        name="direccion"
        required
      />

      <label for="codigoPostal">
        <b>Código postal</b>
      </label>
      <input
        v-model="usuario.codigoPostal"
        type="text"
        placeholder="Ingrese el código postal"
        name="codigoPostal"
        required
      />

      <label for="correo">
        <b>Correo electrónico</b>
      </label>
      <input
        v-model="usuario.correo"
        type="text"
        placeholder="Ingrese el correo electrónico"
        name="correo"
        required
      />

      <label for="paypal">
        <b>Paypal</b>
      </label>
      <input
        v-model="usuario.datosPaypal"
        type="text"
        placeholder="Ingrese su correo asociado a PayPal"
        name="paypal"
        required
      />
    </div>
    <div class="u-botones">
      <button @click="actualizarDatosUsuario(usuario)" class="boton-enviar">Actualizar</button>
    </div>
  </div>
</div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      usuario: {
        nombre: "",
        apellido: "",
        contrasena: "",
        nombreUsuario: "",
        correo: "",
        direccion: "",
        ciudad: "",
        estado: "",
        pais: "",
        codigoPostal: "",
        telefono: "",
        datosPaypal: "",
        datosPayoneer: "",
        datosBanco: ""
      }
    };
  },
  methods: {
    ...mapActions(["actualizarDatosUsuario"]),
    cargarDatos: function() {
      this.usuario.nombre = this.getDatosUsuario.nombre;
      this.usuario.apellido = this.getDatosUsuario.apellido;
      this.usuario.nombreUsuario = this.getDatosUsuario.nombreUsuario;
      this.usuario.correo = this.getDatosUsuario.correo;
      this.usuario.direccion = this.getDatosUsuario.direccion;
      this.usuario.ciudad = this.getDatosUsuario.ciudad;
      this.usuario.estado = this.getDatosUsuario.estado;
      this.usuario.pais = this.getDatosUsuario.pais;
      this.usuario.codigoPostal = this.getDatosUsuario.codigoPostal;
      this.usuario.telefono = this.getDatosUsuario.telefono;
      this.usuario.datosPaypal = this.getDatosUsuario.datosPaypal;
      this.usuario.datosPayoneer = this.getDatosUsuario.datosPayoneer;
    }
  },
  computed: {
    ...mapGetters(["getDatosUsuario"])
  },
  created() {
    this.cargarDatos();
  }
};
</script>

<style scoped>
* {
  box-sizing: border-box;
  
}

b{
  color: #0C427D;

}

.contenedor-usuario {
  height: 70%;
  width: 95%;
  margin-top: 3.1%;
  margin-left: 5%;
  display: grid;
  grid-template-columns: 15% auto 15%;
  grid-template-rows: 88% 10%;
  grid-template-areas:
    "izq c der"
    ". bot .";
  overflow: auto;
}

.u-datos {
  height: 100%;
  width: 100%;
  margin-top: 10px;
  margin-bottom: 10px;
  grid-area: c;
  overflow: auto;
  border: 1px solid #f1f1f1;
  padding: 20px;
}

.u-botones {
  grid-area: bot;
  margin-top: 10px;
  height: 100%;
  width: 100%;
}

input[type="text"],
input[type="number"],
input[type="password"] {
  width: 100%;
  padding: 10px;
  margin: 5px 0 15px 0;
  display: inline-block;
  border: none;
  background: #CCD4EB;
}
input{
  color: #0C427D;
}

hr {
  border: 1px solid #CCD4EB;
}

.boton-enviar {
  background-color:  #0C427D;
  width: 10%;
  color: white;
  padding: 12px 20px;
  margin: 8px 0;
  border: none;
  cursor: pointer;
  width: 100%;
  opacity: 0.9;
}

.boton-enviar:hover {
  opacity: 1;
}

.EditPerfil{
  width: 50%;
  height: 6%;
  margin-left: 50%;
  margin-top: 2.5%;
}
</style>