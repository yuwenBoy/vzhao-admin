import { AppRouteModule } from "/@/router/types";
import { cloneDeep, omit } from 'lodash-es';
import {Router,createRouter, createWebHashHistory, RouteRecordNormalized } from "vue-router";

export function flatMultiLevelRoutes(routeModules:AppRouteModule[]){
    const modules: AppRouteModule[] = cloneDeep(routeModules);
    for(let index = 0;index<modules.length;index++){
        const routeModule = modules[index];
        if(!isMultipleRoute(routeModule)){
            continue;
        }
        promoteRouteLevel(routeModule);
    }
    return modules;
}

function promoteRouteLevel(routeModule:AppRouteModule){
    let router:Router | null = createRouter({
        routes:[routeModule as unknown as RouteRecordNormalized],
        history:createWebHashHistory(),
    })
}

function isMultipleRoute(routeModule:AppRouteModule){
    if(!routeModule || !Reflect.has(routeModule,'children') || !routeModule.children?.length){
        return false;
    }

    const children = routeModule.children;

    let flag = false;
    for(let index = 0;index<children.length;index++){
        const child = children[index];
        if(child.children?.length){
            flag = true;
            break;
        }
    }
    return flag;
}