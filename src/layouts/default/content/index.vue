<template>
    <div :class="[prefixCls,getLayoutContentMode]" v-loading="getOpenPageLoading && getPageLoading">
        <PageLayout />  
    </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import PageLayout from '/@/layouts/page/index.vue';
import { useRootSetting } from "/@/hooks/setting/useRootSetting";
import { useDesign } from "/@/hooks/web/useDesign";
import { useTransitionSetting } from '/@/hooks/setting/useTransitionSetting';

export default defineComponent({
    name: 'LayoutContent',
    components:{PageLayout},
    setup() {
        const { prefixCls} = useDesign('layout-content');
        const { getOpenPageLoading } = useTransitionSetting();
        const { getLayoutContentMode, getPageLoading } = useRootSetting();
        return {
            prefixCls,
            getLayoutContentMode,
            getPageLoading,
            getOpenPageLoading
        }
    },
})
</script>

<style lang="less">

</style>