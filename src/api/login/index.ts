import { LoginFormData, LoginResponseData } from '@/types/api/system/login';
import request from '@/utils/request';
import { AxiosPromise } from 'axios';

/**
 * 登录
 * @param data
 */
export function login(data: LoginFormData): AxiosPromise<LoginResponseData> {
  return request({
    url: '/auth/login',
    method: 'post',
    params: data
  });
}

/**
 * 注销
 */
export function logout() {
  return request({
    url: '/auth/logout',
    method: 'delete'
  });
}
