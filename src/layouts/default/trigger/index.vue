<template>
    <SiderTrigger v-if="sider"/>
    <HeaderTrigger v-else :theme="theme"/>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { createAsyncComponent } from '/@/utils/factory/createAsyncComponent';
import HeaderTrigger from './HeaderTrigger.vue';
import { propTypes } from '/@/utils/propTypes';
   export default defineComponent({
    name:'LayoutTrigger',
    components:{
        SiderTrigger:createAsyncComponent(() => import('./SiderTrigger.vue')),
        HeaderTrigger:HeaderTrigger
    },
    props:{
        sider:propTypes.bool.def(true),
        theme:propTypes.oneOf(['light','dark'])
    }
   })
</script>