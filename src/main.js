import Vue from 'vue'
import App from './layouts/app/App'
import router from './router'
import 'bootstrap/dist/css/bootstrap.css'
import VeeValidate from 'vee-validate'
import store from './store'
import Paginate from 'vuejs-paginate'
import {library} from '@fortawesome/fontawesome-svg-core'
import {fas} from '@fortawesome/free-solid-svg-icons'
import {faFontAwesome} from '@fortawesome/free-brands-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'
import VueRecaptcha from 'vue-recaptcha'
import Multiselect from 'vue-multiselect'
import VueSpinners from 'vue-spinners'
import {abilitiesPlugin} from '@casl/vue'
import ability from '../config/ability'
import Echo from 'laravel-echo'

Vue.component('pagination', require('laravel-vue-pagination'))
Vue.use(VeeValidate, {
  events: ''
})
Vue.use(VueSpinners)
Vue.component('paginate', Paginate)
Vue.component('multiselect', Multiselect)
library.add(fas, faFontAwesome)
Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.component('vue-recaptcha', VueRecaptcha)
Vue.use(abilitiesPlugin, ability)

window.Pusher = require('pusher-js')

window.Echo = new Echo({
  broadcaster: 'pusher',
  key: 'f7df117a7f335706d8de',
  cluster: 'mt1',
  forceTLS: true,
  authEndpoint: 'http://blog.loc/broadcasting/auth',
  auth: {
    headers: {
      Authorization: store.getters.get_token ? store.getters.get_token : null
    }
  }
})

Vue.config.productionTip = false

// eslint-disable-next-line no-new
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
