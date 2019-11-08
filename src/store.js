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
    },
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
    SET_LISTA_ID_FACTURAS(state, lista) {
      state.listaIdFacturas = lista;
    },
    /**
     * Mutación para limpiar la lista de ID de facturas.
     * @param {estado} state 
     * @param {List} lista 
     */
    SET_LISTA_LIMPIA(state, lista) {
      state.listaIdFacturas = lista;
    },
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
          datos,
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
      alert(idCliente)
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
    /**
     * Función asincrónica para marcar una factura como pagada.
     * @param {store} context 
     */
    pagarFacturas: async function (context) {
      if (context.getters.getListaIdFacturas.length > 0) {
        axios
          .put(
            `http://localhost:7070/marcar-como-pagada/${context.getters.getListaIdFacturas}`,
            null,
            {
              headers: {
                Authorization: "Bearer " + context.getters.getToken
              }
            }
          )
          .then(() => {
            let lista = [];
            context.commit('SET_LISTA_LIMPIA', lista);
            context.dispatch('cargarFacturas');
            context.dispatch('actualizarContador', 2);
          })
          .catch((error) => {
            alert(error.response.data.message);
          });
      }
    },
    /**
     * Función asincrónica para borrar una o varias facturas.
     * @param {store} context 
     */
    borrarFacturas: async function (context) {
      if (context.getters.getListaIdFacturas.length > 0) {
        axios
          .delete(
            `http://localhost:7070/eliminar-factura/${context.getters.getListaIdFacturas}`,
            {
              headers: {
                Authorization: "Bearer " + context.getters.getToken
              }
            }
          )
          .then(() => {
            let lista = [];
            context.commit('SET_LISTA_LIMPIA', lista);
            context.dispatch('cargarFacturas');
            context.dispatch('actualizarContador', 2);
          });
      }
    },
    /**
     * Función asincrónica para agregar una factura.
     * @param {store} context 
     * @param {Objeto factura} datos 
     */
    agregarFactura: async function (context, datos) {
      axios
        .post(
          `http://localhost:7070/crear-factura/${context.getters.getIdUsuario}`,
          {
            factura: datos.factura,
            detalles: datos.detalles
          },
          {
            params: {
              idCliente: datos.idCliente
            },

            headers: {
              Authorization: "Bearer " + context.getters.getToken
            }
          },
        )
        .then(() => {
          context.dispatch('cargarFacturas');
          // context.dispatch('actualizarContador', 2);
        })
        .catch(error => {
          alert(error.response.data.message);
        });
    },
    /**
     * Función asincrónica para actualizar los datos de una factura.
     * @param {store} context 
     * @param {Objeto datos} datos 
     */
    actualizarFactura: async function (context, datos) {
      axios
        .put(
          `http://localhost:7070/actualizar-factura/${datos.idFactura}`,
          {
            factura: datos.factura,
            detalles: datos.detalles
          },
          {
            params: {
              idCliente: datos.idCliente
            },
            headers: {
              Authorization: "Bearer " + context.getters.getToken
            }
          },
        )
        .then(() => {
          context.dispatch('cargarFacturas');
          context.dispatch('actualizarContador', 2);
        })
        .catch(error => {
          alert(error.response.data.message);
        });
    },
    /**
     * Función asincrónica para actualizar los datos del usuario.
     * @param {store} context
     * @param {Objeto} datos
     */
    actualizarDatosUsuario: async function (context, datos) {
      axios.
        put(`http://localhost:7070/actualizar-datos/${context.getters.getIdUsuario}`, datos, {
          headers: {
            Authorization: "Bearer " + context.getters.getToken
          }
        })
        .then(() => {
          alert("Modificado con éxtio")
          context.dispatch('traerDatosUsuario');
        })
    },
  },
  /**
   * GETTERS
   */
  getters: {
    /**
     * Método para obtener el id.
     * @param {estado} state
     * @return Number
     */
    getIdUsuario: function (state) {
      return state.id;
    },
    /**
     * Función para obtener el token de autenticación de un usuario.
     * @param {estado} state 
     * @return String
     */
    getToken: function (state) {
      return state.token;
    },
    /**
     * Método para saber si el usuario está autenticado.
     * @param {estado} state
     * @return Boolean
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
     * @return Array
     */
    getClientes: function (state) {
      return state.clientes;
    },
    /**
     * Método para traer el contador.
     * @param {estado} state
     * @return Number
     */
    getContador: function (state) {
      return state.contador;
    },
    /**
     * Método para traer los datos del usuario.
     * @param {estado} state
     * @return Object
     */
    getDatosUsuario: function (state) {
      return state.datosUsuario;
    },
    /**
     * Función para traer las facturas con o sin filtros.
     * @param {estado} state
     * @return Array
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
     * @return Array
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
     * @return Array
     */
    getListaIdFacturas: function (state) {
      return state.listaIdFacturas;
    },
    /**
     * Método para obtener la suma del monto de todas las facturas.
     * @param {estado} state 
     * @return Number
     */
    getTotal: function (state) {
      var total = 0;
      state.facturas.forEach(factura => {
        total += Number(factura.total)
      });
      return total;
    },
    /**
     * Método para optener la suma de los montos de todas las facturas por cobrar.
     * @param {estado} state
     * @return Number
     */
    getPorCobrar: function (state) {
      var porCobrar = 0;
      state.facturas.forEach(factura => {
        if (factura.estaPagada == false) {
          porCobrar += Number(factura.total);
        }
      });
      return porCobrar;
    },
    /**
     * Método para obtener la suma de todas las facturas que estén vencidas.
     * @param {estado} state
     * @return Number
     */
    getVencidas: function (state) {
      var vencidas = 0;
      state.facturas.forEach(factura => {
        if (
          new Date(factura.fechaVencimiento).getTime() < new Date().getTime() &&
          factura.estaPagada == false
        ) {
          vencidas += Number(factura.total);
        }
      });
      return vencidas;
    },
    /**
     * Método para obtener la suma de todas las facturas que ya han sido pagadas.
     * @param {estado} state
     * @return Number
     */
    getPagadas: function (state) {
      var pagadas = 0;
      state.facturas.forEach(factura => {
        if (factura.estaPagada == true) {
          pagadas += Number(factura.total);
        }
      });
      return pagadas;
    },
    /**
     * Método para obtener el mejor cliente.
     * @param {estado} state
     * @return String
     */
    getMejorCliente: function (state) {
      var clientesArray = [];
      var nombreClientevar;
      state.clientes.forEach(cliente => {
        console.log(cliente);
        var totalcliente = 0;
        state.facturas.forEach(factura => {
          if (factura.idCliente==cliente.idCliente) {
            totalcliente += Number(factura.total);
            clientesArray.push(cliente.idCliente, totalcliente)
          } 
        });
      })
      var max = clientesArray[0];
      var maxIndex = 0;
      for (var i = 1; i < clientesArray.length; i++) {
          if (clientesArray[i] > max) {
              maxIndex = i;
              max = clientesArray[i];
          }
      }
      state.clientes.forEach(cliente => {
        if (cliente.idCliente == clientesArray[(maxIndex -1)]){
          nombreClientevar = cliente.nombreCliente
        }
      })
      return nombreClientevar;
    },
    /**
     * Método para obtener el mejor pago del cliente.
     * @param {estado} state
     * @return String
     */
    getMejorPagoDeCliente: function (state) {
      var clientesArray = [];
      state.clientes.forEach(cliente => {
        var totalcliente = 0;
        state.facturas.forEach(factura => {
          if (factura.idCliente==cliente.idCliente) {
            totalcliente += Number(factura.total);
            clientesArray.push(cliente.idCliente, totalcliente)
          } 
        });
      })
      console.log(clientesArray);
      var max = clientesArray[0];
      for (var i = 1; i < clientesArray.length; i++) {
          if (clientesArray[i] > max) {
              max = clientesArray[i];
          }
      }
      return max;
    },
    /**
     * Método para obtener el mejor pago.
     * @param {estado} state
     * @return String
     */
    getMejorPagoTotal: function (state) {
      var max = 0;
      state.facturas.forEach(factura => {
            if (factura.total > max) {
              max = factura.total;
          } 
      })
      return max;
    },
    /**
     * Método para obtener el mejor cliente.
     * @param {estado} state
     * @return String
     */
    getMejorPagoCliente: function (state) {
      var max = 0;
      var clientevar;
      var nombreClientevar;
      state.facturas.forEach(factura => {
            if (factura.total > max) {
              max = factura.total;
              clientevar = factura.idCliente;
          } 
      })
      state.clientes.forEach(cliente => {
        if (cliente.idCliente == clientevar){
          nombreClientevar = cliente.nombreCliente
        }
      })
      return nombreClientevar;
    },
    /**
     * Método para obtener el peor pago.
     * @param {estado} state
     * @return String
     */
    getPeorPagoTotal: function (state) {
      var min = 0;
      state.facturas.forEach(factura => {
          if (min == 0){
            min = factura.total;
          }
          if (factura.total < min) {
              min = factura.total;
          } 
      })
      return min;
    },
    /**
     * Método para obtener el peor cliente.
     * @param {estado} state
     * @return String
     */
    getPeorPagoCliente: function (state) {
      var min = 0;
      var clientevar;
      var nombreClientevar;
      state.facturas.forEach(factura => {
        if (min == 0){
          min = factura.total;
          clientevar = factura.idCliente;
        }

        if (factura.total < min) {
          min = factura.total;
          clientevar = factura.idCliente;
        } 
      })
      state.clientes.forEach(cliente => {
        if (cliente.idCliente == clientevar){
          nombreClientevar = cliente.nombreCliente
        }
      })
      return nombreClientevar;
    },
    /**
     * Método para obtener la factura promedio.
     * @param {estado} state
     * @return String
     */
    getFacturaPromedio: function (state) {
      var total = 0;
      var largo = 0;
      state.facturas.forEach(factura => {
        total += Number(factura.total)
        largo +=1;
      });
      var avg = total/largo;
      return avg;
    },
    /**
     * Método para obtener el promedio de enero.
     * @param {estado} state
     * @return String
     */
    getPromedioEnero: function (state) {
      var total = 0;
      var largo = 0;
      state.facturas.forEach(factura => {
        var variable = new Date(factura.fechaFactura)
        if(variable.getMonth() == 0) {
          total += Number(factura.total)
          largo +=1;
        }
      })
      var avg = total/largo;
      return avg;
    },
    /**
     * Método para obtener el promedio de febrero.
     * @param {estado} state
     * @return String
     */
    getPromedioFebrero: function (state) {
      var total = 0;
      var largo = 0;
      state.facturas.forEach(factura => {
        var variable = new Date(factura.fechaFactura)
        if(variable.getMonth() == 1) {
          total += Number(factura.total)
          largo +=1;
        }
      })
      var avg = total/largo;
      return avg;
    },
    /**
     * Método para obtener el promedio de marzo.
     * @param {estado} state
     * @return String
     */
    getPromedioMarzo: function (state) {
      var total = 0;
      var largo = 0;
      state.facturas.forEach(factura => {
        var variable = new Date(factura.fechaFactura)
        if(variable.getMonth() == 2) {
          total += Number(factura.total)
          largo +=1;
        }
      })
      var avg = total/largo;
      return avg;
    },
    /**
     * Método para obtener el promedio de abril.
     * @param {estado} state
     * @return String
     */
    getPromedioAbril: function (state) {
      var total = 0;
      var largo = 0;
      state.facturas.forEach(factura => {
        var variable = new Date(factura.fechaFactura)
        if(variable.getMonth() == 3) {
          total += Number(factura.total)
          largo +=1;
        }
      })
      var avg = total/largo;
      return avg;
    },
    /**
     * Método para obtener el promedio de mayo.
     * @param {estado} state
     * @return String
     */
    getPromedioMayo: function (state) {
      var total = 0;
      var largo = 0;
      state.facturas.forEach(factura => {
        var variable = new Date(factura.fechaFactura)
        if(variable.getMonth() == 4) {
          total += Number(factura.total)
          largo +=1;
        }
      })
      var avg = total/largo;
      return avg;
    },
    /**
     * Método para obtener el promedio de junio.
     * @param {estado} state
     * @return String
     */
    getPromedioJunio: function (state) {
      var total = 0;
      var largo = 0;
      state.facturas.forEach(factura => {
        var variable = new Date(factura.fechaFactura)
        if(variable.getMonth() == 5) {
          total += Number(factura.total)
          largo +=1;
        }
      })
      var avg = total/largo;
      return avg;
    },
    /**
     * Método para obtener el promedio de julio.
     * @param {estado} state
     * @return String
     */
    getPromedioJulio: function (state) {
      var total = 0;
      var largo = 0;
      state.facturas.forEach(factura => {
        var variable = new Date(factura.fechaFactura)
        if(variable.getMonth() == 6) {
          total += Number(factura.total)
          largo +=1;
        }
      })
      var avg = total/largo;
      return avg;
    },
    /**
     * Método para obtener el promedio de agosto.
     * @param {estado} state
     * @return String
     */
    getPromedioAgosto: function (state) {
      var total = 0;
      var largo = 0;
      state.facturas.forEach(factura => {
        var variable = new Date(factura.fechaFactura)
        if(variable.getMonth() == 7) {
          total += Number(factura.total)
          largo +=1;
        }
      })
      var avg = total/largo;
      return avg;
    },
    /**
     * Método para obtener el promedio de septiembre.
     * @param {estado} state
     * @return String
     */
    getPromedioSeptiembre: function (state) {
      var total = 0;
      var largo = 0;
      state.facturas.forEach(factura => {
        var variable = new Date(factura.fechaFactura)
        if(variable.getMonth() == 8) {
          total += Number(factura.total)
          largo +=1;
        }
      })
      var avg = total/largo;
      return avg;
    },
    /**
     * Método para obtener el promedio de octubre.
     * @param {estado} state
     * @return String
     */
    getPromedioOctubre: function (state) {
      var total = 0;
      var largo = 0;
      state.facturas.forEach(factura => {
        var variable = new Date(factura.fechaFactura)
        if(variable.getMonth() == 9) {
          total += Number(factura.total)
          largo +=1;
        }
      })
      var avg = total/largo;
      return avg;
    },
    /**
     * Método para obtener el promedio de noviembre.
     * @param {estado} state
     * @return String
     */
    getPromedioNoviembre: function (state) {
      var total = 0;
      var largo = 0;
      state.facturas.forEach(factura => {
        var variable = new Date(factura.fechaFactura)
        if(variable.getMonth() == 10) {
          total += Number(factura.total)
          largo +=1;
        }
      })
      var avg = total/largo;
      return avg;
    },
    /**
     * Método para obtener el promedio de diciembre.
     * @param {estado} state
     * @return String
     */
    getPromedioDiciembre: function (state) {
      var total = 0;
      var largo = 0;
      state.facturas.forEach(factura => {
        var variable = new Date(factura.fechaFactura)
        if(variable.getMonth() == 11) {
          total += Number(factura.total)
          largo +=1;
        }
      })
      var avg = total/largo;
      return avg;
    },
    /**
     * Método para obtener el total de enero.
     * @param {estado} state
     * @return String
     */
    getTotalEnero: function (state) {
      var total = 0;
      state.facturas.forEach(factura => {
        var variable = new Date(factura.fechaFactura)
        if(variable.getMonth() == 0) {
          total += Number(factura.total)
        }
      })
      return total;
    },
    /**
     * Método para obtener el total de febrero.
     * @param {estado} state
     * @return String
     */
    getTotalFebrero: function (state) {
      var total = 0;
      state.facturas.forEach(factura => {
        var variable = new Date(factura.fechaFactura)
        if(variable.getMonth() == 1) {
          total += Number(factura.total)
        }
      })
      return total;
    },
    /**
     * Método para obtener el total de marzo.
     * @param {estado} state
     * @return String
     */
    getTotalMarzo: function (state) {
      var total = 0;
      state.facturas.forEach(factura => {
        var variable = new Date(factura.fechaFactura)
        if(variable.getMonth() == 2) {
          total += Number(factura.total)
        }
      })
      return total;
    },
    /**
     * Método para obtener el total de abril.
     * @param {estado} state
     * @return String
     */
    getTotalAbril: function (state) {
      var total = 0;
      state.facturas.forEach(factura => {
        var variable = new Date(factura.fechaFactura)
        if(variable.getMonth() == 3) {
          total += Number(factura.total)
        }
      })
      return total;
    },
    /**
     * Método para obtener el total de mayo.
     * @param {estado} state
     * @return String
     */
    getTotalMayo: function (state) {
      var total = 0;
      state.facturas.forEach(factura => {
        var variable = new Date(factura.fechaFactura)
        if(variable.getMonth() == 4) {
          total += Number(factura.total)
        }
      })
      return total;
    },
    /**
     * Método para obtener el total de junio.
     * @param {estado} state
     * @return String
     */
    getTotalJunio: function (state) {
      var total = 0;
      state.facturas.forEach(factura => {
        var variable = new Date(factura.fechaFactura)
        if(variable.getMonth() == 5) {
          total += Number(factura.total)
        }
      })
      return total;
    },
    /**
     * Método para obtener el total de julio.
     * @param {estado} state
     * @return String
     */
    getTotalJulio: function (state) {
      var total = 0;
      state.facturas.forEach(factura => {
        var variable = new Date(factura.fechaFactura)
        if(variable.getMonth() == 6) {
          total += Number(factura.total)
        }
      })
      return total;
    },
    /**
     * Método para obtener el total de agosto.
     * @param {estado} state
     * @return String
     */
    getTotalAgosto: function (state) {
      var total = 0;
      state.facturas.forEach(factura => {
        var variable = new Date(factura.fechaFactura)
        if(variable.getMonth() == 7) {
          total += Number(factura.total)
        }
      })
      return total;
    },
    /**
     * Método para obtener el total de septiembre.
     * @param {estado} state
     * @return String
     */
    getTotalSeptiembre: function (state) {
      var total = 0;
      state.facturas.forEach(factura => {
        var variable = new Date(factura.fechaFactura)
        if(variable.getMonth() == 8) {
          total += Number(factura.total)
        }
      })
      return total;
    },
    /**
     * Método para obtener el total de octubre.
     * @param {estado} state
     * @return String
     */
    getTotalOctubre: function (state) {
      var total = 0;
      state.facturas.forEach(factura => {
        var variable = new Date(factura.fechaFactura)
        if(variable.getMonth() == 9) {
          total += Number(factura.total)
        }
      })
      return total;
    },
    /**
     * Método para obtener el total de noviembre.
     * @param {estado} state
     * @return String
     */
    getTotalNoviembre: function (state) {
      var total = 0;
      state.facturas.forEach(factura => {
        var variable = new Date(factura.fechaFactura)
        if(variable.getMonth() == 10) {
          total += Number(factura.total)
        }
      })
      return total;
    },
    /**
     * Método para obtener el total de diciembre.
     * @param {estado} state
     * @return String
     */
    getTotalDiciembre: function (state) {
      var total = 0;
      state.facturas.forEach(factura => {
        var variable = new Date(factura.fechaFactura)
        if(variable.getMonth() == 11) {
          total += Number(factura.total)
        }
      })
      return total;
    },
  }
})
