<template>
  <div class="contenedor-ac">
    <div class="datos-izquierda">
      <h2>Datos del cliente</h2>
        <hr />
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
      <input
        v-model="cliente.pais"
        type="text"
        placeholder="Ingrese el país"
        name="pais"
        required
      />

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
    </div>
    <div class="datos-derecha">
      <h2>Términos y tarifas</h2>
      <hr />
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
      <button class="boton-enviar" @click="logear(usuario)">Enviar</button>
    </div>
  </div>
</template>

<script>
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
  }
};
</script>

<style scoped>
*{
  box-sizing: border-box;
}
.contenedor-ac {
  height: 100%;
  display: grid;
  grid-template-columns: 50%, 50%;
  grid-template-rows: 2% 96% 2%;
  grid-template-areas:
    "c c"
    "d i"
    "p p";
}

.datos-izquierda {
  grid-area: d;
  width: 100%;
  padding: 0 10px;
  margin-left: 10px;
  border-right: solid 1px #f1f1f1;
}

.datos-derecha {
  width: 100%;
  grid-area: i;
  padding: 0 20px;
  margin-right: 10px;
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

hr {
  border: 1px solid #f1f1f1;
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
</style>