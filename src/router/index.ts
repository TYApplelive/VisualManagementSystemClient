import { createRouter, createWebHistory } from 'vue-router'

import visualView from '@/views/viusalView/visualView.vue'
import RegisterView from '@/views/AuthView/RegisterView.vue'
import LoginView from '@/views/AuthView/LoginView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/visual' /*测试/visual */,
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('@/views/HomeView.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
    },
    {
      path: '/visual',
      name: 'visual',
      component: visualView,
      children: [
        {
          path: '/monitor',
          component: () => import('@/views/viusalView/Pages/deviceMonitor/deviceMonitor.vue'),
        },
      ],
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
