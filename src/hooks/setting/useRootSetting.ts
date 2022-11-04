import type { ProjectConfig } from '/#/config';

import { computed } from 'vue';

import { useAppStore } from '/@/store/modules/app';

type RootSetting = Omit<
  ProjectConfig,
  'locale' | 'headerSetting' | 'menuSetting' | 'multiTabsSetting'
>;


// import { ContentEnum}



export function useRootSetting() {
  const appStore = useAppStore();


    const getShowDarkModeToggle = computed(() => appStore.getProjectConfig.showDarkModeToggle);

    return {
        getShowDarkModeToggle
    }
}
