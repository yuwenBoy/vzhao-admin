import { LoginParams, LoginResultModel,GetUserInfoModel } from './model/userModel';
import { ErrorMessageMode } from '/#/axios';
import { defHttp } from '/@/utils/http/axios';

enum Api {
  Login = '//localhost:9000/basic-api/auth/login',
  GetUserInfo = '//localhost:9000/basic-api/auth/getUserInfo',
}

export function loginApi(params: LoginParams, mode: ErrorMessageMode = 'modal') {
  return defHttp.post<LoginResultModel>(
    {
      url: Api.Login,
      params,
    },
    {
      apiUrl:'',
      errorMessageMode: mode,
    },
  );
}

/**
 * @description: getUserInfo
 */
export function getUserInfo() {
  return defHttp.get<GetUserInfoModel>({ url: Api.GetUserInfo }, {apiUrl:'', errorMessageMode: 'none' });
}

// 退出接口
export function doLogout() {
  return defHttp.get({ url: '' });
}
