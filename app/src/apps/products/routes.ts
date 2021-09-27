import { RouteRecordRaw } from 'vue-router'

export const routes: RouteRecordRaw[] = [
  {
    path: '/products',
    name: 'products',
    component: () => import('./views/Products.vue'),
  },
  {
    path: '/products/create-product',
    name: 'create-product',
    component: () => import('./views/CreateProduct.vue'),
  },
]
