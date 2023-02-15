import { computed, unref } from "vue"
import { MenuModeEnum,MenuTypeEnum } from "/@/enums/menuEnum"
import { useAppStore } from "/@/store/modules/app"

export function useMenuSetting() {
    const appStore = useAppStore();
    const getMenuType = computed(() => appStore.getMenuSetting.type);
    const getMenuMode = computed(() => appStore.getMenuSetting.mode);


    const getMenuWidth = computed(() =>appStore.getMenuSetting.menuWidth);
    const getIsMixMode = computed(() => {
        return unref(getMenuMode) === MenuModeEnum.INLINE && unref(getMenuType) === MenuTypeEnum.MIX;
    })
    return {
        getMenuWidth,
        getIsMixMode
    }
}