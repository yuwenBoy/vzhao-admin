import { LoginParams,LoginResultModel } from './model/userModel';
import { ErrorMessageMode } from '/#/axios';
import { defHttp } from '/@/utils/http/axios';

export function loginApi(params: LoginParams, mode:ErrorMessageMode = 'model'){
   return defHttp.post<LoginResultModel>({
    url:'login',
    params
   },{
    errorMessageMode:mode
   })
}