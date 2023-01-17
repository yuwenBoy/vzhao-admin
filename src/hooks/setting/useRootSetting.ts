import type { ProjectConfig } from '/#/config';

import { computed } from 'vue';

import { useAppStore } from '/@/store/modules/app';
import { ThemeEnum } from '/@/enums/appEnum';

type RootSetting = Omit<
  ProjectConfig,
  'locale' | 'headerSetting' | 'menuSetting' | 'multiTabsSetting'
>;

// import { ContentEnum}

export function useRootSetting() {
  const appStore = useAppStore();

  const getShowDarkModeToggle = computed(() => appStore.getProjectConfig.showDarkModeToggle);

  const getDarkMode = computed(() => appStore.getDarkMode);

  const getUseOpenBackTop = computed(() => appStore.getProjectConfig.useOpenBackTop);

  function setDarkMode(mode: ThemeEnum) {
    appStore.setDarkMode(mode);
  }
  return {
    getShowDarkModeToggle,
    getDarkMode,
    setDarkMode,
    getUseOpenBackTop,
  };
}
