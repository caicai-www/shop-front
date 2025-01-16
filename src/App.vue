<template>
  <v-app>
    <!-- 綁定完整路徑, 沒綁定的話在產品頁內會認定在同個元件就不會跳頁 -->
    <router-view :key="$route.fullPath" />
  </v-app>
</template>
