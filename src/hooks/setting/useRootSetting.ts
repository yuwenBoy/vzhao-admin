import type { ProjectConfig } from '/#/config';

import { computed } from 'vue';

import { useAppStore } from '/@/store/modules/app';
import { ContentEnum, ThemeEnum } from '/@/enums/appEnum';

type RootSetting = Omit<
  ProjectConfig,
  'locale' | 'headerSetting' | 'menuSetting' | 'multiTabsSetting'
>;

// import { ContentEnum}

export function useRootSetting() {
  const appStore = useAppStore();

  const getShowDarkModeToggle = computed(() => appStore.getProjectConfig.showDarkModeToggle);

  const getDarkMode = computed(() => appStore.getDarkMode);

  const getCanEmbedIFramePage = computed(() => appStore.getProjectConfig.canEmbedIFramePage);
  const getOpenKeepAlive = computed(() => appStore.getProjectConfig.openKeepAlive)
  const getShowLogo = computed(() => appStore.getProjectConfig.showLogo)
  const getPageLoading = computed(() => appStore.getPageLoading);
  const getLayoutContentMode = computed(() =>
    appStore.getProjectConfig.contentMode === ContentEnum.FULL
      ? ContentEnum.FULL
      : ContentEnum.FIXED,
  );
  const getUseOpenBackTop = computed(() => appStore.getProjectConfig.useOpenBackTop);

  function setDarkMode(mode: ThemeEnum) {
    appStore.setDarkMode(mode);
  }
  return {
    getShowDarkModeToggle,
    getDarkMode,
    setDarkMode,
    getUseOpenBackTop,
    getLayoutContentMode,
    getPageLoading,
    getOpenKeepAlive,
    getCanEmbedIFramePage
  };
}
