
import type { App, Plugin } from 'vue';
import { RouteLocationNormalized, RouteRecordNormalized } from 'vue-router';
import { isObject } from './is';

export const noop = () => {};

// 注册组件
export const withInstall = <T>(component:T,alias?:string) =>{
    const comp = component as any;
    comp.install = (app:App) =>{
        app.component(comp.name || comp.displayName, component);
        if(alias){
            app.config.globalProperties[alias] = component;
        }
    };
    return component as T & Plugin;
}


export function getRawRoute(route: RouteLocationNormalized): RouteLocationNormalized {
  if (!route) return route;
  const { matched, ...opt } = route;
  return {
    ...opt,
    matched: (matched
      ? matched.map((item) => ({
          meta: item.meta,
          name: item.name,
          path: item.path,
        }))
      : undefined) as RouteRecordNormalized[],
  };
}

/**
 * Add the object as a parameter to the URL
 * @param baseUrl url
 * @param obj
 * @returns {string}
 * eg:
 *  let obj = {a: '3', b: '4'}
 *  setObjToUrlParams('www.baidu.com', obj)
 *  ==>www.baidu.com?a=3&b=4
 */
export function setObjToUrlParams(baseUrl: string, obj: any): string {
    let parameters = '';
    for (const key in obj) {
      parameters += key + '=' + encodeURIComponent(obj[key]) + '&';
    }
    parameters = parameters.replace(/&$/, '');
    return /\?$/.test(baseUrl) ? baseUrl + parameters : baseUrl.replace(/\/?$/, '?') + parameters;
  }
  
  export function deepMerge<T = any>(src: any = {}, target: any = {}): T {
    let key: string;
    for (key in target) {
      src[key] = isObject(src[key]) ? deepMerge(src[key], target[key]) : (src[key] = target[key]);
    }
    return src;
  }


  /**
 * @description:  Set ui mount node
 */
export function getPopupContainer(node?: HTMLElement): HTMLElement {
  return (node?.parentNode as HTMLElement) ?? document.body;
}
  