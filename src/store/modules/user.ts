import { defineStore } from 'pinia';
import { LoginFormData } from '@/types/api/system/login';
import { UserState } from '@/types/store/user';

import { localStorage } from '@/utils/storage';
import { login, logout } from '@/api/login';
import { getUserInfo } from '@/api/system/user';
import avatarImg from '@/assets/common/avatar.png';

const useUserStore = defineStore({
  id: 'user',
  state: (): UserState => ({
    token: localStorage.get('token') || '',
    expires: localStorage.get('login_expires') || '',
    id: '',
    name: '',
    avatar: '',
    roles: [],
    perms: []
  }),
  actions: {
    async RESET_STATE() {
      this.$reset();
    },
    /**
     * 登录
     */
    login(loginData: LoginFormData) {
      return new Promise((resolve, reject) => {
        login(loginData)
          .then((response: any) => {
            const { expires, accessToken } = response.data;
            localStorage.set('login_expires', expires || '');
            localStorage.set('token', 'Bearer ' + accessToken);
            this.token = accessToken;
            resolve(accessToken);
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    /**
     *  获取用户信息（昵称、头像、角色集合）
     */
    getUserInfo() {
      return new Promise((resolve, reject) => {
        getUserInfo()
          .then((res: any) => {
            if (!res.data) {
              return reject('Verification failed, please Login again.');
            }
            const { id, name, avatar } = res.data;
            this.id = id;
            this.name = name;
            this.avatar = avatar || avatarImg;
            //角色信息，默认都可进入首页
            this.roles = ['ROOT', 'ADMIN'];
            resolve(res.data);
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    /**
     *  注销
     */
    logout() {
      return new Promise((resolve, reject) => {
        logout()
          .then(() => {
            localStorage.remove('token');
            localStorage.remove('user_avatar');
            //重置状态
            this.RESET_STATE();
            resolve(null);
          })
          .catch(error => {
            reject(error);
          });
      });
    },

    /**
     * 清除 Token
     */
    resetToken() {
      return new Promise(resolve => {
        localStorage.remove('token');
        this.RESET_STATE();
        resolve(null);
      });
    }
  }
});

export default useUserStore;
