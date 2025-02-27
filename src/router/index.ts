import { createRouter, createWebHistory } from 'vue-router'

import visualView from '@/views/viusalView/visualView.vue'

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
      component: visualView,
      children: [
        {
          path: '/monitor',
          component: () => import('@/views/viusalView/Pages/monitor/deviceMonitorPage.vue'),
        },
        {
          path: '/personal',
          component: () => import('@/views/viusalView/Pages/personal/personalPage.vue'),
        },
        {
          path: '/network',
          component: () => import('@/views/viusalView/Pages/network/networkPage.vue'),
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
