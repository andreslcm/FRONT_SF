<template>
<div class="principal">
  <div class="log">
  <img class="imagen" src="../assets/logo-azul.png">
    <div @keyup="registro()">
      <ul>
        <li>
          <input v-model="usuario.nombre" type="text" id="nombre" placeholder="Nombre" title="Ingrese su Nombre" required/>
        </li>
        <li>
          <input v-model="usuario.apellido" type="text" id="apellido" placeholder="Apellido" title="Ingrese su Apellido" required/>
        </li>
        <li id="labelcont" class="labelcont">
          <label for="contrsena">Debe contener 8 caracteres y al menos un numero</label>
        </li>
        <li>
          <input v-model="usuario.contrasena" type="password" id="contrsena" placeholder="Contrseña" title="Ingrese su Contraseña" required/>
        </li>
        <li>
          <input type="password" id="contrsena2" placeholder="Confirme su Contrseña" title="Confrime su Contraseña" required/>
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
    registro() {
      //variables
      var contrasena = document.getElementById("contrsena").value;
      var contrasena2 = document.getElementById("contrsena2").value;
      var nombre = document.getElementById("nombre").value;
      var apellido = document.getElementById("apellido").value;
      var nombreUsuario = document.getElementById("nombreUsuario").value;
      var correo = document.getElementById("correo").value;
      var comparacion;
      var paramContrasenia;

      //si las contraseñas son iguales y distitnas de vacio
      if (contrasena == contrasena2 && contrasena!=""){
        comparacion = true;
      }
      //si la contraseña es menor a 8 caracteres y no contiene numeros, muestra el label
      if (contrasena.length <= 8 && contrasena.search(/\d/) == -1) {
        document.getElementById("labelcont").style.display = "block";
        paramContrasenia = false;
      } else {
        document.getElementById("labelcont").style.display = "none";
        paramContrasenia = true;
      }

      //permite mostrar el boton de registro una vez que se cumolen con los requisitos
      if (comparacion && paramContrasenia && nombre != "" && apellido != "" && nombreUsuario != "" && correo != ""){
        document.getElementById("submit").style.display = "block";
      } else {
        document.getElementById("submit").style.display = "none";
      }

    },
    ...mapActions(["registrarUsuario"])
  }
};
</script>

<style scoped>
*{
  font-family:"Helvetica Neue", Helvetica;
  overflow: hidden;
}
.labelcont{
    display: none;
    margin-left: 5%;
}
#submit{
    display: none;
}
img{
  padding: 10%;
  padding-bottom: 0%;
}
.button_cont{
  align-content:center;
}
.principal{
  display: flex;
	align-items: center;
	justify-content: center;
	min-height: 93vh;
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
.inicioSesion{
  display: flex;
  margin-bottom: 10px;
}
p{
  margin: auto;
  width: auto;
}
</style>