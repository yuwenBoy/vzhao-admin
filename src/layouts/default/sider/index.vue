<template>
    <Drawer
        placement="left"
        :class="prefixCls"
        :width="getMenuWidth"
        :getContainer="null"
        :visible="!getCollapsed"
        @close="handleClose"
    >
    123
    </Drawer>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

import { Drawer } from 'ant-design-vue';
import { useDesign } from '/@/hooks/web/useDesign';
import { useMenuSetting } from '/@/hooks/setting/useMenuSetting';

export default defineComponent({
  name: 'SiderWrapper',
  components: { Drawer },
  setup() {
    const { prefixCls } = useDesign('layout-sider-wrapper');
    const {setMenuSetting, getMenuWidth,getCollapsed }  =useMenuSetting();

    function handleClose() {
        setMenuSetting({
            collapsed:true
        })
    }
    return {
      prefixCls,
      getMenuWidth,
      getCollapsed,
      handleClose
      
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