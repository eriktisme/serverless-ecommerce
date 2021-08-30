import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { routes as dashboardRoutes } from '@/apps/dashboard'
import { routes as passportRoutes } from '@/apps/passport'
import { userStore } from '@/stores/user'

const routes: RouteRecordRaw[] = [...dashboardRoutes, ...passportRoutes]

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

  if (
    !to.matched.some((record) => record.meta.public) &&
    !userStore.state.authorized
  ) {
    return next('/login')
  }

  if (
    to.matched.some((record) => record.meta.public && record.name !== 'home') &&
    userStore.state.authorized
  ) {
    return next({
      name: 'dashboard',
    })
  }

  next()
})
