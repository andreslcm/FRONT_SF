<template>
<div>
    <div class="contenedor-side">
    <img class="imagen" src="../assets/logoblanco.png" alt="">
    <button @click="actualizarContador(1)" class="botones boton-1">Clientes</button>
    <button @click="actualizarContador(2)" class="botones boton-2">Facturas</button>
    <button @click="actualizarContador(3)" class="botones boton-3">Estadísticas</button>
    <button @click="actualizarContador(4)" class="botones boton-4">Usuario</button>
    <img class="logout" src="../assets/salir.png" @click="logout">
  </div>

   <img class="imagen1" src="../assets/chamo.png" alt="">
   
</div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  name: 'SideBar',
  methods: {
    ...mapActions([
      'logout',
      'actualizarContador'
    ])
  }
};
</script>

<style scoped>

*{
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
	width: 40%;
	height: 10%;
	float: right;
	margin-top: 4%;
}

.contenedor-ac {
  height: 10%;
  width: 80%;
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
  background: #CCD4EB;
  color: #0C427D;
}
label{
  color: #0C427D;
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
}

.boton-enviar:hover {
  opacity: 1;
}
   
.contenedor-side {
  height: 122%;
  width: 150%;
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
  margin-top: -19%;
  margin-left: -10%;

}


.boton-1 {
  grid-area: b1;
  color: #0C427D;
}

.boton-2 {
  grid-area: b2;
  color: #0C427D;
  margin-top: -35%;
}

.boton-3 {
  grid-area: b3;
  color: #0C427D;
  margin-top: -50%;
}

.boton-4 {
  grid-area: b4;
  color: #0C427D;
  margin-top: -65%;
}

.imagen{
  margin-top: 5%;
  margin-left: 10%;
  width: 80%;
  height: 80%;
  grid-area: i;
}
.imagen:hover {
  cursor: pointer;
}

.logout{
  margin-top: -78%;
  width: 110%;
  height: 89%;
  grid-area: l;
  margin-left: -10%;
}

.logout:hover{
  cursor: pointer;
}

.imagen1{
  margin-left:34%;
  margin-top: -100%;
  width: 80%;
  height: 28%;
  float: left;
}



</style>