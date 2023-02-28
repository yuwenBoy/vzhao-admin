<script lang="ts">
import { computed, defineComponent, unref } from 'vue';
import { BackTop } from 'ant-design-vue'
import { useRootSetting } from '/@/hooks/setting/useRootSetting';
import { createAsyncComponent } from '/@/utils/factory/createAsyncComponent';
import { useDesign } from '/@/hooks/web/useDesign';
import { SettingButtonPositionEnum } from '/@/enums/appEnum';
import { useHeaderSetting } from '/@/hooks/setting/useHeaderSetting';

export default defineComponent({
    name:'LayoutFeatures',
    components:{
        BackTop,
        SettingDrawer:createAsyncComponent(() => import('/@/layouts/default/setting/index.vue'))
    },
    setup() {
        const { getUseOpenBackTop,getShowSettingButton,getSettingButtonPosition,getFullContent } = useRootSetting();

        const { prefixCls } = useDesign('setting-drawer-fearure');

        const { getShowHeader } = useHeaderSetting();

        const getIsFixedSettingDrawer = computed(() => {
            if(!unref(getShowSettingButton)){
                return false;
            }
            const settingButtonPosition = unref(getSettingButtonPosition);
            if(settingButtonPosition === SettingButtonPositionEnum.AUTO) {
                return !unref(getShowHeader) || unref(getFullContent);
            }
            return settingButtonPosition === SettingButtonPositionEnum.FIXED
        })
        return {
            getTarget: () => document.body,
            getUseOpenBackTop,
            prefixCls,
            getIsFixedSettingDrawer
        }
    },
})
</script>

<template> 
    <BackTop v-if="getUseOpenBackTop" :target="getTarget" />
    <SettingDrawer :class="prefixCls" v-if="getIsFixedSettingDrawer" />
</template>