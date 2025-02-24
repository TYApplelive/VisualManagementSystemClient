import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/login',
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('@/views/HomeView.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/AuthView/LoginView.vue'),
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('@/views/AuthView/RegisterView.vue'),
    },
    {
      path: '/visual',
      name: 'visual',
      component: () => import('@/views/viusalView/MainView.vue'),
    },
    {
      //其他页面跳转到404
      path: '/:pathMatch(.*)*',
      name: '404',
      component: () => import('@/views/errorView/404View.vue'),
    },
  ],
})

// TODO 路由守卫
// router.beforeEach((to, from, next) => {})

export default router
