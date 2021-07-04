import Vue from 'vue'
import Router from 'vue-router'
import store from '../store/user'
import User from '@/layouts/User.vue'
import Home from '@/views/Home'
import Register from '@/views/user/auth/Register.vue'
import Profile from '@/views/user/Profile.vue'
import Admin from '@/layouts/Admin.vue'
import AdminHome from '@/views/admin/AdminHome.vue'

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
        },
        {
          path: 'register',
          name: 'Register',
          component: Register,
          meta: {
            guest: true
          }
        },
        {
          path: 'profile',
          name: 'Profile',
          component: Profile,
          meta: {
            auth: true
          }
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

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.auth)) {
    if (!store.getters.get_loggedIn) {
      next({
        path: '/login'
      })
    } else {
      next()
    }
  } else if (to.matched.some(record => record.meta.guest)) {
    if (!store.getters.get_loggedIn) {
      next()
    } else {
      next({
        path: '/profile'
      })
    }
  } else {
    next()
  }
})

export default router
