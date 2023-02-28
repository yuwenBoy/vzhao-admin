<template>
   <div @click="openDrawer(true)">
       <Icon icon="ion:settings-outline" />
       <!-- 此组件报错：TypeError: Cannot read properties of undefined (reading 'modules') -->
       <!-- <SettingDrawer @register="register"/> -->
   </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import Icon from '/@/components/Icon';
import { useDrawer } from '/@/components/Drawer';
import SettingDrawer from './SettingDrawer';

export default defineComponent({
    name:'SettingButton',
    components:{ Icon, SettingDrawer },
    setup() {
        const [register,{openDrawer}] = useDrawer();
        return {
            register,
            openDrawer
        }
    },
})
</script>
