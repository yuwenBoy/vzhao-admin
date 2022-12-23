import { LoginParams, LoginResultModel,GetUserInfoModel } from './model/userModel';
import { ErrorMessageMode } from '/#/axios';
import { defHttp } from '/@/utils/http/axios';

export function loginApi(params: LoginParams, mode: ErrorMessageMode = 'modal') {
  console.log(params)
  return defHttp.post<LoginResultModel>(
    {
      url: '//localhost:9000/basic-api/user/login',
  //     proxy:{
  //       host: '//localhost',
  //       port: 9000
  // // auth?: {
  // //   username: string;
  // //   password:string;
  // // };
  // // protocol?: string;
  //     },
      params,
    },
    {
      apiUrl:'',
      errorMessageMode: mode,
      // urlPrefix:'//localhost:9000/system/user/login',
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
