/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables
import { createRouter, createWebHashHistory, START_LOCATION } from 'vue-router/auto'
import { setupLayouts } from 'virtual:generated-layouts'
import { routes } from 'vue-router/auto-routes'
import { useAxios } from '@/composable/axios'
import { useUserStore } from '@/stores/user'
import i18n from '@/i18n'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: setupLayouts(routes),
})

router.beforeEach(async (to, from, next) => {
  const { apiAuth } = useAxios()
  const user = useUserStore()

  if (from === START_LOCATION && user.isLoggedIn) {
    try {
      const { data } = await apiAuth.get('/user/profile')
      user.login(data.result)
    } catch (error) {
      console.log(error)
      user.logout()
    }
  }

  // 擋路由
  // 如果使用者登入 && 要去登入或註冊頁 就丟回首頁
  if (user.isLoggedIn && ['/login', '/register'].includes(to.path)) {
    next('/')
    // next({ path: '/' })
  } else if (to.meta.login && !user.isLoggedIn) {
    next('/login')
  } else if (to.meta.admin && !user.isAdmin) {
    next('/')
  } else {
    next()
  }
})

// 會變網站標題名字
router.afterEach((to) => {
  document.title = i18n.global.t(to.meta.title) + ' | 購物網站'
})


// Workaround for https://github.com/vitejs/vite/issues/11804
router.onError((err, to) => {
  if (err?.message?.includes?.('Failed to fetch dynamically imported module')) {
    if (!localStorage.getItem('vuetify:dynamic-reload')) {
      console.log('Reloading page to fix dynamic import error')
      localStorage.setItem('vuetify:dynamic-reload', 'true')
      location.assign(to.fullPath)
    } else {
      console.error('Dynamic import error, reloading page did not fix it', err)
    }
  } else {
    console.error(err)
  }
})

router.isReady().then(() => {
  localStorage.removeItem('vuetify:dynamic-reload')
})

export default router
