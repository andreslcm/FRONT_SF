<template>
<div class="principal">
  <div class="log">
    <img class="imagen" src="../assets/logo-azul.png">
      <div @keyup="login()">
        <ul>
          <li>
            <input v-model="usuario.nombreUsuario" type="text" id="nombreUsuario" placeholder="Usuario" required title="Nombre de Usuario"/>
          </li>  
          <li>
            <input v-model="usuario.contrasena" type="password" id="contrasena" placeholder="Contraseña" required title="Contraseña"/>
          </li>

          <div class="button_cont" align="center">
            <button @click="logear(usuario)" id="buttonhover" class="buttonhover"><span>Entrar</span></button>
          </div>
          <div class="contraRecuperar">
            <p>
              ¿Olvidaste tu contraseña?
              <a href="#">Recuperala!</a>.
            </p>
          </div>
        </ul>
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
        nombreUsuario: "",
        contrasena: ""
      }
    };
  },
  methods: {
    login() {
      //variables
      var nombreUsuario = document.getElementById("nombreUsuario").value;
      var contrasena = document.getElementById("contrasena").value;

      //muestra el boton para iniciar el programa
      if (nombreUsuario != "" && contrasena!=""){
        document.getElementById("buttonhover").style.opacity = "1";
        document.getElementById("buttonhover").style.height = "auto";
      }

      //esconde el boton si los campos estan vacios
      if (!nombreUsuario || !contrasena){
        document.getElementById("buttonhover").style.opacity = "0";
        document.getElementById("buttonhover").style.height = "0";
        document.getElementById("buttonhover").style.overflow = "hidden";
      }
    },
    ...mapActions(["logear"])
  }
};
</script>

<style scoped>
*{
  font-family:"Helvetica Neue", Helvetica;
  overflow: hidden;
}
.buttonhover{
    transition: opacity 1s ease-out;
    opacity: 0;
    height: 0;
    overflow: hidden;
}
.principal{
  display: flex;
	align-items: center;
	justify-content: center;
	min-height: 93vh;
  background:white;
}
.demo-canvas {
  position: absolute;

}
img{
  width: 90% ;
  margin: 2% 5%;
}
.log {
  height: auto;
  width: 50vh;
  padding: auto;
  align-items: center;
	justify-content: center;
  background: #CCD4EB;
  box-shadow: 0 30px 60px -12px rgba(50,50,93,.25),0 18px 36px -18px rgba(0,0,0,.3),0 -12px 36px -8px rgba(0,0,0,.025);
  position: absolute;
  align-items: center;
	justify-content: center;
}
.buttonhover {
  border-radius: 4px;
  border: none;
  text-align: center;
  text-transform: uppercase;
  transition: all 0.4s;
  cursor: pointer;
  background: #0C427D;
  margin: 5% 0%;
  padding: 2%;
  font-weight: 1000;
  color: white;
}
.buttonhover span {
  cursor: pointer;
  display: inline-block;
  position: relative;
  transition: 0.4s;
}
.buttonhover span:after {
  content: '\00bb';
  position: absolute;
  opacity: 0;
  top: 0;
  right: -20px;
  transition: 0.5s;
}
.buttonhover:hover span {
  padding-right: 25px;
}
.buttonhover:hover span:after {
  opacity: 1;
  right: 0;
}
input {
  width:75%;
  background:white;
  border:0;
  padding:20px;
  border-radius:6px;
  margin:10px 20px;
  color:#0C427D;
  font-weight:800 ;
  border: 1px white;
}
p a {
  margin: 0%;
  padding:0%;
  text-decoration: underline;
}
.contraRecuperar{
  display: flex;
  margin-bottom: 20px;
}
p{
  margin: auto;
  width: auto;
}
</style>