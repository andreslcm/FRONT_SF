<template>
  <div class="contenedor">
    <div class="formulario">
      <img class="imagen" src="../assets/logo-azul.png">
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
      <hr />
      <button class="boton-enviar" @click="logear(usuario)">Enviar</button>
       <div class="formulario sesion">
        <p>
          <a href="#">Recuperar contraseña</a>.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  data() {
    return {
      usuario: {
        nombreUsuario: "",
        contrasena: ""
      }
    };
  },
  methods: {
    ...mapActions([
      'logear'
    ])
  }
};
</script>

<style scoped>
.contenedor {
  display: grid;
  height: 93vh;
  grid-template-columns: repeat (8, 1fr);
  grid-template-rows: 10% 57% 33%;
  grid-template-areas:
    "c c c c c c c c"
    ". . . f f . . ."
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

.imagen{
  margin-bottom: 5px;
  width: 100%;
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

.boton-enviar {
  background-color: #4caf50;
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
    grid-template-rows: 10% 65% 25%;
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
  .boton-enviar {
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