// Composables
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import(/* webpackChunkName: "home" */ '@/views/Home.vue'),
      },
      {
        path: '/Category/:category',
        name: 'Category',
        component: () => import(/* webpackChunkName: "home" */ '@/views/Category.vue'),
      },
      {
        path: '/Recipe/:recipe',
        name: 'Recipe',
        component: () => import(/* webpackChunkName: "home" */ '@/views/Recipe.vue'),
      },
      {
        path: '/Search/:name',
        name: 'Search',
        component: () => import(/* webpackChunkName: "home" */ '@/views/Search.vue'),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
