<template>
    <span :class="[prefixCls,theme]">
        <MenuUnfoldOutlined />  
    </span>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { MenuUnfoldOutlined,MenuFoldOutlined } from '@ant-design/icons-vue';
import { propTypes } from '/@/utils/propTypes';
import { useDesign } from '/@/hooks/web/useDesign';
export default defineComponent({
    name:'HeaderTrigger',
    components:{MenuUnfoldOutlined,MenuFoldOutlined},
    props:{
        theme:propTypes.oneOf(['light','dark'])
    },
    setup() {
        const { prefixCls } = useDesign('layout-header-trigger'); 
        return {prefixCls}   
    }
})
</script>