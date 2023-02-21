import { defineStore } from 'pinia';
import { RouteLocationNormalized } from 'vue-router';
import { store } from '..';
import { MULTIPLE_TABS_KEY } from '/@/enums/cacheEnum';
import projectSetting from '/@/settings/projectSetting';
import { Persistent } from '/@/utils/cache/persistent';

export interface MultipleTabState {
  cacheTabList: Set<string>;
  tabList: RouteLocationNormalized[];
  lastDragEndIndex: number;
}

const cacheTab = projectSetting.multiTabsSetting.cache;
export const useMultipleTabStore = defineStore({
  id: 'app-multiple-tab',
  state: (): MultipleTabState => ({
    cacheTabList: new Set(),
    tabList: cacheTab ? Persistent.getLocal(MULTIPLE_TABS_KEY) || [] : [],
  }),
  getters: {
    getCachedTabList(): string[] {
      return Array.from(this.cacheTabList);
    },
  },
});

export function useMultipleTabWithOutStore() {
    return useMultipleTabStore(store);
}