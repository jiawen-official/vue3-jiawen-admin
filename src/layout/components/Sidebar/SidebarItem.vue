<template>
  <!-- 侧边栏 -->
  <div v-if="!item.meta || !item.meta.hidden">
    <!-- 菜单 -->
    <template
      v-if="
        hasOneShowingChild(item.children, item) &&
        (!onlyOneChild.children || onlyOneChild.noShowingChildren) &&
        (!item.meta || !item.meta.alwaysShow)
      "
    >
      <app-link v-if="onlyOneChild.meta" :to="resolvePath(onlyOneChild.path)">
        <el-menu-item
          :index="resolvePath(onlyOneChild.path)"
          :class="{ 'submenu-title-noDropdown': !isNest }"
        >
          <jw-svg-icon
            v-if="onlyOneChild.meta && onlyOneChild.meta.icon"
            :icon-class="onlyOneChild.meta.icon"
          />
          <template #title>
            <span class="jw-menu__item">{{
              generateTitle(onlyOneChild.meta.title)
            }}</span>
          </template>
        </el-menu-item>
      </app-link>
    </template>
    <!-- 目录抽屉 -->
    <el-sub-menu v-else :index="resolvePath(item.path)" teleported>
      <template #title>
        <jw-svg-icon
          v-if="item.meta && item.meta.icon"
          :icon-class="item.meta.icon"
        ></jw-svg-icon>
        <span v-if="item.meta && item.meta.title">{{
          generateTitle(item.meta.title)
        }}</span>
      </template>

      <sidebar-item
        v-for="child in item.children"
        :key="child.path"
        :item="child"
        :is-nest="true"
        :base-path="resolvePath(child.path)"
        class="nest-menu"
      />
    </el-sub-menu>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import path from 'path-browserify';
import { isExternal } from '@/utils/validate';
import AppLink from './Link.vue';

import { generateTitle } from '@/utils/i18n';
import jwSvgIcon from '@/components/views/jw-svg-icon/jw-svg-icon.vue';

const props = defineProps({
  item: {
    type: Object,
    required: true
  },
  isNest: {
    type: Boolean,
    required: false
  },
  basePath: {
    type: String,
    required: true
  }
});

const onlyOneChild = ref();

function hasOneShowingChild(children = [] as any, parent: any) {
  if (!children) {
    children = [];
  }
  const showingChildren = children.filter((item: any) => {
    if (item.meta && item.meta.hidden) {
      return false;
    } else {
      // Temp set(will be used if only has one showing child)
      onlyOneChild.value = item;
      return true;
    }
  });

  // When there is only one child router, the child router is displayed by default
  if (showingChildren.length === 1) {
    return true;
  }

  // Show parent if there are no child router to display
  if (showingChildren.length === 0) {
    onlyOneChild.value = { ...parent, path: '', noShowingChildren: true };
    return true;
  }

  return false;
}

function resolvePath(routePath: string) {
  if (isExternal(routePath)) {
    return routePath;
  }
  if (isExternal(props.basePath)) {
    return props.basePath;
  }
  return path.resolve(props.basePath, routePath);
}
</script>

<style lang="scss" scoped></style>
