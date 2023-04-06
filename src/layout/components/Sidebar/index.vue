<template>
  <div class="jw-el__scrollbar">
    <el-scrollbar style="height: calc(100vh - 120px)">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :unique-opened="false"
        :collapse-transition="false"
        mode="vertical"
      >
        <sidebar-item
          v-for="route in routes"
          :item="route"
          :key="route.path"
          :base-path="route.path"
          :is-collapse="isCollapse"
        />
      </el-menu>
      <!-- jw-hamburger
        id="hamburger-container"
        :is-active="sidebar.opened"
        class="hamburger-container"
        @toggleClick="toggleSideBar"
      /> -->
    </el-scrollbar>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';

import SidebarItem from './SidebarItem.vue';
// import jwHamburger from '@/components/views/jw-hamburger/jw-hamburger.vue';
import useStore from '@/store';

const { permission, app } = useStore();

const route = useRoute();
const routes = computed(() => permission.routes);
const isCollapse = computed(() => !app.sidebar.opened);
// const sidebar = computed(() => app.sidebar);

const activeMenu = computed(() => {
  const { meta, path } = route;
  // if set path, the sidebar will highlight the path you set
  if (meta.activeMenu) {
    return meta.activeMenu as string;
  }
  return path;
});
// function toggleSideBar() {
//   app.toggleSidebar();
// }
</script>
<style scoped>
.jw-el__scrollbar {
  height: 100%;
  padding-top: 60px;
}
</style>
