<template>
  <div class="sidebar-logo-container" :class="{ collapse: collapse }">
    <transition name="sidebarLogoFade">
      <router-link
        v-if="collapse"
        key="collapse"
        class="sidebar-logo-link"
        to="/"
      >
        <img v-if="logo" :src="logo" class="sidebar-logo" />
      </router-link>
      <router-link v-else key="expand" class="sidebar-logo-link" to="/">
        <img v-if="logo2" :src="logo2" class="sidebar-logo2" />
      </router-link>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { reactive, toRefs } from 'vue';

const props = defineProps({
  collapse: {
    type: Boolean,
    required: true
  }
});

const state = reactive({
  isCollapse: props.collapse,
  logo: new URL(`../../../assets/logo.png`, import.meta.url).href,
  logo2: new URL(`../../../assets/logo_3x.png`, import.meta.url).href
});

const { logo, logo2 } = toRefs(state);
</script>

<style lang="scss" scoped>
@import '@/styles/sidebar/variables.module.scss';
.sidebarLogoFade-enter-active {
  transition: opacity 1.5s;
}

.sidebarLogoFade-enter,
.sidebarLogoFade-leave-to {
  opacity: 0;
}

.sidebar-logo-container {
  position: relative;
  width: 100%;
  height: 120px;
  line-height: 120px;
  background: $menuBg;
  text-align: center;
  overflow: hidden;

  & .sidebar-logo-link {
    height: 100%;
    width: 100%;

    & .sidebar-logo {
      width: 32px;
      height: 25px;
      vertical-align: middle;
    }
    & .sidebar-logo2 {
      width: 108px;
      height: 25px;
      vertical-align: middle;
    }
  }

  &.collapse {
    .sidebar-logo {
      margin-right: 0px;
    }
  }
}
</style>
