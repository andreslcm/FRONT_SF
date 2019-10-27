import Vue from 'vue'
import VueRouter from 'vue-router'
import LandingPage from './components/LandingPage.vue'
import Logged from './components/Logged.vue'
import Login from './components/Login.vue'
import Registro from './components/Registro.vue'
import { store } from './store'

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
    component: Logged,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      requiresVisitor: true
    }
  },
  {
    path: '/registro',
    name: 'registro',
    component: Registro,
    meta: {
      requiresVisitor: true
    }
  }
]

export const router = new VueRouter ({
  routes,
  mode: 'history'
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)){
    if (!store.getters.estaAutenticado){
      next({
        path: '/login'
      })
    } else{
      next()
    }
  } else {
    next()
  }
})