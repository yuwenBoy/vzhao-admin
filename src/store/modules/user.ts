import type { UserInfo } from '/#/store';
import type { ErrorMessageMode } from '/#/axios';
import { defineStore } from 'pinia';
import { store } from '/@/store';
import { RoleEnum } from '/@/enums/roleEnum';
import { PageEnum } from '/@/enums/pageEnum';
import { ROLES_KEY,TOKEN_KEY,USER_INFO_KEY } from '/@/enums/cacheEnum';
import { getAuthCache, setAuthCache } from '/@/utils/auth';
import { GetUserInfoModel, LoginParams } from '/@/api/admin/model/userModel';
import { loginApi, doLogout,getUserInfo } from '/@/api/admin/user';
import { router } from '/@/router';
import { isArray } from '/@/utils/is';

interface UserState {
  userInfo: Nullable<UserInfo>;
  token?: string;
  roleList: RoleEnum[];
  sessionTimeout?: boolean;
  lastUpdateTime: number;
}

export const useUserStore = defineStore({
  id: 'app-user',
  state: (): UserState => ({
    userInfo: null,
    token: undefined,
    roleList: [],
    sessionTimeout: false,
    lastUpdateTime: 0,
  }),
  getters: {
    getToken(): string {
      return this.token || getAuthCache<string>(TOKEN_KEY);
    },
    getUserInfo(): UserInfo {
        return this.userInfo || getAuthCache<UserInfo>(USER_INFO_KEY) || {};
    }
  },
  actions: {
    setToken(info: string | undefined) {
      this.token = info ? info : '';
      setAuthCache(TOKEN_KEY, info);
    },

    setUserInfo(info: UserInfo | null) {
      this.userInfo = info;
      this.lastUpdateTime = new Date().getTime();
      setAuthCache(USER_INFO_KEY, info);
    },
    setRoleList(roleList: RoleEnum[]){
       this.roleList = roleList;
       //setAuthCache(ROLES_KEY,roleList);
    },
    /**
     * @description: login
     */
    async login(
      params: LoginParams & { goHome?: boolean; mode?: ErrorMessageMode },
    ): Promise<GetUserInfoModel | null> {
      try {
        const { goHome = true, mode, ...loginParams } = params;
        // const data = await loginApi(loginParams, mode);
        // const { token } = {Number:22344};//data;
        // this.setToken(token);
        // 登录成功之后的操作
        return this.afterLoginAction(goHome);
      } catch (error) {
        return Promise.reject(error);
      }
    },
    setSessionTimeout(flag: boolean) {
      this.sessionTimeout = flag;
    },
    async afterLoginAction(goHome?: boolean): Promise<GetUserInfoModel | null> {
      goHome && (await router.replace(PageEnum.BASE_HOME));
      // if(!this.getToken) return null;
      // // get user info
      // const userInfo = await this.getUserInfoAction();
      // const sessionTimeout = this.sessionTimeout;
      // if(sessionTimeout){
      //   this.setSessionTimeout(false);
      // }else{
      //   // const permissionStore = usePermissionStore();
      //   goHome && (await router.replace(userInfo?.homePath || PageEnum.BASE_HOME));
      // }
      // return userInfo;
    },
    async getUserInfoAction(): Promise<UserInfo | null> {
      if(!this.getToken) return null;
      const userInfo = await getUserInfo();
      const { roles = [] } = userInfo;
      if(isArray(roles)){
        const roleList = roles.map((item)=>item.value) as RoleEnum[];
        this.setRoleList(roleList);
      }else{
        userInfo.roles = [];
        this.setRoleList([]);
      }

      this.setUserInfo(userInfo);
      return userInfo;
    },
    async logout(goLogin = false) {
      if (this.getToken) {
        try {
          await doLogout();
        } catch {
          console.log('注销Token失败');
        }
      }
      this.setToken(undefined);
      this.setSessionTimeout(false);
      this.setUserInfo(null);
      goLogin && router.push(PageEnum.BASE_LOGIN);
    },
  },
});

export function useUserStoreWithOut() {
  return useUserStore(store);
}
