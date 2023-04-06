<template>
  <div class="login-container">
    <el-form ref="loginFormRef" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on"
      label-position="left">
      <div class="title-container">
        <h3 class="title">{{ $t('login.title') }}</h3>
      </div>

      <el-form-item prop="username">
        <span class="svg-container">
          <jw-svg-icon icon-class="user" />
        </span>
        <el-input ref="username" v-model="loginForm.username" placeholder="请输入账号" name="username" />
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <jw-svg-icon icon-class="password" />
        </span>
        <el-input ref="passwordRef" :key="passwordType" v-model="loginForm.password" :type="passwordType"
          :placeholder="$t('login.password')" name="password" tabindex="2" auto-complete="on" maxlength="20"
          @keyup.enter="handleLogin" />
        <span class="show-pwd" @click="showPwd">
          <jw-svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
        </span>
      </el-form-item>

      <el-button size="default" :loading="loading" type="primary" style="width: 100%; margin-bottom: 30px; height: 42px"
        @click.prevent="handleLogin">{{ $t('login.login') }}
      </el-button>
    </el-form>

    <div v-if="showCopyright == true" class="copyright">
      <p>{{ $t('login.copyright') }}</p>
      <p>{{ $t('login.icp') }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref, toRefs, watch, nextTick } from 'vue';

// 组件依赖
import { ElForm, ElInput } from 'element-plus';
import router from '@/router';
import jwSvgIcon from '@/components/views/jw-svg-icon/jw-svg-icon.vue';

// 状态管理依赖
import useStore from '@/store';

// API依赖
import { useRoute } from 'vue-router';
import { LoginFormData } from '@/types/api/system/login';

const { user } = useStore();
const route = useRoute();

const loginFormRef = ref(ElForm);
const passwordRef = ref(ElInput);
const slideCodeRef = ref();

const state = reactive({
  redirect: '',
  loginForm: {
    username: 'admin',
    password: '123456',
    // code: false
  } as LoginFormData,
  loginRules: {
    username: [{ required: true, trigger: 'blur', message: '请输入账号' }],
    password: [{ required: true, trigger: 'blur', message: '请输入密码' }]
  },
  loading: false,
  passwordType: 'password',
  otherQuery: {},
  clientHeight: document.documentElement.clientHeight,
  showCopyright: true
});

const { loginForm, loginRules, loading, passwordType, showCopyright } =
  toRefs(state);

function showPwd() {
  if (state.passwordType === 'password') {
    state.passwordType = '';
  } else {
    state.passwordType = 'password';
  }
  nextTick(() => {
    passwordRef.value.focus();
  });
}

function handleLogin() {
  loginFormRef.value.validate((valid: boolean) => {
    if (valid) {
      state.loading = true;
      user
        .login(state.loginForm)
        .then(() => {
          router.push({ path: '/', query: state.otherQuery });
          state.loading = false;
        })
        .catch(() => {
          state.loading = false;
          slideCodeRef.value.reset();
        });
    } else {
      return false;
    }
  });
}

watch(
  route,
  () => {
    const query = route.query;
    if (query) {
      state.redirect = query.redirect as string;
      state.otherQuery = getOtherQuery(query);
    }
  },
  {
    immediate: true
  }
);

function getOtherQuery(query: any) {
  return Object.keys(query).reduce((acc: any, cur: any) => {
    if (cur !== 'redirect') {
      acc[cur] = query[cur];
    }
    return acc;
  }, {});
}

onMounted(() => {
  window.onresize = () => {
    if (state.clientHeight > document.documentElement.clientHeight) {
      state.showCopyright = false;
    } else {
      state.showCopyright = true;
    }
  };
});
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #283443;
$light_gray: #fff;
$cursor: #fff;

/* reset element-ui css */
.login-container {
  display: flex;
  align-items: center;
  justify-content: center;

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }

    .set-language {
      color: #fff;
      position: absolute;
      top: 3px;
      font-size: 18px;
      right: 0px;
      cursor: pointer;
    }
  }

  .el-input {
    display: inline-block;
    height: 36px;
    width: 85%;

    .el-input__wrapper {
      width: 100%;
      padding: 0;
      background: transparent;
      box-shadow: none;

      .el-input__inner {
        background: transparent;
        border: 0px;
        -webkit-appearance: none;
        border-radius: 0px;
        color: $light_gray;
        height: 36px;
        caret-color: $cursor;

        &:-webkit-autofill {
          box-shadow: 0 0 0px 1000px $bg inset !important;
          -webkit-text-fill-color: $cursor !important;
        }
      }
    }
  }

  .el-input__inner {
    &:hover {
      border-color: var(--el-input-hover-border, var(--el-border-color-hover));
      box-shadow: none;
    }

    box-shadow: none;
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }

  .copyright {
    width: 100%;
    position: absolute;
    bottom: 0;
    font-size: 12px;
    text-align: center;
    color: #cccccc;
  }
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 50px 35px 30px;
    margin: 0 auto;
    overflow: hidden;
    background-color: rgba($color: #000, $alpha: 0.2);
    border-radius: 8px;
  }

  .svg-container {
    padding: 5px 10px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }

  .captcha {
    position: absolute;
    right: 0;
    top: 0;
    height: 42px;
  }
}
</style>
