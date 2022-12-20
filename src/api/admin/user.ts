import { LoginParams, LoginResultModel,GetUserInfoModel } from './model/userModel';
import { ErrorMessageMode } from '/#/axios';
import { defHttp } from '/@/utils/http/axios';

export function loginApi(params: LoginParams, mode: ErrorMessageMode = 'modal') {
  return defHttp.post<LoginResultModel>(
    {
      url: '/login',
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

/**
 * @description: getUserInfo
 */
export function getUserInfo() {
  return defHttp.get<GetUserInfoModel>({ url: '' }, { errorMessageMode: 'none' });
}

// 退出接口
export function doLogout() {
  return defHttp.get({ url: '' });
}
