<script lang="ts">
import { defineComponent, toRefs, ref, unref } from "vue";
import { createAppProviderContext } from "./useAppContext";
import { createBreakpointListen } from "/@/hooks/event/useBreakpoint";

import { prefixCls } from "/@/settings/desiginSetting";

import { MenuModeEnum, MenuTypeEnum } from "/@/enums/menuEnum";
import { sizeEnum } from "/@/enums/breakpointEnum";

const props = {
  /**
   * class style prefix
   */
  prefixCls: { type: String, default: prefixCls },
};

export default defineComponent({
  name: "AppProvider",
  inheritAttrs: false,
  props,
  setup(props, { slots }) {
    const isMobile = ref(false);
    const isSetState = ref(false);

    //    const

    createBreakpointListen(({ screenMap, sizeEnum, width }) => {
      const lgwidth = screenMap.get(sizeEnum.LG);
      if (lgwidth) {
        isMobile.value = width.value - 1 < lgwidth;
      }
    //   handleRestoreState();
    });

    const { prefixCls } = toRefs(props);

    createAppProviderContext({ prefixCls, isMobile });
    return () => slots.default?.();
  },
});
</script>