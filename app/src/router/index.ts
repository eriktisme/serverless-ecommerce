import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { routes as dashboardRoutes } from '@/apps/dashboard'
import { routes as passportRoutes } from '@/apps/passport'
import { routes as productsRoutes } from '@/apps/products'
import { userStore } from '@/stores/user'

const routes: RouteRecordRaw[] = [
  ...dashboardRoutes,
  ...passportRoutes,
  ...productsRoutes,
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach(async (to, _, next) => {
  // Exception to enforce new users created through AWS Cognito to be able to set a new secure password
  if (to.path === '/new-password' && userStore.state.user !== null) {
    return next()
  }

  await userStore.dispatch('fetchUser')

  // Path / and logged in
  if (to.path === '/' && userStore.state.authorized) {
    return next('/dashboard')
  }
  // Path / and not logged in
  if (to.path === '/' && !userStore.state.authorized) {
    return next('/login')
  }

  const hasPublicMeta = Object.prototype.hasOwnProperty.call(to.meta, 'public')

  // No public meta set and authorized let it go through
  if (!hasPublicMeta && userStore.state.authorized) {
    return next()
  }

  // No public meta set and not authorized redirect
  if (!hasPublicMeta && !userStore.state.authorized) {
    return next('/login')
  }

  next()
})
