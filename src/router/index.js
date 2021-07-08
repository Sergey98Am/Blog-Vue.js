import Vue from 'vue'
import Router from 'vue-router'
import store from '../store/user'
import User from '@/layouts/user/user.vue'
import Home from '@/views/Home'
import Register from '@/views/user/auth/register/Register.vue'
import Login from '@/views/user/auth/login/Login.vue'
import Profile from '@/views/user/profile/Profile.vue'
import Posts from '@/views/user/posts/Posts.vue'
import AllPosts from '@/views/user/all-posts/AllPosts.vue'
import Admin from '@/layouts/admin/Admin.vue'
import AdminHome from '@/views/admin/Home.vue'
import Permissions from '@/views/admin/user-management/permissions/Permissions.vue'
import Roles from '@/views/admin/user-management/roles/Roles.vue'
import Users from '@/views/admin/user-management/users/Users.vue'
import AdminPosts from '@/views/admin/posts/Posts.vue'

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
          path: 'login',
          name: 'Login',
          component: Login,
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
        },
        {
          path: 'posts',
          name: 'Posts',
          component: Posts,
          meta: {
            auth: true
          }
        },
        {
          path: 'all-posts',
          name: 'AllPosts',
          component: AllPosts
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
        },
        {
          path: '/admin/permissions',
          name: 'Permissions',
          component: Permissions
        },
        {
          path: '/admin/roles',
          name: 'Roles',
          component: Roles
        },
        {
          path: '/admin/users',
          name: 'Users',
          component: Users
        },
        {
          path: '/admin/posts',
          name: 'AdminPosts',
          component: AdminPosts
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
