<template>
  <div
    v-if="getMenuFixed && !getIsMobile"
    :style="getHiddenDomStyle"
    v-show="showClassSideBarRef"
  ></div>
  <Sider
    v-show="showClassSideBarRef"
    ref="sideRef" 
    breakpoint="lg"
    collapsible
    :class="getSiderClass"
    :width="getMenuWidth"
    :theme="getMenuTheme"
    :collapsed="getCollapsed"
    :collapsedWidth="getCollapsedWidth"
  >
   <template #trigger v-if="getShowTrigger">
     <LayoutTrigger />
   </template>
   <LayoutMenu />
   <DragBar ref="dragBarRef" />
  </Sider>
</template>
<script lang="ts">
import { computed, defineComponent, CSSProperties, ref,unref } from 'vue';
import { Layout } from 'ant-design-vue';
import { useMenuSetting } from '/@/hooks/setting/useMenuSetting';
import { useDesign } from '/@/hooks/web/useDesign';
import { useAppInject } from '/@/hooks/web/useAppInject';
import { useSiderEvent, useTrigger } from './useLayoutSider';
import LayoutMenu from '../menu/index.vue';
import LayoutTrigger from '/@/layouts/default/trigger/index.vue';
import DragBar from './DragBar.vue';

export default defineComponent({
  name: 'LayoutSideBar',
  components: { Sider: Layout.Sider,DragBar,LayoutTrigger,LayoutMenu },
  setup() {
    const sideRef = ref<ElRef>(null);
    const dragBarRef = ref<ElRef>(null);
    const { getIsMobile } = useAppInject();
    const { getShowTrigger } = useTrigger(getIsMobile);
    const { getCollapsed,getIsMixMode,getMenuTheme,
     getRealWidth,getMenuFixed, getMenuWidth,getSplit, getMenuHidden } = useMenuSetting();
    const { getCollapsedWidth } = useSiderEvent(); 
    const { prefixCls } = useDesign('layout-sideBar');
    const getHiddenDomStyle = computed((): CSSProperties => {
      const width = `${unref(getRealWidth)}px`;
      return {
        width: width,
        overflow: 'hidden',
        flex: `0 0 ${width}`,
        maxWidth: width,
        minWidth: width,
        transition: 'all 0.2s',
      };
    });

    const showClassSideBarRef = computed(() => {
      return unref(getSplit) ? !unref(getMenuHidden) : true;
    });

    const getSiderClass = computed(() => {
        return [
            prefixCls,
            {[`${prefixCls}--fixed`]:unref(getMenuFixed),[`${prefixCls}--mix`]:unref(getIsMixMode) && !unref(getIsMobile)}
        ]
    })

    return {
      dragBarRef,
      sideRef,
      getCollapsed,
      getMenuWidth,
      getIsMixMode,
      getMenuFixed,
      getIsMobile,
      getHiddenDomStyle,
      showClassSideBarRef,
      getSiderClass,
      getMenuTheme,
      getCollapsedWidth,
      getShowTrigger
    };
  },
});
</script>

<style lang="less">
  @prefix-cls: ~'@{namespace}-layout-sideBar';

  .@{prefix-cls} {
    z-index: @layout-sider-fixed-z-index;

    &--fixed {
      position: fixed;
      top: 0;
      left: 0;
      height: 100%;
    }

    &--mix {
      top: @header-height;
      height: calc(100% - @header-height);
    }

    &.ant-layout-sider-dark {
      background-color: @sider-dark-bg-color;

      .ant-layout-sider-trigger {
        color: darken(@white, 25%);
        background-color: @trigger-dark-bg-color;

        &:hover {
          color: @white;
          background-color: @trigger-dark-hover-bg-color;
        }
      }
    }

    &:not(.ant-layout-sider-dark) {
      // box-shadow: 2px 0 8px 0 rgba(29, 35, 41, 0.05);

      .ant-layout-sider-trigger {
        color: @text-color-base;
        border-top: 1px solid red;
      }
    }

    .ant-layout-sider-zero-width-trigger {
      top: 40%;
      z-index: 10;
    }

    & .ant-layout-sider-trigger {
      height: 36px;
      line-height: 36px;
    }
  }
</style>
