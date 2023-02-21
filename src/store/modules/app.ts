// vue3最新状态管理模块
import type { HeaderSetting, MenuSetting, MultiTabsSetting, ProjectConfig,TransitionSetting } from '/#/config';
import { defineStore, _DeepPartial } from 'pinia';
import { ThemeEnum } from '/@/enums/appEnum';
import { APP_DARK_MODE_KEY_, PROJ_ZJ_KEY } from '/@/enums/cacheEnum';
import { Persistent } from '/@/utils/cache/persistent';
import type { BeforeMiniState } from '/#/store';
import { store } from '/@/store';
import { darkMode } from '/@/settings/desiginSetting';
import { deepMerge } from '/@/utils';
interface AppState {
  darkMode?: ThemeEnum;
  // Page loading status
  pageLoading: boolean;
  // project config
  projectConfig: ProjectConfig | null;

  //projectConfig:
  beforeMiniInfo: BeforeMiniState;
}
let timeId: TimeoutHandle;
export const useAppStore = defineStore({
  id: 'app',
  state: (): AppState => ({
    darkMode: undefined,
    pageLoading: false,
    projectConfig: Persistent.getLocal(PROJ_ZJ_KEY),
    beforeMiniInfo: {},
  }),
  getters: {
    getPageLoading(): boolean {
      return this.pageLoading;
    },
    getDarkMode(): 'light' | 'dark' | string {
      return this.darkMode || localStorage.getItem(APP_DARK_MODE_KEY_) || darkMode;
    },
    getProjectConfig(): ProjectConfig {
      return this.projectConfig || ({} as ProjectConfig);
    },

    getTransitionSetting():TransitionSetting {
      return this.getProjectConfig.transitionSetting;
    },
    getHeaderSetting():HeaderSetting {
      return this.getProjectConfig.headerSetting;
    },
    getMenuSetting(): MenuSetting {
      return this.getProjectConfig.menuSetting;
    },
    getMultiTabsSetting(): MultiTabsSetting {
      return this.getProjectConfig.multiTabsSetting;
    }
  },
  actions: {
    setPageLoading(loading: boolean):void{
      this.pageLoading = loading;
    },
    setDarkMode(mode: ThemeEnum): void {
      this.darkMode = mode;
      localStorage.setItem(APP_DARK_MODE_KEY_, mode);
    },

    setProjectConfig(config:_DeepPartial<ProjectConfig>):void {
      this.projectConfig = deepMerge(this.projectConfig || {},config);
      Persistent.setLocal(PROJ_ZJ_KEY,this.projectConfig);
    },
    async setPageLoadingAction(loading:boolean):Promise<void> {
      if(loading) {
        timeId = setTimeout(() => {
          this.setPageLoading(loading);
          clearTimeout(timeId);
        })
      }
    }
  },
});

// Need to be used outside the setup
export function useAppStoreWithOut() {
  return useAppStore(store);
}
