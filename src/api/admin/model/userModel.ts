/**
 *@description: Login interface parameters
 */

export interface LoginParams {
  username: string;
  password: string;
}

export interface RoleInfo {
  roleName: string;
  value: string;
}

export interface LoginResultModel {
  userId: string | number;
  token: string;
  role: RoleInfo;
}

/**
 * @description: Get user information return value 此model对应zj_db_system 里的表
 */
export interface GetUserInfoModel {
  roles: RoleInfo[];
  // 用户id
  userId: string | number;
  // 真实名字
  cName: string;

  // 头像
  avatar: string;

  // 邮箱
  email?: string;
}
