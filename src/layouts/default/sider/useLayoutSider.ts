

import { computed, ref, Ref,unref } from "vue";
import { TriggerEnum } from "/@/enums/menuEnum";
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

export function useTrigger(getIsMobile:Ref<boolean>) {
   const { getTrigger,getSplit} = useMenuSetting();

   const getShowTrigger = computed(() => {
    const trigger = unref(getTrigger);
    return (trigger !== TriggerEnum.NONE && !unref(getIsMobile) && (trigger === TriggerEnum.FOOTER || unref(getSplit)))
   });
   return {
    getShowTrigger
   }
}