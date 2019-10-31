import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import { router } from './router'

Vue.use(Vuex)
/**
 * En el store se almacenan los datos y los métodos para cambiar estos datos.
 */
export const store = new Vuex.Store({
  /**
   * ESTADO
   */
  state: {
    token: localStorage.getItem("tokenJwt") || null,
    id: localStorage.getItem("idUsuario") || null,
    clientes: [],
    facturas: [],
    listaIdFacturas: [],
    datosUsuario: {},
    contador: 0,
    filtro: {
      tipo: 'todos',
      nombre: ''
    }
  },
  /**
   * MUTACIONES
   */
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
    },
    /**
     * Mutación para cambiar el estado del filtro de las facturas.
     * @param {estado} state
     * @param {Objeto filtro} filtro
     */
    SET_FILTRO(state, filtro) {
      state.filtro = filtro;
    },
    /**
     * Mutación para cambiar el estado de la lista de ID de facturas.
     * @param {estado} state
     * @param {List} lista
     */
    SET_LISTA_ID_FACTURAS(state, lista){
      state.listaIdFacturas = lista;
    }
  },
  /**
   * ACCIONES
   */
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
    /**
     * Función para establecer el filtro de las facturas.
     * @param {Objeto filtro} filtro
     * @param {store} context
     */
    filtrar: function (context, filtro) {
      context.commit('SET_FILTRO', filtro)
    },
    /**
     * Función para actualizar el contador de páginas.
     * @param {store} context
     * @param {Number} numero
     */
    actualizarContador: function (context, numero) {
      context.commit('SET_CONTADOR', numero)
    },
    /**
     * Función asincrónica para agregar un cliente.
     * @param {store} context 
     * @param {Objeto cliente} datos 
     */
    agregarCliente: async function (context, datos) {
      axios
        .post(
          `http://localhost:7070/agregar-cliente/${context.getters.getIdUsuario}`,

          datos
          ,
          {
            headers: {
              Authorization: "Bearer " + context.getters.getToken
            }
          }
        )
        .then(() => {
          alert("Cliente agregado con éxtio.")
          context.dispatch('cargarClientes');
          context.dispatch('actualizarContador', 1);
        });
    },
    /**
     * Función asincrónica para un borrar cliente.
     * @param {store} context
     */
    borrarCliente: async function (context, idCliente) {
      if (confirm("¿Está seguro de que desea elmininar a este cliente?")) {
        axios
          .delete(`http://localhost:7070/borrar-cliente/${idCliente}`, {
            headers: {
              Authorization: "Bearer " + context.getters.getToken
            }
          })
          .then(() => {
            alert("Cliente eliminado con éxito.")
            context.dispatch('cargarClientes');
            context.dispatch('actualizarContador', 1);
          });
      }
    },
    /**
     * Función asincrónica para actualizar lo datos de un cliente específico.
     * @param {store} context 
     * @param {Number} idCliente 
     */
    actualizarCliente: async function (context, cliente) {
      if (confirm("¿Está seguro de que desea actualizar los datos?")) {
        axios
          .put(`http://localhost:7070/actualizar-cliente/${cliente.idCliente}`, cliente, {
            headers: {
              Authorization: "Bearer " + context.getters.getToken
            }
          })
          .then(() => {
            alert("Cliente actuilizado con éxito.")
            context.dispatch('cargarClientes');
            context.dispatch('actualizarContador', 1);
          });
      }
    },
    /**
     * Función para listar los ID de las facturas.
     * @param {store} context
     * @param {List} lista
     */
    listarIdFacturas: function (context, lista) {
      context.commit('SET_LISTA_ID_FACTURAS', lista)
    },
  },
  /**
   * GETTERS
   */
  getters: {
    /**
     * Método para obtener el id.
     * @param {estado} state 
     */
    getIdUsuario: function (state) {
      return state.id;
    },
    /**
     * 
     * @param {estado} state 
     */
    getToken: function (state) {
      return state.token;
    },
    /**
     * Método para saber si el usuario está autenticado.
     * @param {estado} state 
     */
    estaAutenticado: function (state) {
      if (state.token != "null") {
        return true;
      } else {
        return false;
      }
    },
    /**
     * Método para traer los clientes del usuario.
     * @param {estado} state
     */
    getClientes: function (state) {
      return state.clientes;
    },
    /**
     * Método para traer el contador.
     * @param {estado} state
     */
    getContador: function (state) {
      return state.contador;
    },
    /**
     * Método para traer los datos del usuario.
     * @param {estado} state
     */
    getDatosUsuario: function (state) {
      console.log(state.datosUsuario)
      return state.datosUsuario;
    },
    /**
     * Función para traer las facturas con o sin filtros.
     * @param {estado} state
     */
    getFacturas: function (state) {
      /**
       * Filtro para listar facturas por clientes.
       */
      if (state.filtro.tipo == 'clientes') {
        return state.facturas.filter(factura => {
          if (factura.nombreCliente === state.filtro.nombre) {
            return true;
          }
        })
        /**
         * Filtro para traer facturas por estado: vencidas.
         */
      } else if (state.filtro.tipo == 'estados' && state.filtro.nombre == 'vencidas') {
        return state.facturas.filter(factura => {
          if (factura.estaPagada == false && state.filtro.nombre == 'vencidas' && (new Date(factura.fechaVencimiento).getTime() < new Date().getTime())) {
            return true;
          }
        })
        /**
         * Filtro para traer facturas por estado: pagadas.
         */
      } else if (state.filtro.tipo == 'estados' && state.filtro.nombre == 'pagadas') {
        return state.facturas.filter(factura => {
          if (factura.estaPagada == true && state.filtro.nombre == 'pagadas') {
            return true;
          }
        })
        /**
         * Filtro para traer facturas por estado: por cobrar.
         */
      } else if (state.filtro.tipo == 'estados' && state.filtro.nombre == 'por cobrar') {
        return state.facturas.filter(factura => {
          if (factura.estaPagada == false && state.filtro.nombre == 'por cobrar' && (new Date(factura.fechaVencimiento).getTime() > new Date().getTime())) {
            return true;
          }
        })
        /**
         * Filtro para traer facturas por rango de fechas.
         */
      } else if (state.filtro.tipo == 'fechas') {
        var desde = document.getElementById('desde').value;
        var hasta = document.getElementById('hasta').value;
        return state.facturas.filter(factura => {
          if (new Date(factura.fechaFactura).getTime() >=
            new Date(desde).getTime() &&
            new Date(factura.fechaFactura).getTime() <= new Date(hasta).getTime()) {
            return true;
          }
        })
      }
      return state.facturas;
    },
    /**
     * Método para obtener un cliente por su ID.
     * @param {estado} state 
     */
    getClientePorId: function (state) {
      return (id) => {
        return state.clientes.filter(cliente => {
          if (cliente.idCliente == id) {
            return true;
          }
        })
      }
    },
    /**
     * Método para obtener una lista de ID de facturas.
     * @param {estado} state
     */
    getListaIdFacturas: function (state) {
      return state.listaIdFacturas;
    },
  }
})
