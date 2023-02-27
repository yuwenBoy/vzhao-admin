import { computed, unref } from 'vue';
import { useFullContent } from '../web/useFullContent';
import { useMenuSetting } from './useMenuSetting';
import { useRootSetting } from './useRootSetting';
import { MenuModeEnum } from '/@/enums/menuEnum';
import { useAppStore } from '/@/store/modules/app';

export function useHeaderSetting() {
  const { getFullContent } = useFullContent();
  const appStore = useAppStore();
  const { getShowBreadCrumb,getShowLogo } = useRootSetting();
  const { getMenuMode,getShowHeaderTrigger,getSplit } = useMenuSetting();
  const getShowHeaderLogo = computed(() => {
    return unref(getShowLogo) && !unref(getIsSidebarType) && !unref(getIsMixSidebar);
  });
  const getHeaderTheme = computed(() => appStore.getHeaderSetting.theme);

  const getShowBread = computed(() =>{
    return (unref(getMenuMode) !== MenuModeEnum.HORIZONTAL && unref(getShowBreadCrumb) && !unref(getSplit))
  })
  const getShowContent = computed(() => {
    return unref(getShowBread) || unref(getShowHeaderTrigger);
  })
  const getShowInsetHeaderRef = computed(() => {
    const need = !unref(getFullContent) && unref(getShowHeader);
    return (
      (need && !unref(getShowMixHeaderRef)) ||
      (need && unref(getIsTopMenu)) ||
      (need && unref(getIsMixSidebar))
    );
  });

  const getShowFullHeaderRef = computed(() => {
    return (
      !unref(getFullContent) &&
      unref(getShowMixHeaderRef) &&
      unref(getShowHeader) &&
      !unref(getIsTopMenu) &&
      !unref(getIsMixSidebar)
    );
  });

  const { getIsSidebarType, getIsTopMenu, getIsMixSidebar } = useMenuSetting();

  const getShowMixHeaderRef = computed(() => !unref(getIsSidebarType) && unref(getShowHeader));

  const getShowHeader = computed(() => appStore.getHeaderSetting.show);

  const getFixed = computed(() => appStore.getHeaderSetting.fixed);
  return {
    getHeaderTheme,
    getShowFullHeaderRef,
    getShowMixHeaderRef,
    getShowHeader,
    getFixed,
    getShowHeaderLogo,
    getShowInsetHeaderRef,
    getShowContent
  };
}
