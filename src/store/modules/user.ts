import type { UserInfo } from "/#/store";
import type { ErrorMessageMode } from "/#/axios";
import { defineStore } from "pinia";
import { store } from "/@/store";
import { RoleEnum } from "/@/enums/roleEnum";
import { PageEnum } from "/@/enums/pageEnum";
import { TOKEN_KEY,USER_INFO_KEY } from "/@/enums/cacheEnum";
import { getAuthCache,setAuthCache } from '/@/utils/auth';
import { GetUserInfoModel, LoginParams } from "/@/api/admin/model/userModel";
import { loginApi } from "/@/api/admin/user";

interface UserState {
    userInfo: Nullable<UserInfo>;
    token?: string;
    roleList: RoleEnum[];
    sessionTimeout?: boolean;
    lastUpdateTime: number;
}


export const useUserStore = defineStore({
    id:'app-user',
    state: ():UserState=>({
        userInfo:null,
        token:undefined,
        roleList:[],
        sessionTimeout:false,
        lastUpdateTime:0
    }),
    getters: {
        // getUserInfo(): UserInfo {
        //     return this.userInfo || getAuthCache {};
        // }
    },
    actions: {
        setToken(info:string | undefined){
            this.token = info ? info : '';
            setAuthoCache(TOKEN_KEY,info);
        },
        /**
         * @description: login
         */
        async login(params:LoginParams & {goHome?:boolean;mode?:ErrorMessageMode;}):Promise<GetUserInfoModel | null> {
            try {
                const  { goHome = true,mode,...loginParams } = params;
                const data = await loginApi(loginParams,mode);
                const { token } = data;
                this.setToken(token);
                // 登录成功之后的操作
               // return this.afterLoginAction(goHome);
            }
            catch (error){
               return Promise.reject(error);
            }
        },
    //    async afterLoginAction (goHome?: boolean):Promise<GetUserInfoModel | null> {
        
    //    }
    }
})