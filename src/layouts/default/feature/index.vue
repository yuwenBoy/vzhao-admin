<script lang="ts">
import { defineComponent } from 'vue';
import { BackTop } from 'ant-design-vue'
import { useRootSetting } from '/@/hooks/setting/useRootSetting';
import { createAsyncComponent } from '/@/utils/factory/createAsyncComponent';
import { useUserStoreWithOut } from '/@/store/modules/user';
import { useDesign } from '/@/hooks/web/useDesign';

export default defineComponent({
    name:'LayoutFeatures',
    components:{
        BackTop,
        SettingDrawer:createAsyncComponent(() => import('/@/layouts/default/setting/index.vue'))
    },
    setup() {
        const { getUseOpenBackTop } = useRootSetting();

        const useStore = useUserStoreWithOut();
        const { prefixCls } = useDesign('setting-drawer-fearure');

        return {
            getTarget: () => document.body,
            getUseOpenBackTop,
            prefixCls
        }
    },
})
</script>

<template> 
    <BackTop v-if="getUseOpenBackTop" :target="getTarget" />
    <SettingDrawer :class="prefixCls" />
</template>