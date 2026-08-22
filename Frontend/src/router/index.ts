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
      meta: { requiresMaster: true },
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

router.beforeEach((to) => {
  if (!to.meta.requiresMaster) return true

  const token = localStorage.getItem('accessToken')
  const user = JSON.parse(localStorage.getItem('user') || 'null') as { userType?: number } | null
  if (token && user?.userType === 3) return true

  return { name: 'home' }
})

export default router