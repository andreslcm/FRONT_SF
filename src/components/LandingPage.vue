<template>
  <div>
    <div class="border">        
    </div>
    <div class="main">
      <div class="padre">    
        <div class="hijo1">    
        <img class="foto" src="../assets/inicio_foto.png">
        </div>
        <div class="hijo2">               
          <div>
          <img class="imagen" src="../assets/logo-blanco.png">
            <p>Gracias por usar Invoicing for Translator. La siguiente aplicación te perimitia hacer seguimiento del estatus de pago de cada registro, tener una base de datos de clientes, generar estadisticas financieras que sirvan de guia, entre otros aspectos. El programa proporciona los detalles y requerimientos para el uso correcto de la misma.</p>  
            <br>                
            <a href="/login" class="cta">
              <span>Iniciar Sesion</span>
              <svg width="13px" height="10px" viewBox="0 0 13 10" color="white">
                <path d="M1,5 L11,5"></path>
                <polyline points="8 1 12 5 8 9"></polyline>
              </svg>
            </a>                
            <a href="/registro" class="regis">¿No eres un usuario? Registrate!
            </a>
          </div>
        </div>    
      </div>
    </div>  
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.border{
  background: #CCD4EB;
  height: 0.5vh;
}
.content {
  position: absolute;
  height: 90vh;
  width: 100vh;
  z-index: 0;
}
.large-header{
  height: 90vh;
  width: 100vh;
}
.foto{
  margin: auto;
}
.divfoto{
  margin: 0%;
  padding: 0;
}
.padre{
  display: flex;
  margin: auto;
  height: 92.5vh;
  background-color: #0C427D;
}
.hijo1{
  margin: auto;
  padding: auto;
  display: flex;
  z-index: 1;
}
.hijo2{
  padding: auto;
  margin: auto;
  display: flex;
  z-index: 1;
}
p{
  width: 80%;
  color: #fff;
  font-weight: 500;
  text-align: justify;
  font-size: 3vh;
}
a{
  text-decoration: none;
  color: white;
  margin: 20px;
  align-self: center;
}
.cta{
  position: relative;
  margin: auto;
  padding: 19px 22px;
  transition: all 0.2s ease;
}
.cta:before{
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  display: block;
  border-radius: 28px;
  background: rgba(204, 212, 235, 0.5);
  width: 56px;
  height: 56px;
  transition: all 0.3s ease;
}
.cta span{
  position: relative;
  font-size: 16px;
  line-height: 18px;
  font-weight: 900;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  vertical-align: middle;
}
.cta svg{
  position: relative;
  top: 0;
  margin-left: 10px;
  fill: none;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke: #111;
  stroke-width: 2;
  transform: translateX(-5px);
  transition: all 0.3s ease;
}
.cta:hover:before{
  width: 100%;
  background: rgba(204, 212, 235, 0.5);
}
.cta:hover svg{
  transform: translateX(0);
}
.cta:active{
  transform: scale(0.96);
}
.regis{
  text-decoration: underline;
}
</style>