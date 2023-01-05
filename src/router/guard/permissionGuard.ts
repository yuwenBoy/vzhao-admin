
import { Router, RouteRecordRaw } from 'vue-router';
import { PAGE_NOT_FOUND_ROUTE } from '../routes/basic';
import { PageEnum } from '/@/enums/pageEnum';
import { rootRoute } from '/@/router/routes';
import { usePermissionStoreWithOut } from '/@/store/modules/permission';
import { useUserStoreWithOut } from '/@/store/modules/user';

const LOGIN_PATH = PageEnum.BASE_LOGIN

const ROOT_PATH = rootRoute.path;

const whitePathList:PageEnum[] = [LOGIN_PATH];

export function createPermissionGuard(router:Router){
    const userStore = useUserStoreWithOut();
    debugger
    const permissionStore = usePermissionStoreWithOut();
    router.beforeEach(async (to,from,next)=>{
        if(from.path === ROOT_PATH && to.path === PageEnum.BASE_HOME && userStore.getUserInfo.homePath && userStore.getUserInfo.homePath !== PageEnum.BASE_HOME){
            next(userStore.getUserInfo.homePath);
            return;
        }

        const token = userStore.getToken;
        if(whitePathList.includes(to.path as PageEnum)){
            if(to.path === LOGIN_PATH && token){
                const isSessionTimeout = userStore.getSessionTimeout;
                try {
                    await userStore.afterLoginAction();
                    if(!isSessionTimeout){
                        next((to.query?.redirect as string) || '/');
                        return; 
                    }
                    
                }
                catch{}
            }
            next();
            return;
        }

        if(!token){
            if(to.meta.ignoreAuth){
                next();
                return;
            }

            const redirectData: {path:string;replace:boolean;query?:Recordable<string> } = {
                path: LOGIN_PATH,
                replace:true,
            };
            if(to.path){
                redirectData.query = {
                    ...redirectData.query,
                    redirect:to.path,
                }
            }
            next(redirectData);
            return;
        }
        if(from.path === LOGIN_PATH && to.name === PAGE_NOT_FOUND_ROUTE.name && to.fullPath!==(userStore.getUserInfo.homePath || PageEnum.BASE_HOME)){
            next(userStore.getUserInfo.homePath || PageEnum.BASE_HOME);
            return;
        }

        if(userStore.getLastUpdateTime ===0){
            try{
                await userStore.getUserInfoAction();
            }
            catch{
                next();
                return;
            }
        }

        if(permissionStore.getIsDynamicAddedRoute){
            next();
            return;
        }

        const routes = await permissionStore.buildRoutesAction();
        routes.forEach((route)=>{
            router.addRoute(route as unknown as RouteRecordRaw);
        })

        router.addRoute(PAGE_NOT_FOUND_ROUTE as unknown as RouteRecordRaw);

        permissionStore.setDynamicAddedRoute(true);

        if(to.name === PAGE_NOT_FOUND_ROUTE.name){
            // 动态添加路由后，此处应当重定向到fullpath，否则后加载404页面内容
            next({path:to.fullPath,replace:true,query:to.query});
        }else{
            const redirectPath = (from.query.redirect || to.path) as string;
            const redirect = decodeURIComponent(redirectPath);
            const nextData = to.path == redirect ? {...to,replace:true}:{path:redirect};
            next(nextData);
        }

    })
}