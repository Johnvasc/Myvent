import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Signin from '../views/Signin.vue'
import Signup from '../views/Signup.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/signup',
      name: 'signup',
      component: Signup
    },
    {
      path: '/signin',
      name: 'signin',
      component: Signin
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('../views/Admin.vue')
    },
    {
      path: '/eventcreate',
      name: 'eventcreate',
      component: () => import('../views/EventCreate.vue')
    },
    {
      // :id permite URLs dinâmicas como /event/1, /event/2, etc.
      path: '/event/:id',
      name: 'event-details',
      component: () => import('../views/Event.vue')
    }
  ]
})

export default router