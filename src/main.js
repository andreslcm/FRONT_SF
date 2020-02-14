import Vue from 'vue'
import App from './App.vue'
import { router } from './router'
import { store } from './store'

Vue.config.productionTip = false

Vue.prototype.$block = 'block'
Vue.prototype.$none = 'none'
Vue.prototype.$inline = 'inline'

new Vue({
  render: h => h(App),
  store: store,
  router: router,
}).$mount('#app')
