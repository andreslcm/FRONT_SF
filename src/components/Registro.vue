<template>
<div class="principal">
<img class="fondi" src="../assets/fondo.jpg">
  <div class="log">
  <img class="imagen" src="../assets/logo-azul.png">
    <ul>
      <li>
        <input v-model="usuario.nombre" type="text" id="nombre" placeholder="Nombre" title="Ingrese su Nombre" required/>
      </li>
      <li>
        <input v-model="usuario.apellido" type="text" id="apellido" placeholder="Apellido" title="Ingrese su Apellido" required/>
      </li>
      <li>
        <input v-model="usuario.contrasena" type="password" onkeyup='check();' id="contrsena" placeholder="Contrseña" title="Ingrese su Contraseña" required/>
      </li>
      <li>
        <input type="password" id="contrsena2" placeholder="Confirme su Contrseña" onkeyup='check();' title="Confrime su Contraseña" required/>
      </li>
      <li>
        <input v-model="usuario.nombreUsuario" type="text" id="nombreUsuario" placeholder="Nombre de usuario" title="Ingrese su Nombre de Usuario" required/>
      </li>
      <li>
        <input v-model="usuario.correo" type="email" id="correo" placeholder="Correo electrónico" title="Ingrese su Correo" required/>
      </li>
      <div class="button_cont" align="center">
        <button @click="registrarUsuario(usuario)" class="buttonhover" id="submit" target="_blank" rel="nofollow"><span>Registrarse</span></button>
      </div>
      <div class="inicioSesion">
        <p>
          ¿Ya tiene una cuenta?
          <a href="/login">Inicie sesión</a>.
        </p>
      </div>
    </ul>
  </div>
</div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      usuario: {
        contrasena: "",
        nombreUsuario: "",
        correo: ""
      }
    };
  },
  methods: {
    ...mapActions(["registrarUsuario"])
  }
};
</script>

<style scoped>
.contenedor {
  display: grid;
  height: 93vh;
  grid-template-columns: repeat (8, 1fr);
  grid-template-rows: 10% 70% 20%;
  grid-template-areas:
    "c c c c c c c c"
    ". . f f f f . ."
    "a a a a a a a a";
}

* {
  box-sizing: border-box;
}
.formulario {
  grid-area: f;
  padding: 0px 16px;
  background-color: white;
  border: 1px solid #f1f1f1;
}

input[type="text"],
input[type="password"] {
  width: 100%;
  padding: 12px;
  margin: 5px 0 22px 0;
  display: inline-block;
  border: none;
  background: #f1f1f1;
}

input[type="text"]:focus,
input[type="password"]:focus {
  background-color: #ddd;
  outline: none;
}

hr {
  border: 1px solid #f1f1f1;
  margin-top: 5px;
  margin-bottom: 15px;
}

.boton-registro {
  background-color: #4caf50;
  color: white;
  padding: 12px 20px;
  margin: 8px 0;
  border: none;
  cursor: pointer;
  width: 100%;
  opacity: 0.9;
}

.boton-registro:hover {
  opacity: 1;
}

a {
  color: dodgerblue;
}

.sesion {
  background-color: #f1f1f1;
  text-align: center;
}

h2 {
  margin: 10px 0;
}

@media screen and (max-width: 1400px) {
  .contenedor {
    display: grid;
    height: 93vh;
    grid-template-columns: repeat (8, 1fr);
    grid-template-rows: 10% 80% 10%;
    grid-template-areas:
      "c c c c c c c c"
      ". . . f f . . ."
      "a a a a a a a a";
  }
  input[type="text"],
  input[type="password"] {
    width: 100%;
    padding: 5px;
    margin: 5px 0 15px 0;
    display: inline-block;
    border: none;
    background: #f1f1f1;
  }
  .boton-registro {
    background-color: #4caf50;
    color: white;
    padding: 7px 15px;
    margin: 10px 0;
    border: none;
    cursor: pointer;
    width: 100%;
    opacity: 0.9;
  }
  hr {
    border: 1px solid #f1f1f1;
    margin-bottom: 5px;
  }
}
</style>