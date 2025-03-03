// Importation des dépendances
import { createRouter, createWebHistory } from 'vue-router';
import { setupLayouts } from 'virtual:generated-layouts';
import type { App } from 'vue';
import type { RouteRecordRaw } from 'vue-router/auto';

// Importation des composants de vue
import Login from '@/pages/login.vue';
import Register from '@/pages/register.vue';
import SecondPage from '@/pages/second-page.vue';
import Index from '@/pages/index.vue';

// Fonction pour appliquer les layouts de manière récursive
function recursiveLayouts(route: RouteRecordRaw): RouteRecordRaw {
  if (route.children) {
    route.children = route.children.map(recursiveLayouts);
  }
  return setupLayouts([route])[0];
}

// Création de l'instance du routeur
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to) {
    if (to.hash) {
      return { el: to.hash, behavior: 'smooth', top: 60 };
    }
    return { top: 0 };
  },
  routes: [
    { path: '/',name: 'Home', component: Index , component: Login, meta: { requiresAuth: true } }, 
    { path: '/login', name: 'login', component: Login, meta: { requiresAuth: false } },
    { path: '/register', name: 'register', component: Register, meta: { requiresAuth: false } },
    { path: '/second-page', name: 'second-page', component: SecondPage, meta: { requiresAuth: true } },
  ],
});

// Ajout des guards pour la protection des routes
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token'); // Vérification de l'existence du token d'authentification

  if (!token.isAuthenticated && to.meta.requiresAuth) {
    // Si l'utilisateur n'est pas authentifié et tente d'accéder à une route protégée
    next({ name: 'login' });
  } 
  } else {
    // Sinon, on autorise la navigation
    next();
  }
});

// Fonction d'installation du routeur dans l'application Vue
export default function (app: App) {
  app.use(router);
}

export { router };
