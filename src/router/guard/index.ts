import { Modal, notification } from 'ant-design-vue';
import { unref } from 'vue';
import type { Router, RouteLocationNormalized } from 'vue-router';
import { usetransitionSetting } from '/@/hooks/setting/useTransitionSetting';
import { setRouteChange } from '/@/logics/mitt/routeChange';
import projectSetting from '/@/settings/projectSetting';
import { useAppStoreWithOut } from '/@/store/modules/app';
import { useUserStoreWithOut } from '/@/store/modules/user';
import { AxiosCanceler } from '/@/utils/http/axios/axiosCancel';
import { warn } from '/@/utils/log';
import nProgress from 'nprogress';
import { createPermissionGuard } from './permissionGuard';
import { createStateGuard } from './stateGuard';

export function setupRouterGuard(router: Router) {
    createPageGuard(router);
    createPageLoadingGuard(router);
    createHttpGuard(router);
    createScrollGuard(router);
    createMessageGuard(router);
    createProgressGuard(router);
    createPermissionGuard(router);
    // createStateGuard(router);
}

function createPageGuard(router: Router) {
  const loadedPageMap = new Map<string, boolean>();
  router.beforeEach(async (to) => {
    to.meta.loaded = !!loadedPageMap.get(to.path);
    setRouteChange(to);
    return true;
  });

  router.afterEach((to) => {
    loadedPageMap.set(to.path, true);
  });
}

function createPageLoadingGuard(router: Router) {
  const userStore = useUserStoreWithOut();
  const appStore = useAppStoreWithOut();
  const { getOpenPageLoading } = usetransitionSetting();
  router.beforeEach(async (to) => {
    if (!userStore.getToken) {
      return true;
    }
    if (to.meta.loaded) {
      return true;
    }
    if (unref(getOpenPageLoading)) {
      appStore.setPageLoadingAction(true);
      return true;
    }
    return true;
  });
  router.afterEach(async () => {
    if (unref(getOpenPageLoading)) {
      setTimeout(() => {
        appStore.setPageLoading(true);
      }, 220);
    }
    return true;
  });
}

function createHttpGuard(router: Router) {
    const { removeAllHttpPending } = projectSetting;

    let axiosCanceler:Nullable<AxiosCanceler>;
    if(removeAllHttpPending){
        axiosCanceler = new AxiosCanceler();
    }
    router.beforeEach(async () =>{
        axiosCanceler?.removeAllPending();
        return true;
    })
}

function createScrollGuard(router:Router){
    const isHash = (href:string)=>{
        return /^#/.test(href);
    };

    const body = document.body;

    router.afterEach(async (to) =>{
        isHash((to as RouteLocationNormalized & {href:string})?.href) && body.scroll(0,0);
        return true;
    })
}

export function createMessageGuard(router:Router){
    const { closeMessageOnSwitch } = projectSetting;
    router.beforeEach(async () =>{
        try {
            if(closeMessageOnSwitch){
                Modal.destroyAll();
                notification.destroy();
            }
        }
        catch(error) {
            warn('message guard error:'+error);
        }
        return true;
    })
}

export function createProgressGuard(router:Router){
    const { getOpenNProgress } = usetransitionSetting();
    router.beforeEach(async (to)=>{
        if(to.meta.loaded){
            return true;
        }
        unref(getOpenNProgress) && nProgress.start();
        return true;
    });

    router.afterEach(async () =>{
        unref(getOpenNProgress) && nProgress.done();
        return true;
    })
}
