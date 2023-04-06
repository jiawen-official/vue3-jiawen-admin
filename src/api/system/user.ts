import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import {
  UserInfo,
  UserModel,
  UserQueryParam,
  UserPermission
} from '@/types/api/system/user';

/**
 * 登录成功后获取用户信息（昵称、头像）
 */
export function getUserInfo(): AxiosPromise<UserInfo> {
  return request({
    url: '/users/me',
    method: 'get'
  });
}
/**
 * 刷新token
 */
export function refeshToken() {
  return request({
    url: '/user/refesh',
    method: 'post'
  });
}

/**
 * 获取用户菜单树/路由
 */
export function listRoutes() {
  return request({
    url: '/auth/common/getUserMenuTree',
    method: 'get'
  });
}
/**
 * 获取用户按钮
 */
export function getUserMenuButton() {
  return request({
    url: '/auth/common/getUserMenuButton',
    method: 'get'
  });
}

/**
 * 新增 权限用户
 * @param data UserModel
 * @returns
 */
export function addUser(data: UserModel) {
  return request({
    url: '/auth/user/save',
    method: 'post',
    data
  });
}

/**
 * 修改 权限用户
 * @param data UserModel
 * @returns
 */
export function editUser(data: UserModel) {
  return request({
    url: '/auth/user/update',
    method: 'put',
    data
  });
}

/**
 * 上传用户头像
 * @param id 用户编号
 * @param file 图片
 * @returns
 */
export function uploadAvatar(id: string, file: File) {
  const formData = new FormData();
  formData.append('image', file);
  formData.append('id', id);
  return request({
    url: '/auth/user/upload/image',
    method: 'post',
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
}

/**
 * 查询列表 权限用户
 * @param params UserQueryParam
 * @returns
 */
export function getUserList(params: UserQueryParam) {
  return request({
    url: '/auth/user/list',
    method: 'get',
    params
  });
}
/**
 * 查询 权限用户
 * @param id 用户编号
 * @returns User.
 */
export function getUserById(id: string | number) {
  return request({
    url: '/auth/user/detail',
    method: 'get',
    params: { id }
  });
}
/**
 * 删除 权限用户
 * @param ids 用户编号
 * @returns
 */
export function delUser(ids: string | number) {
  return request({
    url: '/auth/user/delete',
    method: 'DELETE',
    params: { ids }
  });
}
/**
 * 新增用户授权
 * @param data UserPermission
 * @returns
 */
export function addPerm(data: UserPermission) {
  return request({
    url: '/auth/user/permission/save',
    method: 'post',
    data
  });
}
/**
 * 更新用户授权
 * @param data UserPermission
 * @returns
 */
export function editPerm(data: UserPermission) {
  return request({
    url: '/auth/user/permission/update',
    method: 'post',
    data
  });
}
/**
 * 查询用户授权
 * @param userId 用户编号
 * @returns
 */
export function getUserPerm(userId: string | number) {
  return request({
    url: '/auth/user/permission/detail',
    method: 'get',
    params: { userId }
  });
}
