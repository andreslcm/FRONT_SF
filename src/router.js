import Vue from 'vue'
import VueRouter from 'vue-router'
import LandingPage from './components/LandingPage.vue'
import Logged from './components/Logged.vue'
import Login from './components/Login.vue'
import Registro from './components/Registro.vue'

Vue.use(VueRouter)
/**
 * Router para la navegación de la vista principal de la aplicación.
 */
const routes =[
  {
    path: '/',
    name: 'landing',
    component: LandingPage
  },
  {
    path: '/logged',
    name: 'logged',
    component: Logged
  },
  {
    path: 'login',
    name: 'login',
    component: Login
  },
  {
    path: '/registro',
    name: 'registro',
    component: Registro
  }
]

export const router = new VueRouter ({
  routes,
  mode: 'history'
})