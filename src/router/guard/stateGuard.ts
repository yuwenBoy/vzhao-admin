import { Router } from "vue-router";
import { PageEnum } from "/@/enums/pageEnum";
import { useAppStore } from "/@/store/modules/app";
import { usePermissionStore } from "/@/store/modules/permission";
import { useUserStore } from "/@/store/modules/user";

export function createStateGuard(router:Router){
    router.afterEach((to)=>{
        if(to.path === PageEnum.BASE_LOGIN){
            const tabStore = useMeltipleTabStore();
            const useStore = useUserStore();
            const permissionStore = usePermissionStore();
            const appStore = useAppStore();
            appStore.resetAllState();
            permissionStore.resetState();
            tabStore.resetState();
            useStore.resetState();
            removeTabChangeListener();
        }
    })
}