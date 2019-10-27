<template>
  <div class="contenedor">
    <div class="formulario">
      <h2>Registro</h2>
      <p>Regístrese para crear una cuenta.</p>
      <hr />

      <label for="correo">
        <b>Correo electrónico</b>
      </label>
      <input
        v-model="usuario.correo"
        type="text"
        placeholder="Ingrese su correo electrónico"
        name="correo"
        required
      />

      <label for="nombreUsuario">
        <b>Nombre de usuario</b>
      </label>
      <input
        v-model="usuario.nombreUsuario"
        type="text"
        placeholder="Nombre de usuario"
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
        name="contraseña"
        required
      />

      <label for="repetir">
        <b>Repita su contraseña</b>
      </label>
      <input type="password" placeholder="Repita la contraseña" name="repetir" required />
      <hr />

      <button @click="registrarUsuario(usuario)" class="boton-registro">Registrar</button>

      <div class="formulario sesion">
        <p>
          ¿Ya tiene una cuenta?
          <a href="/login">Inicie sesión</a>.
        </p>
      </div>
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