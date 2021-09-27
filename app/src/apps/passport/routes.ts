import { RouteRecordRaw } from 'vue-router'

export const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'login',
    component: () => import('./views/Login.vue'),
    meta: {
      public: true,
    },
  },
  {
    path: '/new-password',
    name: 'new-password',
    component: () => import('./views/NewPassword.vue'),
    meta: {
      public: false,
    },
  },
]
