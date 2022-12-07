import type { UserInfo } from "/#/store";
import type { ErrorMessageMode } from "/#/axios";
import { defineStore } from "pinia";
import { store } from "/@/store";
import { RoleEnum } from "/@/enums/roleEnum";
import { PageEnum } from "/@/enums/pageEnum";
import { TOKEN_KEY,USER_INFO_KEY } from "/@/enums/cacheEnum";
// import { getAuthCache}

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
        /**
         * @description: login
         */
        // async login(params:LoginParams & {goHome?:boolean;mode?:ErrorMessageMode;},):Promise<GetUserInfoModel | null> {
        //     try {
        //         const  { goHome = true,mode,...loginParams } = params;
        //     }
        //     catch (error){
        //        return Promise.reject(error);
        //     }
        // }
    }
})