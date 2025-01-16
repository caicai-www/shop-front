<template>
  <v-app-bar>
    <v-container class="d-flex align-center">
      <v-btn to="/" :active="false">購物網站</v-btn>
      <v-spacer />

      <template v-for="nav of navs" :key="nav.to">
        <v-btn v-if="nav.show" :to="nav.to" :prepend-icon="nav.icon"
          >{{ nav.text }}
          <!-- 購物車數量 -->
          <!-- https://vuetifyjs.com/en/components/badges/#content -->
          <v-badge v-if="nav.to === '/cart'" :content="user.cart" floating color="red"></v-badge>
        </v-btn>
      </template>
      <v-btn v-if="user.isLoggedIn" prepend-icon="mdi-account-arrow-right" @click="logout">{{
        $t('nav.logout')
      }}</v-btn>
      <v-menu>
        <!-- activator=>是一個按鈕 -->
        <template #activator="{ props }">
          <v-btn v-bind="props">
            <v-icon icon="mdi-translate"></v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item v-for="lang in langs" :key="lang.value" @click="$i18n.locale = lang.value">
            {{ lang.text }}
          </v-list-item>
        </v-list>
      </v-menu>
    </v-container>
  </v-app-bar>
  <v-main>
    <router-view></router-view>
  </v-main>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useUserStore } from '@/stores/user'
import { useAxios } from '@/composable/axios'
import { useSnackbar } from 'vuetify-use-dialog'
import { useRouter } from 'vue-router'

const { t } = useI18n()
const user = useUserStore()
const { apiAuth } = useAxios()
const createSnackbar = useSnackbar()

const router = useRouter()

// 導覽列項目
const navs = computed(() => {
  return [
    //                         ↓zhHant的nav
    { to: '/register', text: t('nav.register'), icon: 'mdi-account-plus', show: !user.isLoggedIn },
    { to: '/login', text: t('nav.login'), icon: 'mdi-account-arrow-left', show: !user.isLoggedIn },
    { to: '/cart', text: t('nav.cart'), icon: 'mdi-cart', show: user.isLoggedIn },
    {
      to: '/orders',
      text: t('nav.orders'),
      icon: 'mdi-format-list-bulleted',
      show: user.isLoggedIn,
    },
    { to: '/admin', text: t('nav.admin'), icon: 'mdi-cog', show: user.isLoggedIn && user.isAdmin },
  ]
})

const langs = [
  { text: '繁體中文', value: 'zhHant' },
  { text: 'English', value: 'en' },
  { text: '日本語', value: 'jp' },
]

// 登出後f12裡面的token、pinia的token會清空  資料庫token也會刪掉
const logout = async () => {
  try {
    await apiAuth.delete('/user/logout')
  } catch (error) {
    console.log(error)
  }
  user.logout()
  createSnackbar({
    text: t('logout.success'),
    snackbarProps: {
      color: 'green',
    },
  })
  router.push('/')
}
</script>
