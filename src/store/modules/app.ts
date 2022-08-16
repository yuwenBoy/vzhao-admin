// vue3最新状态管理模块
import { defineStore } from "pinia";
import { ThemeEnum } from "/@/enums/appEnum";
import { APP_DARK_MODE_KEY_ } from '/@/enums/cacheEnum';
import type { BeforeMiniState } from '/#/store';
import { store } from '/@/store'
import { darkMode } from '/@/settings/desiginSetting';
interface AppState {
    darkMode?:ThemeEnum;
    // Page loading status
    pageLoading:boolean;
    //projectConfig:
    beforeMiniInfo:BeforeMiniState
}

export const useAppStore = defineStore({
    id:'app',
    state:():AppState => ({
        darkMode:undefined,
        pageLoading:false,
        beforeMiniInfo:{},
        //projectConfig:Persisten.
    }),
    getters:{
      getPageLoading(): boolean {
        return this.pageLoading;
      },
      getDarkMode():'light' | 'dark' | string {
        return this.darkMode || localStorage.getItem(APP_DARK_MODE_KEY_) || darkMode
      }
    },
    actions:{

    }
});

// Need to be used outside the setup
export function useAppStoreWithOut() {
    return useAppStore(store);
}