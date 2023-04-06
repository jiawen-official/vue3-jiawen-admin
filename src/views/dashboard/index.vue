<script lang="ts">
export default { name: 'Dashboard' };
</script>

<script setup lang="ts">
// ref,
import { reactive, toRefs, watch } from 'vue';
// 组件引用

import jwWangEditor from '@/components/views/jw-wang-editor/jw-wang-editor.vue';
const state = reactive({
  html: ''
});
const { html } = toRefs(state);
watch(
  () => html.value,
  val => {
    console.log(val);
  }
);

</script>

<template>
  <div class="dashboard-container">
    <!--富文本编辑器-->
    <div class="jw-editor__box">
      <jw-wang-editor v-model="html"></jw-wang-editor>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.dashboard-container {
  padding: 24px;
  background-color: #f4f9fd;
  position: relative;

  .chart-container {
    background: #ffffff;
  }

  .jw-editor__box {
    padding-top: 40px;

    .w-e-full-screen-container {
      z-index: 2000;
    }

  }
}
</style>
