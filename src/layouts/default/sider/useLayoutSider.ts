

import { computed, ref, unref } from "vue";
import { useMenuSetting } from "/@/hooks/setting/useMenuSetting";
export function useSiderEvent() {
    const brokenRef = ref(false);
    const { getMiniWidthNumber } = useMenuSetting();
    const getCollapsedWidth = computed(() => {
        return unref(brokenRef) ? 0: unref(getMiniWidthNumber);
    })
    return {
        getCollapsedWidth
    }
}