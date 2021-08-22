import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'
import User from '@/layouts/user/user.vue'
import Home from '@/views/Home'
import Register from '@/views/user/auth/register/Register.vue'
import Login from '@/views/user/auth/login/Login.vue'
import Profile from '@/views/user/profile/Profile.vue'
import Posts from '@/views/user/posts/Posts.vue'
import AllPosts from '@/views/user/all-posts/AllPosts.vue'
import Notification from '@/views/user/notifications/Notification.vue'
import Post from '@/views/user/notifications/posts/Post.vue'
import Admin from '@/layouts/admin/Admin.vue'
import AdminHome from '@/views/admin/Home.vue'
import Permissions from '@/views/admin/user-management/permissions/Permissions.vue'
import Roles from '@/views/admin/user-management/roles/Roles.vue'
import Users from '@/views/admin/user-management/users/Users.vue'
import AdminPosts from '@/views/admin/posts/Posts.vue'
import AdminNotification from '@/views/admin/notifications/Notification.vue'
import AdminPost from '@/views/admin/notifications/posts/Post.vue'

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
        },
        {
          path: '/notification',
          name: 'Notification',
          component: Notification,
          meta: {
            auth: true
          },
          children: [
            {
              path: '/notification/notify_id/:notificationId/post_id/:postId',
              name: 'Post',
              component: Post
            }
          ]
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
        },
        {
          path: '/notification',
          name: 'AdminNotification',
          component: AdminNotification,
          children: [
            {
              path: '/notification/notify_id/:notificationId/admin/post_id/:postId',
              name: 'AdminPost',
              component: AdminPost
            }
          ]
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
