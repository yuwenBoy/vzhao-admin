import type { AppRouteRecordRaw, Menu } from '/@/router/types';

import { defineStore } from 'pinia';
import { store } from '/@/store';
import { useUserStore } from './user';
import { useAppStoreWithOut } from './app';
import { toRaw } from 'vue';
import { PageEnum } from '/@/enums/pageEnum';
import { asyncRoutes } from '/@/router/routes';
import { filter } from '/@/utils/helper/treeHelper';
import { flatMultiLevelRoutes } from '/@/router/helper/routeHelper';
import { ERROR_LOG_ROUTE } from '/@/router/routes/basic';

interface PermissionState {
  permCodeList: string[] | number[];
  isDynamicAddedRoute: boolean;
  lastBuildMenuTime: number;
  backMenuList: Menu[];
  frontMenuList: Menu[];
}

export const usePermissionStore = defineStore({
  id: 'app-permission',
  state: (): PermissionState => ({
    permCodeList: [],
    isDynamicAddedRoute: false,
    lastBuildMenuTime: 0,
    backMenuList: [],
    frontMenuList: [],
  }),
  getters: {
    getIsDynamicAddedRoute():boolean {
        return this.isDynamicAddedRoute;
    }
  },
  actions: {
    setDynamicAddedRoute(added:boolean){
       this.isDynamicAddedRoute = added;
    },
    async buildRoutesAction(): Promise<AppRouteRecordRaw[]> {
      const userStore = useUserStore();
      const appStore = useAppStoreWithOut();

      let routes: AppRouteRecordRaw[] = [];

      const roleList =toRaw(userStore.getRoleList) || [];

      //   const {permissionMode = projectSetting.permissionMode} = appStore.getProjectConfig;

      const routeFilter = (route:AppRouteRecordRaw) =>{
        const { meta} = route;
        const { roles } = meta || {};
        if(!roles) return true;
        return roleList.some((role) => roles.includes(role));
      };

      const routeRemoveIngoreFilter = (route: AppRouteRecordRaw) => {
        const { meta } = route;
        const { ignoreRoute } = meta || {};
        return !ignoreRoute;
      };

      /**
       * @param description 根据设置的首页path，修正routes中的affix标记（固定首页）
       */
      const patchHomeAffix = (routes: AppRouteRecordRaw[]) => {
        if (!routes || routes.length === 0) return;
        let homePath: string = userStore.getUserInfo.homePath || PageEnum.BASE_HOME;
        function patcher(routes: AppRouteRecordRaw[], parentPath = '') {
          if (parentPath) parentPath = parentPath + '/';
          routes.forEach((route: AppRouteRecordRaw) => {
            const { path, children, redirect } = route;
            const currentPath = path.startsWith('/') ? path : parentPath + path;
            if (currentPath == homePath) {
              if (redirect) {
                homePath = route.redirect! as string;
              } else {
                route.meta = Object.assign({}, route.meta, { affix: true });
                throw new Error('end');
              }
            }
            children && children.length > 0 && patcher(children, currentPath);
          });
        }
        try {
          patcher(routes);
        } catch (e) {
          // 已处理完毕跳出循环
        }
        return;
      };

    //   switch
        // routes = filter(asyncRoutes,routeFilter);
        // routes = routes.filter(routeFilter);
        // routes = flatMultiLevelRoutes(routes);

        // return routes;

        routes = filter(asyncRoutes,routeFilter);
        routes = routes.filter(routeFilter);
        const menuList = [];
        routes = filter(routes,routeRemoveIngoreFilter);
        routes = routes.filter(routeRemoveIngoreFilter);
        routes = flatMultiLevelRoutes(routes);
        routes.push(ERROR_LOG_ROUTE);
      patchHomeAffix(routes);
      return routes;
    },
  },
});

export function usePermissionStoreWithOut() {
  return usePermissionStore(store);
}
