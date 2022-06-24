import { PageEnum } from '../../enums/pageEnum';

const IS_TEST = true


export const rootRoute = {
    path: '/',
    name: 'Root',
    redirect: PageEnum.BASE_HOME,
    component: () => import('/src/views/H5/home/index.vue'),
    meta: {
      title: 'Root',
    },
    children:[
        {
            path: 'home',
            name:'Home',
            component: () => import('/src/views/H5/home/home/home.vue'),
            meta: {
              title: '首页',
            },
        },
        {
            path: 'demo',
            name:'Demo',
            component: () => import('/src/views/demo/index.vue'),
            meta: {
              title: '测试页面',
            },
            
        },
        {
            path: 'message',
            name:'Message',
            component: () => import('/src/views/H5/message/index.vue'),
            meta: {
              title: '消息页面',
            },
            
        },
        {
            path: 'my',
            name:'My',
            component: () => import('/src/views/H5/user/index.vue'),
            meta: {
              title: '我的页面',
            },
            
        }
    ] 
}
export const LoginRoute ={
    path:'/login',
    name:'Login',
    component:() => import('/src/views/H5/user/login/login.vue'),
    meta: {
        title:'v3登录'
    }
};
export const RegisterRoute ={
    path:'/register',
    name:'Register',
    component:() => import('/src/views/H5/user/register/register.vue'),
    meta: {
        title:'v3注册'
    }
};

export const basicRoutes = [
    LoginRoute,
    RegisterRoute,
    rootRoute,
];