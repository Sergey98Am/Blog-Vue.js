import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import notifications from './modules/notifications'
import VuexPersistence from 'vuex-persist'

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [new VuexPersistence().plugin],
  modules: {
    user,
    notifications
  }
})
