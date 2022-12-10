import { createRouter, createWebHashHistory } from 'vue-router'
import LocalCache from '@/utils/cache'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/login',
      component: () => import('@/views/login/Login.vue')
    },
    {
      path: '/',
      redirect: '/user'
    },
    {
      path: '/',
      component: () => import('@/views/main/Main.vue'),
      children: [
        {
          path: '/user',
          component: () => import('@/views/main-child/user/User.vue')
        },
        {
          path: '/complaint',
          component: () => import('@/views/main-child/complaint/Complaint.vue')
        },
        {
          path: '/repair',
          component: () => import('@/views/main-child/repair/Repair.vue')
        }
      ]
    },
    {
      path: '/:pathMatch(.*)*',
      component: () => import('@/views/not-found/NotFound.vue')
    }
  ]
})

// 前置路由守卫
router.beforeEach((to) => {
  if (to.path !== '/login') {
    const token = LocalCache.getCache('token')
    if (!token) {
      return '/login'
    }
  }
})

export default router
