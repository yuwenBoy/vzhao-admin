import { PageEnum } from '../../enums/pageEnum';

const IS_TEST = true


export const rootRoute = {
    path: '/',
    name: 'Root',
    redirect: PageEnum.BASE_DEMO,
    component: () => import('/src/views/demo/index.vue'),
    meta: {
      title: 'Root',
    },
    children:[
        {
            path: 'demo',
            name:'study_v3_0',
            component: () => import('/src/views/demo/study_v3_0/index.vue'),
            meta: {
              title: 'Root',
            },
        }
    ] 
}
export const LoginRoute ={
    path:'/login',
    name:'Login',
    component:() => import('/src/views/user/login/login.vue'),
    meta: {
        title:'v3登录'
    }
};
export const RegisterRoute ={
    path:'/register',
    name:'Register',
    component:() => import('/src/views/user/register/register.vue'),
    meta: {
        title:'v3注册'
    }
};

export const basicRoutes = [
    LoginRoute,
    RegisterRoute,
    rootRoute,
];