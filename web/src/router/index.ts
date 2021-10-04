import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { routes as dashboardRoutes } from '@/apps/dashboard'
import { routes as passportRoutes } from '@/apps/passport'
import { routes as storefrontRoutes } from '@/apps/storefront'
import { userStore } from '@/stores/user'

const routes: RouteRecordRaw[] = [
  ...dashboardRoutes,
  ...passportRoutes,
  ...storefrontRoutes,
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

  if (
    !to.matched.some((record) => record.meta.public) &&
    !userStore.state.authorized
  ) {
    return next('/login')
  }

  next()
})
