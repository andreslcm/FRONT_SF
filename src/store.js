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
    clientes: [],
    facturas: [],
    datosUsuario: {},
    contador: 0,
  },
  mutations: {
    /**
     * Mutación para cambiar el estado del token.
     * @param {estado} state 
     * @param {String} token 
     */
    SET_TOKEN(state, token) {
      state.token = token;
    },
    /**
     * Mutación para cambiar el estado del id.
     * @param {estado} state 
     * @param {Number} id 
     */
    SET_ID(state, id) {
      state.id = id;
    },
    /**
     * Mutación para cambiar el estado del array de clientes.
     * @param {estado} state 
     * @param {Array obejtos cliente} clientes 
     */
    SET_CLIENTES(state, clientes) {
      state.clientes = clientes;
    },
    /**
      * Mutación para cambiar el estado del array de facturas.
      * @param {estado} state 
      * @param {Array obejtos factura} facturas 
      */
    SET_FACTURAS(state, facturas) {
      state.facturas = facturas;
    },
    /**
    * Mutación para cambiar el estado del contador.
    * @param {estado} state 
    * @param {Number} numero 
    */
    SET_CONTADOR(state, numero) {
      state.contador = numero;
    },
    /**
    * Mutación para cambiar el estado del array de clientes.
    * @param {estado} state 
    * @param {Objeto usuario} datos 
    */
    SET_DATOS_USUARIO(state, datos) {
      state.datosUsuario = datos;
    }
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
    /**
     * Función para destruir el token y la sesión del usuario.
     * @param {store}
     */
    logout: function (context) {
      localStorage.setItem("tokenJwt", null);
      localStorage.setItem("idUsuario", null);
      context.commit('SET_TOKEN', null);
      context.commit('SET_ID', null);
      router.push('login');
    },
    /**
     * Función asincrónica para conectarse con la API y cargar los clientes del usuario.
     * @param {store} context 
     */
    cargarClientes: async function (context) {
      axios
        .get(`http://localhost:7070/listar-clientes/${context.getters.getIdUsuario}`, {
          headers: {
            Authorization: "Bearer " + context.getters.getToken
          }
        })
        .then(respuesta => {
          context.commit('SET_CLIENTES', respuesta.data)
        });
    },
    /**
     * Función asincrónica para conectarse con al API y cargar las facturas del usuario.
     * @param {store} context 
     */
    cargarFacturas: async function (context) {
      axios
        .get(`http://localhost:7070/listar-facturas/${context.getters.getIdUsuario}`, {
          headers: {
            Authorization: "Bearer " + context.getters.getToken
          }
        })
        .then(respuesta => {

          context.commit('SET_FACTURAS', respuesta.data);
        });
    },
    /**
     * Función asincrónica para conectarse con al API y cargar los datos del usuario.
     * @param {store} context 
     */
    traerDatosUsuario: async function (context) {
      axios
          .get(`http://localhost:7070/datos-usuario/${context.getters.getIdUsuario}`, {
              headers: {
                  Authorization: "Bearer " + context.getters.getToken
              }
          })
          .then(respuesta => {
              context.commit('SET_DATOS_USUARIO', respuesta.data);
          });
    },
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
    estaAutenticado: function (state) {
      if (state.token != "null") {
        return true;
      } else {
        return false;
      }
    }
  }
})
