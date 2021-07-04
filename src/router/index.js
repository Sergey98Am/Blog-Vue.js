import Vue from 'vue'
import Router from 'vue-router'
// import store from '../store/user'
import User from '@/layouts/User.vue'
import Admin from '@/layouts/Admin.vue'
import AdminHome from '@/views/admin/AdminHome.vue'
import Home from '@/views/Home'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '',
      name: 'User',
      component: User,
      children: [
        {
          path: '/',
          name: 'Home',
          component: Home
        }
      ]
    },
    {
      path: '/admin',
      name: 'Admin',
      component: Admin,
      meta: {
        auth: true
      },
      children: [
        {
          path: '/',
          name: 'AdminHome',
          component: AdminHome
        }
      ]
    }
  ]
})

export default router
