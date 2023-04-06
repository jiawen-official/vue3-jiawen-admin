/**
 * 登录表单类型声明
 * @param username 用户名
 * @param password 密码
 */
export interface LoginFormData {
  username: string;
  password: string;
  // mobile: string;
  // code: string;
}

/**
 * 登录响应类型声明
 * @param expires 凭证过期时间
 * @param 权限token
 */
export interface LoginResponseData {
  expires: string;
  token: string;
}
