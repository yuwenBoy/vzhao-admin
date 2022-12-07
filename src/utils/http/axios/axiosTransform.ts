import type { AxiosRequestConfig, AxiosResponse } from 'axios';
import type { RequestOptions, Result } from '/#/axios';

export interface CreateAxiosOptions extends AxiosRequestConfig {
  authenticationScheme?: string;
  transform?: AxiosTransform;
  requestOptions?: RequestOptions;
}

// 抽象类，是不允许实例化的类，不能直接创建对象，必须要通过子类创建才能使用abstract类的方法。
export abstract class AxiosTransform {
    /**
     * @description Process configuration before request
     * @description Process configuration before request
     */
  beforeRequestHook?: (config: AxiosRequestConfig, options: RequestOptions) => AxiosRequestConfig;

  transformRequestHook?: (res:AxiosResponse<Result>,options:RequestOptions) => any;

  /**
   * @description  请求失败处理
   */
  requestCatchHook?: (e: Error,options:RequestOptions) => Promise<any>;

  /**
   *@description 请求之前的拦截器 
   */
  requestInterceptors?:(config: AxiosRequestConfig,options:CreateAxiosOptions) => AxiosRequestConfig;

  /**
   * @description 请求之后的拦截器
   */
  responseInterceptors?: (res: AxiosResponse<any>) => AxiosResponse<any>;

    /**
   * @description: 请求之前的拦截器错误处理
   */
     requestInterceptorsCatch?: (error: Error) => void;

     /**
      * @description: 请求之后的拦截器错误处理
      */
     responseInterceptorsCatch?: (error: Error) => void;
}
