import { VAxios } from './Axios';
import { AxiosTransform, CreateAxiosOptions } from './axiosTransform';
import { ContenTypeEnum, RequestEnum } from '/@/enums/httpEnum';

import { isObject } from '/@/utils/is';

import { setObjToUrlParams, deepMerge } from '/@/utils';
import { useGlobSetting } from '/@/hooks/setting';
import { config } from 'dotenv';
import { isString } from 'windicss/utils';

import { joinTimestamp, formatRequestDate } from './helper';
const globSetting = useGlobSetting();

const transform: AxiosTransform = {
    // 请求之前处理config
    beforeRequestHook: (config, options) => {
    const { apuUrl, joinPrefix, joinParamsToUrl, formatDate, joinTime = true, urlPrefix } = options;
    if (joinPrefix) {
      config.url = `${urlPrefix}${config.url}`;
    }
    if (apuUrl && isString(apuUrl)) {
      config.url = `${apuUrl}${config.url}`;
    }
    const params = config.params || {};
    const data = config.data || false;
    formatDate && data && !isString(data) && formatRequestDate(data);
    if (config.method?.toUpperCase() === RequestEnum.GET) {
      if (!isString(params)) {
        // 给 get 请求加上时间戳参数，避免从缓存中拿数据。
        config.params = Object.assign(params || {}, joinTimestamp(joinTime, false));
      } else {
        // 兼容restful风格
        config.url = config.url + params + `${joinTimestamp(joinTime, true)}`;
        config.params = undefined;
      }
    } else {
      if (!isString(params)) {
        formatDate && formatRequestDate(params);
        if (Reflect.has(config, 'data') && config.data && Object.keys(config.data).length > 0) {
          config.data = data;
          config.params = params;
        } else {
          // 非GET请求如果没有提供data，则将params视为data
          config.data = params;
          config.params = undefined;
        }
        if (joinParamsToUrl) {
          config.url = setObjToUrlParams(
            config.url as string,
            Object.assign({}, config.params, config.data),
          );
        }
      } else {
        // 兼容restful风格
        config.url = config.url + params;
        config.params = undefined;
      }
    }
    return config;
  },
};

function createAxios(opt?: Partial<CreateAxiosOptions>) {
  return new VAxios(
    deepMerge(
      {
        authenticationScheme: '',
        timeout: 10 * 1000,
        // 基础接口地址
        baseURL: '',
        headers: { 'Content-Type': ContenTypeEnum.JSON },
        // transform,
        requestOptions: {
          joinPrefix: true,
          apiUrl: globSetting.apiUrl,
          isRetrunNativeResponse: false,
        },
      },
      opt || {},
    ),
  );
}
export const defHttp = createAxios();
