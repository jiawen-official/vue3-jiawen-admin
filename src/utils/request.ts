import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { ElMessage, ElMessageBox } from 'element-plus';
import { localStorage } from '@/utils/storage';
import useStore from '@/store';
//vue3中useRouter要放在setup中引入，封装axios的ts文件中不能直接引入
// import { useRouter } from 'vue-router';
// const router = useRouter();
import router from '@/router';

// 创建 axios 实例
const service = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 50000
  // headers: { 'Content-Type': 'application/json;charset=utf-8' }
});

// 请求拦截器
service.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    if (!config.headers) {
      throw new Error(
        `Expected 'config' and 'config.headers' not to be undefined`
      );
    }
    const { user } = useStore();
    config.headers.Psn = '2CNW2gmZrsnCTtja29XvIFdN';
    if (user.token) {
      config.headers.Authorization = `${localStorage.get('token')}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use(
  (response: AxiosResponse) => {
    const { code, msg } = response.data;
    if (code === '00000') {
      return response.data;
    } else {
      // 响应数据为二进制流处理(Excel导出)
      if (response.data instanceof ArrayBuffer) {
        return response;
      }

      ElMessage({
        message: msg || '系统出错',
        type: 'error'
      });
      return Promise.reject(new Error(msg || 'Error'));
    }
  },
  error => {
    let msg;
    if (error && error.response && error.response.data) {
      const code = error.response.data.code;
      msg = error.response.data.msg;
      if (code === 401) {
        // token 过期
        localStorage.clear(); // 清除浏览器全部缓存
        router.push('/login');
        ElMessageBox.alert('登录信息已失效，请重新登录', '提示', {});
      } else {
        ElMessage({
          message: msg || '系统出错',
          type: 'error'
        });
      }
    } else {
      msg = error;
      ElMessage({
        message: error || '系统出错',
        type: 'error'
      });
    }
    return Promise.reject(new Error(msg || 'Error'));
  }
);

// 导出 axios 实例
export default service;
