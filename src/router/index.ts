import type { RouteRecordRaw} from 'vue-router'
import type { App } from 'vue'

import { createRouter,createWebHashHistory} from 'vue-router'
import { adminBasicRoutes,h5basicRoutes } from './routes'
// 切换平台，默认管理平台 platform = 'h5' H5手机端
let platform = 'admin'
// 白名单应该包含基本静态路由
const WHITE_NAME_LIST: string[] = [];
const getRouteNames = (array:any[])=>{
    array.forEach((item)=>{
        WHITE_NAME_LIST.push(item.name);
        getRouteNames(item.children || []);
    });
}
getRouteNames(platform==='admin'?adminBasicRoutes:h5basicRoutes);

// app router
export const router = createRouter({
    history: createWebHashHistory("/"),
    routes: (platform==='admin'?adminBasicRoutes:h5basicRoutes) as unknown as RouteRecordRaw[],
    strict: true,
    scrollBehavior: () => ({ left: 0, top: 0 }),
})

export function setupRouter(app: App<Element>){
    app.use(router)
}