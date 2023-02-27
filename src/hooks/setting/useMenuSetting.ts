import { computed, unref, ref } from 'vue';
import { SIDE_BAR_MINI_WIDTH, SIDE_BAR_SHOW_TIT_MINI_WDITH } from '/@/enums/appEnum';
import { MenuModeEnum, MenuTypeEnum } from '/@/enums/menuEnum';
import { SIDE_BAR_BG_COLOR_LIST } from '/@/settings/desiginSetting';
import { useAppStore } from '/@/store/modules/app';

export interface MenuSetting {}

const mixSideHasChildren = ref(false);
export function useMenuSetting() {
  const appStore = useAppStore();
  const getMenuType = computed(() => appStore.getMenuSetting.type);

  const getMenuFixed = computed(() => appStore.getMenuSetting.fixed);

  const getMenuMode = computed(() => appStore.getMenuSetting.mode);

  const getCollapsed = computed(() => appStore.getMenuSetting.collapsed);

  const getMenuWidth = computed(() => appStore.getMenuSetting.menuWidth);
  const getIsMixMode = computed(() => {
    return unref(getMenuMode) === MenuModeEnum.INLINE && unref(getMenuType) === MenuTypeEnum.MIX;
  });

  const getIsSidebarType = computed(() => unref(getMenuType) === MenuTypeEnum.SIDEBAR);

  const getIsTopMenu = computed(() => unref(getMenuType) === MenuTypeEnum.TOP_MENU);


  const getMiniWidthNumber = computed(() => {
    const { collapsedShowTitle } = appStore.getMenuSetting;
    return collapsedShowTitle ? SIDE_BAR_SHOW_TIT_MINI_WDITH : SIDE_BAR_MINI_WIDTH
  })

  const getIsMixSidebar = computed(() => {
    return unref(getMenuMode) === MenuModeEnum.HORIZONTAL;
  });

  const getShowMenu = computed(() => appStore.getMenuSetting.show);

  const getSplit = computed(() => appStore.getMenuSetting.split);

  const getMenuHidden = computed(() => appStore.getMenuSetting.hidden);

  const getMixSideFixed = computed(() => appStore.getMenuSetting.mixSideFixed);

  const getRealWidth = computed(() => {
    if (unref(getIsMixSidebar)) {
      return unref(getCollapsed) && !unref(getMixSideFixed)
        ? unref(getMiniWidthNumber)
        : unref(getMenuWidth);
    }
    return unref(getCollapsed) ? unref(getMiniWidthNumber) : unref(getMenuWidth);
  });
  const getMenuTheme = computed(() => appStore.getMenuSetting.theme);

  const getShowHeaderTrigger = computed(() => {
    return true;
    // console.log(1);
    // if (
    //   unref(getMenuType) === MenuTypeEnum.TOP_MENU ||
    //   !unref(getShowMenu) ||
    //   unref(getMenuHidden)
    // ) {
    //   console.log(2);
    //   return false;
    // }
  });

  const getCalcContentWidth = computed(() => {
    const width =
      unref(getIsTopMenu) || !unref(getShowMenu) || (unref(getSplit) && unref(getMenuHidden))
        ? 0
        : unref(getIsMixSidebar)
        ? (unref(getCollapsed) ? SIDE_BAR_MINI_WIDTH : SIDE_BAR_SHOW_TIT_MINI_WDITH) +
          (unref(getMixSideFixed) && unref(mixSideHasChildren) ? unref(getRealWidth) : 0)
        : unref(getRealWidth);
    return `calc(100%- ${unref(width)}px)`;
  });

  // Set menu configuration
  function setMenuSetting(menuSetting: Partial<MenuSetting>): void {
    appStore.setProjectConfig({ menuSetting });
  }
  function toggleCollapsed() {
    setMenuSetting({
      collapsed: !unref(getCollapsed),
    });
  }
  return {
    getShowMenu,
    toggleCollapsed,
    getMenuWidth,
    getIsMixMode,
    getCollapsed,
    setMenuSetting,
    getIsSidebarType,
    getIsTopMenu,
    getIsMixSidebar,
    getCalcContentWidth,
    getSplit,
    getRealWidth,
    getMenuTheme,
    getMenuHidden,
    mixSideHasChildren,
    getMenuFixed,
    getMenuMode,
    getShowHeaderTrigger,
    getMenuType,
    getMiniWidthNumber
  };
}
