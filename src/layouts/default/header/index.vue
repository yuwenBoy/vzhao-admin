<template>
  <Header :class="getHeaderClass">
    <div :class="`${prefixCls}-left`">
      <AppLogo v-if="getShowHeaderLogo || getIsMobile" :class="`${prefixCls}-logo`" :theme="getHeaderTheme" :style="getLogoWidth" />
      <LayoutTrigger v-if="(getShowContent && getShowHeaderTrigger && !getSplit && !getIsMixSidebar) || getIsMobile" :theme="getHeaderTheme" :sider="false"/>
      <LayoutBreadcrumb :theme="getHeaderTheme"/>
    </div>
    <div :class="`${prefixCls}-menu`">
      123
    <!-- <LayoutMenu /> -->
    </div>
    <div :class="`${prefixCls}-action`"> 
       <Notify :class="`${prefixCls}-action__item notify-item`"/>

       <FullScreen :class="`${prefixCls}-action__Item fullscreen-item`"/>

       <UserDropDown :theme="getHeaderTheme" />

       <SettingDrawer :class="`${prefixCls}-action__item`"/>
    </div>
  </Header>
</template>
<script lang="ts">
import { Layout } from 'ant-design-vue';
import { AppLogo } from '/@/components/Application';
import { computed, defineComponent, unref } from 'vue';
import { useDesign } from '/@/hooks/web/useDesign';
import LayoutTrigger from '../trigger/index.vue';
import { useHeaderSetting } from '/@/hooks/setting/useHeaderSetting';
import { propTypes } from '/@/utils/propTypes';
import { useAppInject } from '/@/hooks/web/useAppInject';
import { useMenuSetting } from '/@/hooks/setting/useMenuSetting';
import { Notify, FullScreen,UserDropDown,LayoutBreadcrumb } from './components'
import { createAsyncComponent } from '/@/utils/factory/createAsyncComponent';
// import LayoutMenu from '../menu/index.vue';
export default defineComponent({
  name: 'LayoutHeader',
  components: { Header: Layout.Header, AppLogo, LayoutTrigger,LayoutBreadcrumb,UserDropDown,FullScreen,Notify,
    // LayoutMenu,
    SettingDrawer: createAsyncComponent(() => import('/@/layouts/default/setting/index.vue'))
  },
  props: {
    fixed: propTypes.bool,
  },
  setup(props) {
    const { prefixCls } = useDesign('layout-header');

    const { getIsMixMode,getShowHeaderTrigger, getSplit,getMenuWidth,getIsMixSidebar } = useMenuSetting();

    const { getHeaderTheme,getShowHeaderLogo,getShowContent } = useHeaderSetting();


    const { getIsMobile } = useAppInject();
    const getHeaderClass = computed(() => {
      const theme = unref(getHeaderTheme);
      return [
        prefixCls,
        {
          [`${prefixCls}--fixed`]: props.fixed,
          [`${prefixCls}--mobile`]: unref(getIsMobile),
          [`${prefixCls}--${theme}`]: theme,
        },
      ];
    });

    const getLogoWidth = computed(() => {
      if (!unref(getIsMixMode) || unref(getIsMobile)) {
        return {};
      }

      const width = unref(getMenuWidth) < 180 ? 180 : unref(getMenuWidth);
      return { width: `${width}px` };
    });

    return { prefixCls,getShowContent,getSplit,getShowHeaderLogo,getShowHeaderTrigger,getHeaderTheme, getHeaderClass, getIsMobile,getLogoWidth,getIsMixSidebar };
  },
});
</script>

<style lang="less">
@import './index.less';
</style>