<template>
    <Drawer
        v-if="getIsMobile"
        placement="left"
        :class="prefixCls"
        :width="getMenuWidth"
        :getContainer="null"
        :visible="!getCollapsed"
        @close="handleClose"
    >
    8888
    </Drawer>
    <MixSider v-else-if="getIsMixSidebar" />
    <Sider v-else />
</template>
<script lang="ts">
import { defineComponent } from 'vue';

import { Drawer } from 'ant-design-vue';
import { useDesign } from '/@/hooks/web/useDesign';
import { useMenuSetting } from '/@/hooks/setting/useMenuSetting';
import Sider from './LayoutSider.vue';
import { useAppInject } from '/@/hooks/web/useAppInject';
import MixSider from './MixSider.vue';
export default defineComponent({
  name: 'SiderWrapper',
  components: { Drawer,Sider,MixSider },
  setup() {
    const { prefixCls } = useDesign('layout-sider-wrapper');
    const { getIsMobile } = useAppInject();
    const {setMenuSetting, getMenuWidth,getCollapsed,getIsMixSidebar }  =useMenuSetting();

    function handleClose() {
        setMenuSetting({
            collapsed:true
        })
    }
    return {
      getIsMobile,
      prefixCls,
      getMenuWidth,
      getCollapsed,
      handleClose,
      getIsMixSidebar
      
    };
  },
});
</script>
<style lang="less">
@prefix-cls: ~'@{namespace}-layout-sider-wrapper';

.@{prefix-cls} {
    .ant-drawer-body {
        height: 100vh;
        padding: 0;
    }
    .ant-drawer-header-no-title {
        display: none;
    }
}
</style>