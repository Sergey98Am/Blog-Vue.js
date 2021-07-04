import Vue from 'vue'
import App from './App'
import router from './router'
import 'bootstrap/dist/css/bootstrap.css'
import VeeValidate from 'vee-validate'
import store from './store/user'
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

Vue.config.productionTip = false

// eslint-disable-next-line no-new
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
