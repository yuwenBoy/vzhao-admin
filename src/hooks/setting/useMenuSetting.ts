import { computed, unref } from "vue";
import { MenuModeEnum,MenuTypeEnum } from "/@/enums/menuEnum"
import { useAppStore } from "/@/store/modules/app"

export interface MenuSetting {
    
}

export function useMenuSetting() {
    const appStore = useAppStore();
    const getMenuType = computed(() => appStore.getMenuSetting.type);
    const getMenuMode = computed(() => appStore.getMenuSetting.mode);

    const getCollapsed = computed(() => appStore.getMenuSetting.collapsed);

    const getMenuWidth = computed(() =>appStore.getMenuSetting.menuWidth);
    const getIsMixMode = computed(() => {
        return unref(getMenuMode) === MenuModeEnum.INLINE && unref(getMenuType) === MenuTypeEnum.MIX;
    })

    const getIsMixsidebar = computed(() => {
        return unref(getMenuType) === MenuTypeEnum.MIX_SIDEBAR;
    })

    // Set menu configuration
    function setMenuSetting(menuSetting:Partial<MenuSetting>):void {
        appStore.setProjectConfig({ menuSetting })
    }
    function toggleCollapsed() {
        setMenuSetting({
            collapsed:!unref(getCollapsed)
        })
    }
    return {
        toggleCollapsed,
        getMenuWidth,
        getIsMixMode,
        getCollapsed,
        getIsMixsidebar,
        setMenuSetting
    }
}