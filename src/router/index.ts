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
          path: '/home',
          component: () => import('@/views/main-child/home/Home.vue'),
          meta: { title: ' 后台首页 ' }
        },
        {
          path: '/user',
          component: () => import('@/views/main-child/user/User.vue'),
          meta: { title: ' 用户列表 ' }
        },
        {
          path: '/complaint',
          component: () => import('@/views/main-child/complaint/Complaint.vue'),
          meta: { title: ' 投诉列表 ' }
        },
        {
          path: '/repair',
          component: () => import('@/views/main-child/repair/Repair.vue'),
          meta: { title: ' 报修列表 ' }
        },
        {
          path: '/house',
          component: () => import('@/views/main-child/house/House.vue'),
          meta: { title: ' 房屋列表 ' }
        },
        {
          path: '/car',
          component: () => import('@/views/main-child/car/Car.vue'),
          meta: { title: ' 停车位列表 ' }
        },
        {
          path: '/property',
          component: () => import('@/views/main-child/property/Property.vue'),
          meta: { title: ' 物业费列表 ' }
        },
        {
          path: '/power',
          component: () => import('@/views/main-child/power/Power.vue'),
          meta: { title: ' 物业费列表 ' }
        },
        {
          path: '/information',
          component: () =>
            import('@/views/main-child/information/Information.vue'),
          meta: { title: ' 个人资料 ' }
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
