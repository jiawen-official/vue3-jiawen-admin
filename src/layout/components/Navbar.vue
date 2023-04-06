<template>
  <div class="navbar">
    <div class="logo">
      <img src="@/assets/logo.png" />
      <span>后台管理系统</span>
    </div>
    <div class="right-menu">
      <el-dropdown
        class="avatar-container right-menu-item hover-effect"
        trigger="click"
      >
        <div class="avatar-wrapper">
          <img :src="avatar" class="user-avatar" />
          <CaretBottom
            style="width: 0.6em; height: 0.6em; margin-left: 5px; color: #fff"
          />
        </div>

        <template #dropdown>
          <el-dropdown-menu>
            <router-link to="/">
              <el-dropdown-item>{{ $t('navbar.dashboard') }}</el-dropdown-item>
            </router-link>
            <el-dropdown-item @click="logout">
              {{ $t('navbar.logout') }}
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { ElMessageBox } from 'element-plus';
import { useI18n } from 'vue-i18n';
import { localStorage } from '@/utils/storage';
import { resetRouter } from '@/router/index';

import useStore from '@/store';

// 图标依赖
import { CaretBottom } from '@element-plus/icons-vue';

const { user, tagsView, permission } = useStore();
const router = useRouter();
const avatar = computed(() => user.avatar);
const { t } = useI18n();

function logout() {
  ElMessageBox.confirm(t('navbar.logoutTips'), t('navbar.title'), {
    confirmButtonText: t('navbar.btnConfirm'),
    cancelButtonText: t('navbar.btnCancel'),
    type: 'warning'
  }).then(() => {
    user
      .logout()
      .then(() => {
        tagsView.delAllViews();
        resetRouter();
        permission.resetRoutes();
      })
      .then(() => {
        // ?redirect=${route.fullPath}
        router.push(`/login`);
      });

    // (demo)
    // localStorage.remove('token');
    // localStorage.remove('user_avatar');
    // user.resetToken()
    // router.push(`/login`);
  });
}
</script>

<style lang="scss" scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.navbar {
  height: 60px;
  overflow: hidden;
  position: relative;
  background: #00488a;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .logo {
    height: 60px;
    display: inline-flex;
    align-items: center;
    padding-left: 40px;

    img {
      width: 40px;
      height: 40px;
      margin-right: 24px;
    }

    span {
      font-family: YouSheBiaoTiHei;
      font-size: 32px;
      color: #ffffff;
    }
  }

  .hamburger-container {
    line-height: 56px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 60px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 10px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
