import type { AppRouteModule } from "/@/router/types";

import { LAYOUT } from "/@/router/constant";

const dashboard: AppRouteModule = {
    path:'/dashboard',
    name:'Dashboard',
    component:LAYOUT,
    redirect:'/dashboard/analysis',
    meta:{
        orderNo:10,
        icon:'',
        title:'首页'
    },
    children:[{
        path:'analysis',
        name:'Analysis',
        component: () => import('/@/views/admin/dashboard/analysis/index.vue'),
        meta:{
            title:'工作台',

        }
    },{
        path:'workbench',
        name:'Workbench',
        component: () => import('/@/views/admin/dashboard/workbench/index.vue'),
        meta:{
            title:'工作台111',
        }
    }]
}
export default dashboard;