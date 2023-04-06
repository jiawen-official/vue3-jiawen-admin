<template>
  <div>
    <jw-svg-icon
      :icon-class="isFullscreen ? 'exit-fullscreen' : 'fullscreen'"
      @click="toggle"
    />
  </div>
</template>

<script lang="ts">
export default {
  name: 'JwScreenfull'
};
</script>

<script setup lang="ts">
import { useFullscreen } from '@vueuse/core';
import jwSvgIcon from '@/components/views/jw-svg-icon/jw-svg-icon.vue';

const { isFullscreen, toggle } = useFullscreen();
</script>
