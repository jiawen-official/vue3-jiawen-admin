import { PageQueryParam } from '../base';

/**
 * 用户信息类型声明
 * @param id 用户编号
 * @param name 昵称
 * @param username 用户名
 * @param headpicUrl 头像
 */
export interface UserInfo {
  id?: string | number;
  name: string;
  username: string;
  headpicUrl?: string;
}

/**
 * 用户信息类型声明
 * @param 用户编号
 * @param isEnable 是否启用
 * @param name	昵称
 * @param password 密码
 * @param comfirmPwd 确认密码
 * @param roleIds 角色id数组
 * @param username 用户名
 */
export interface UserModel {
  id?: string | number;
  isEnable: boolean;
  name: string;
  password: string;
  comfirmPwd?: string;
  roleIds: Array<string | number | undefined>;
  username: string;
}

/**
 * 用户信息查询参数声明
 * @param username 用户名
 * @param isEnable 是否启用
 */
export interface UserQueryParam extends PageQueryParam {
  username?: string;
  isEnable?: boolean;
}
/**
 * 新增用户权限参数类型声明
 * @param userId 用户编号
 * @param permissionList 授权范围数组
 */
export interface UserPermission {
  userId: string | number;
  permissionList: Array<any>;
}
