<template>
  <div :style="getPlaceholderDomStyle" v-if="getIsShowPlaceholderDom"></div>
  <div :style="getWrapStyle" :class="getClass">
    <LayoutHeader v-if="getShowInsetHeaderRef"/>
    <MultipleTabs v-if="getShowTabs"/>
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
import { useFullContent } from '/@/hooks/web/useFullContent';
import { useMultipleTabSetting } from '/@/hooks/setting/useMultipleTabSetting';
import { useLayoutHeight } from '../content/useContentViewheight';
const HEADER_HEIGHT = 48;
const TABS_HEIGHT = 32
export default defineComponent({
  name: 'LayoutMultipleHeader',
  components: { LayoutHeader,MultipleTabs },
  setup() {
    const { setHeaderHeight } = useLayoutHeight();  
    const { prefixCls } = useDesign('layout-multiple-header');
    const { getIsMobile } = useAppInject();
    const { getFullContent } = useFullContent();
    const { getCalcContentWidth,getSplit } = useMenuSetting();
    const { getFixed,getShowHeader, getShowInsetHeaderRef,getHeaderTheme, getShowFullHeaderRef } = useHeaderSetting();
    const { getShowMultipleTab } = useMultipleTabSetting();
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

    const getPlaceholderDomStyle = computed((): CSSProperties => {
        let height = 0;
        if(unref(getShowFullHeaderRef) || !unref(getSplit) && unref(getShowHeader) && !unref(getFullContent)){
            height += HEADER_HEIGHT;
        }
        if(unref(getShowMultipleTab) && !unref(getFullContent)) {
            height += TABS_HEIGHT;
        }
        setHeaderHeight(height);
        return {
            height: `${height}px`
        }
    });

    const getIsShowPlaceholderDom = computed(() => {
        return unref(getFixed) || unref(getShowFullHeaderRef);
    })

    const getShowTabs = computed(() => {
      return unref(getShowMultipleTab) && !unref(getFullContent);
    })

    return {
      getClass,
      prefixCls,
      getIsFixed,
      getWrapStyle,
      getPlaceholderDomStyle,
      getIsShowPlaceholderDom,
      getShowInsetHeaderRef,
      getShowTabs
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