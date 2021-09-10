import { RouteRecordRaw } from 'vue-router'

export const routes: RouteRecordRaw[] = [
  {
    path: '/products',
    name: 'products',
    component: () => import('./views/Products.vue'),
  },
]
