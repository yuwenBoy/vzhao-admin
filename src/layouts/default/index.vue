<template>
    <Layout :class="prefixCls">
      <LayoutFeatures />
      <LayoutHeader fixed/>
    </Layout>
</template>
<script lang="ts">
import { defineComponent} from 'vue';
import { Layout } from 'ant-design-vue';
import { useDesign } from '/@/hooks/web/useDesign';
import { createAsyncComponent } from '/@/utils/factory/createAsyncComponent';
import LayoutHeader from './header/index.vue';
export default defineComponent({
    name:'DefaultLayout',
    components:{
        LayoutFeatures:createAsyncComponent(() => import('/@/layouts/default/feature/index.vue')),
        Layout,
        LayoutHeader,
    },
    setup(){
        const { prefixCls } = useDesign('default-layout');
        return {
            prefixCls
        }
    }
})
</script>
<style lang="less">
  @prefix-cls: ~'@{namespace}-default-layout';

  .@{prefix-cls} {
    display: flex;
    width: 100%;
    min-height: 100%;
    background-color: @content-bg;
    flex-direction: column;

    > .ant-layout {
      min-height: 100%;
    }

    &-main {
      width: 100%;
      margin-left: 1px;
    }
  }
</style>
