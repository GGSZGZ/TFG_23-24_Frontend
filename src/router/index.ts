import { createRouter, createWebHistory } from 'vue-router'
import {jwtDecode} from 'jwt-decode'
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
      component: ProfileView,
      meta: { requiresAuth: true, requiresRole: 'user' , allowStudios: false }
    },
    {
      path: '/game/:id',
      name: 'game',
      component: GameView
    },
    {
      path: '/admin',
      name: 'admin',
      component: AdminView,
      meta: { requiresAuth: true, requiresRole: 'admin' , allowStudios: false }
    },
    {
      path: '/studio&admin',
      name: 'studio&admin',
      component: StudioAdminView,
      meta: { requiresAuth: true, allowStudios: true, allowUsers: false }
    },
    {
      path: '/cart',
      name: 'cart',
      component: CartView,
      meta: { requiresAuth: true, requiresRole: 'user' , allowStudios: false }
    },
    {
      path: '/payment',
      name: 'payment',
      component: PaymentView,
      meta: { requiresAuth: true, requiresRole: 'user' , allowStudios: false }
    },
    {
      path: '/studio/:id',
      name: 'studio',
      component: StudioView
    },
    {
      path: '/library',
      name: 'library',
      component: LibraryView,
      meta: { requiresAuth: true, requiresRole: 'user' , allowStudios: false }
    },
    {
      path: '/aboutUs',
      name: 'aboutUs',
      component: AboutUsView
    },
  ]
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = checkAuthentication();
  const userRole = getUserRole();
  const isStudioLogged = checkStudioLogged();

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!isAuthenticated) {
      return next({ name: 'login&register' });
    }
  }

  if (to.matched.some(record => record.meta.requiresRole)) {
    if (to.meta.requiresRole !== userRole) {
      return next({ name: 'store' });
    }
  }

  if (to.matched.some(record => record.meta.allowStudios === false)) {
    if (isStudioLogged) {
      return next({ name: 'store' });
    }
  }

  if (to.matched.some(record => record.meta.allowUsers === false)) {
    if (!isStudioLogged) {
      return next({ name: 'store' });
    }
  }

  next();
});

function checkAuthentication() {
  const userToken = localStorage.getItem('jwtToken');
  const studioToken = localStorage.getItem('studioLogged');
  return (userToken && userToken !== 'null') || (studioToken && studioToken !== 'null');
}

function getUserRole() {
  const token = localStorage.getItem('jwtToken');
  if (token) {
    try {
      const decoded = jwtDecode(token);
      return decoded.role;
    } catch (e) {
      console.error("Invalid token", e);
      return null;
    }
  }
  return null;
}

function checkStudioLogged() {
  const studioLogged = localStorage.getItem('studioLogged');
  return studioLogged && studioLogged !== 'null';
}

export default router
