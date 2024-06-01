import { createRouter, createWebHistory } from 'vue-router'
import StoreView from '../views/StoreView.vue'
import LoginView from '../views/LoginView.vue'
import ProfileView from '../views/ProfileView.vue'
import GameView from '../views/GameView.vue'
import AdminView from '@/views/AdminView.vue'
import StudioAdminView from '@/views/StudioAdminView.vue'
import CartView from '@/views/CartView.vue'
import PaymentView from '@/views/PaymentView.vue'
import StudioView from '@/views/StudioView.vue'
import StudioRegisterView from '@/views/StudioRegisterView.vue'
import LibraryView from '@/views/LibraryView.vue'
import AboutUsView from '@/views/AboutUsView.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'store',
      component: StoreView
    },
    {
      path: '/login&register',
      name: 'login&register',
      component: LoginView
    },
    {
      path: '/studioRegister',
      name: 'studioRegister',
      component: StudioRegisterView
    },
    {
      path: '/profile',
      name: 'profile',
      component: ProfileView
    },
    {
      path: '/game/:id',
      name: 'game',
      component: GameView
    },
    {
      path: '/admin',
      name: 'admin',
      component: AdminView
    },
    {
      path: '/studio&admin',
      name: 'studio&admin',
      component: StudioAdminView
    },
    {
      path: '/cart',
      name: 'cart',
      component: CartView
    },
    {
      path: '/payment',
      name: 'payment',
      component: PaymentView
    },
    {
      path: '/studio/:id',
      name: 'studio',
      component: StudioView
    },
    {
      path: '/library',
      name: 'library',
      component: LibraryView
    },
    {
      path: '/aboutUs',
      name: 'aboutUs',
      component: AboutUsView
    },
  ]
})
export default router
