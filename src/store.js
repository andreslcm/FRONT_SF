import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import { router } from './router'

Vue.use(Vuex)
/**
 * En el store se almacenan los datos y los métodos para cambiar estos datos.
 */
export const store = new Vuex.Store({
  state: {
    token: localStorage.getItem("tokenJwt") || null,
    id: localStorage.getItem("idUsuario") || null,
  },
  mutations: {
    /**
     * Mutación para cambiar el estado del token.
     * @param {String} state 
     * @param {String} token 
     */
    SET_TOKEN(state, token) {
      state.token = token;
    },
    /**
     * Mutación para cambiar el estado del id.
     * @param {String} state 
     * @param {Number} id 
     */
    SET_ID(state, id) {
      state.id = id;
    },
  },
  actions: {
    /**
     * Función asincrónica para inicio de sesión y captura de token y del id del usuario.
     * @param {store} context 
     * @param {Objeto usuario} parametro 
     */
    logear: async function (context, parametro) {
      var datos = {
        nombreUsuario: parametro.nombreUsuario,
        contrasena: parametro.contrasena
      }
      axios
        .post("http://localhost:7070/login", datos, null)
        .then(respuesta => {
          var token = respuesta.data.token.tokenJwt
          context.commit('SET_TOKEN', token)
          localStorage.setItem("tokenJwt", token);
          var id = respuesta.data.id;
          context.commit('SET_ID', id)
          localStorage.setItem("idUsuario", id);
        })
        .then(() => {
          router.push("logged");
        })
        .catch(() => alert("Credenciales incorrectas"));
    },
    /**
     * Método para registrar un usuario.
     * @param {store} context 
     * @param {Objeto usuario} datos 
     */
    registrarUsuario: async function (context, datos) {
      axios
        .post("http://localhost:7070/registro", datos)
        .then(() => {
          alert("Registrado con éxito");
          router.push("login");
        })
        .catch((error) => {
          alert(error.response.data.message);
        });
    },
    logout: function(context){
      localStorage.setItem("tokenJwt", null);
      localStorage.setItem("idUsuario", null);
      context.commit('SET_TOKEN', null);
      context.commit('SET_ID', null);
      router.push('login');
    }
  },
  getters: {
    /**
     * Método para obtener el id.
     * @param {Number} state 
     */
    getIdUsuario: function (state) {
      return state.id;
    },
    /**
     * 
     * @param {String} state 
     */
    getToken: function (state) {
      return state.token;
    },
    /**
     * Método para saber si el usuario está autenticado.
     * @param {store} state 
     */
    estaAutenticado: function (state){
      if (state.token != "null"){
        return true;
      } else {
        return false;
      }
    }
  }
})
