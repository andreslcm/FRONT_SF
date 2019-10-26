<template>
  <div class="contenedor">
    <div class="formulario">
      <div class="imagen"></div>
      <div class="entradas">
        <label for="nombreUsuario">Usuario</label>
        <input v-model="usuario.nombreUsuario" type="text" id="nombreUsuario" />
        <label for="contrasena">Contraseña</label>
        <input v-model="usuario.contrasena" type="text" id="contrasena" />
        <button @click="logear(usuario)">Enviar</button>
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
  grid-template-rows: 100%;
}

.formulario {
  border: solid 1px black;
  border-radius: 5px;
  background-color: rgba(53, 53, 59, 0.486);
  box-shadow: 5px 10px 8px #888888;
  grid-column: 4/6;
  height: 50%;
  margin-top: 30%;

  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(2, 1fr);

  grid-template-areas:
    "i"
    "e";
}

.imagen{
  grid-area: i;
}

.entradas {
  grid-area: e;
}

.entradas > *{
  display: flex;
  flex: 1;
  justify-content: center;
  margin: 5px auto;
}


</style>