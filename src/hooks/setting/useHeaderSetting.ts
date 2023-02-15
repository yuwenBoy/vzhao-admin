import { computed, unref } from "vue";
import { useRootSetting } from "./useRootSetting";
import { useAppStore } from "/@/store/modules/app";

export function useHeaderSetting() {
    const appStore = useAppStore();
    const {getShowLogo } = useRootSetting();
    const getShowHeaderLogo = computed(() => {
        return unref(getShowLogo) && !unref(getIsSidebarType) && !unref(getIsMixSidebar);
    })
    const getHeaderTheme = computed(() => appStore.getHeaderSetting.theme)
    return {
        getHeaderTheme
    }
}