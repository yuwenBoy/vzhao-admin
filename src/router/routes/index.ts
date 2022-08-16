import type { AppRouteRecordRaw,AppRouteModule } from '/@/router/types';
import { PageEnum } from '../../enums/pageEnum';

const modules = import.meta.globEager('./admin/**/*.ts');
const routeModuleList: AppRouteModule[]= [];
Object.keys(modules).forEach((key) =>{
    const mod = modules[key].default || {};
    const modList = Array.isArray(mod)? [...mod]:[mod];
    routeModuleList.push(...modList);
})

export const asyncRoutes = [...routeModuleList]



export const adminRootRoue:AppRouteRecordRaw = {
    path: '/',
    name:'Root',
    redirect: PageEnum.BASE_LOGIN,
    meta:{
        title:'后台管理系统'
    }
}

export const adminLoginRoute:AppRouteRecordRaw = {
    path:'/login',
    name:'Login',
    component:() => import('/@/views/admin/sys/login/Login.vue'),
    meta:{
        title:'后台登录'
    }
}


export const rootRoute:AppRouteRecordRaw = {
    path: '/',
    name: 'Root',
    redirect: PageEnum.BASE_HOME,
    component: () => import('/@/views/H5/home/index.vue'),
    meta: {
      title: 'Root',
    },
    children:[
        {
            path: 'home',
            name:'Home',
            component: () => import('/@/views/H5/home/home/home.vue'),
            meta: {
              title: '首页',
            },
        },
        {
            path: 'demo',
            name:'Demo',
            component: () => import('/@/views/demo/index.vue'),
            meta: {
              title: '测试页面',
            },
            
        },
        {
            path: 'message',
            name:'Message',
            component: () => import('/@/views/H5/message/index.vue'),
            meta: {
              title: '消息页面',
            },
            
        },
        {
            path: 'my',
            name:'My',
            component: () => import('/@/views/H5/user/index.vue'),
            meta: {
              title: '我的页面',
            },
            
        }
    ] 
}

export const LoginRoute:AppRouteRecordRaw ={
    path:'/login',
    name:'Login',
    component:() => import('/@/views/H5/user/login/login.vue'),
    meta: {
        title:'v3登录'
    }
};
export const RegisterRoute:AppRouteRecordRaw ={
    path:'/register',
    name:'Register',
    component:() => import('/@/views/H5/user/register/register.vue'),
    meta: {
        title:'v3注册'
    }
};

export const h5basicRoutes = [
    RegisterRoute,
    LoginRoute,
    rootRoute,
];


export const adminBasicRoutes = [
    adminLoginRoute,
    adminRootRoue
]