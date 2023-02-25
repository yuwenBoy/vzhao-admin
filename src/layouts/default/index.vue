<template>
    <Layout :class="prefixCls">
      <LayoutFeatures />
      <LayoutHeader fixed v-if="getShowFullHeaderRef"/>
      <Layout :class="[layoutClass]">
          <LayoutSideBar />
          <Layout :class="`${prefixCls}-main`">
              <LayoutMultipleHeader />
              <LayoutContent />
              <LayoutFooter />
          </Layout>
      </Layout>
    </Layout>
</template>
<script lang="ts">
import { computed, defineComponent, unref} from 'vue';
import { Layout } from 'ant-design-vue';
import { useDesign } from '/@/hooks/web/useDesign';
import { createAsyncComponent } from '/@/utils/factory/createAsyncComponent';
import LayoutHeader from './header/index.vue';
import LayoutContent from './content/index.vue';

import LayoutSideBar from './sider/index.vue';
import LayoutMultipleHeader from './header/MultipleHeader.vue';
import { useMenuSetting } from '/@/hooks/setting/useMenuSetting';
import { useHeaderSetting } from '/@/hooks/setting/useHeaderSetting';
export default defineComponent({
    name:'DefaultLayout',
    components:{
        LayoutFeatures:createAsyncComponent(() => import('/@/layouts/default/feature/index.vue')),
        LayoutFooter: createAsyncComponent(() => import('/@/layouts/default/footer/index.vue')),
        Layout,
        LayoutHeader,
        LayoutSideBar,
        LayoutMultipleHeader,
        LayoutContent
    },
    setup(){
        const { prefixCls } = useDesign('default-layout');

        const { getIsMixsidebar } = useMenuSetting();

        const { getShowFullHeaderRef } = useHeaderSetting();

        const layoutClass = computed(() => {
          let cls: string[] = ['ant-layout','ant-layout-has-sider'];
          // if(unref(getIsMixSidebar) || unref(getShowMenu)) {
          //     cls.push('ant-layout-has-sider');
          // }
          return cls;
        })
        return {
            prefixCls,
            getIsMixsidebar,
            layoutClass,
            getShowFullHeaderRef
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
