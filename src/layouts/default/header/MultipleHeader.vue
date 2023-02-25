<template>
  <div>12344</div>
  <div
    :style="getWrapStyle"
    :class="getClass"
  >
    <LayoutHeader v-if="getShowInsetHeaderRef"/>
    <MultipleTabs />
  </div>
</template>
<script lang="ts">
import LayoutHeader from './index.vue';
import MultipleTabs from '../tabs/index.vue';
import { computed, CSSProperties, defineComponent, unref } from 'vue';
import { useDesign } from '/@/hooks/web/useDesign';
import { useHeaderSetting } from '/@/hooks/setting/useHeaderSetting';
import { useAppInject } from '/@/hooks/web/useAppInject';
import { useMenuSetting } from '/@/hooks/setting/useMenuSetting';

const HEADER_HEIGHT = 48;
export default defineComponent({
  name: 'LayoutMultipleHeader',
  components: { LayoutHeader,MultipleTabs },
  setup() {
    const { prefixCls } = useDesign('layout-multiple-header');
    const { getIsMobile } = useAppInject();

    const { getCalcContentWidth } = useMenuSetting();
    const { getFixed, getHeaderTheme, getShowFullHeaderRef } = useHeaderSetting();
    const getWrapStyle = computed((): CSSProperties => {
      const style: CSSProperties = {};
      if (unref(getFixed)) {
        style.width = unref(getIsMobile) ? '100%' : unref(getCalcContentWidth);
      }

      if (unref(getShowFullHeaderRef)) {
        style.top = `${HEADER_HEIGHT}px`;
      }
      return style;
    });

    const getIsFixed = computed(() => {
      return unref(getFixed) || unref(getShowFullHeaderRef);
    });
    const getClass = computed(() => {
      return [
        prefixCls,
        `${prefixCls}--${unref(getHeaderTheme)}`,
        { [`${prefixCls}--fixed`]: unref(getIsFixed) },
      ];
    });
    return {
      getClass,
      prefixCls,
      getWrapStyle,
    };
  },
});
</script>
<style lang="less" scoped>
@prefix-cls: ~'@{namespace}-layout-multiple-header';

.@{prefix-cls} {
  transition: width 0.2s;
  flex: 0 0 auto;

  &--dark {
    margin-left: -1px;
  }

  &--fixed {
    position: fixed;
    top: 0;
    z-index: @multiple-tab-fixed-z-index;
    width: 100%;
  }
}
</style>