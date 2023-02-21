<template>
    <Footer :class="prefixCls" v-if="false" ref="footerRef">
        <div :class="`${prefixCls}__links`">页脚</div>
    </Footer>
</template>
<script lang="ts">
import { Layout } from 'ant-design-vue';
import { defineComponent } from 'vue';
import { useDesign } from '/@/hooks/web/useDesign';
export default defineComponent({
    name:'LayoutFooter',
    components:{ Footer:Layout.Footer},
    setup() {
        const {prefixCls} = useDesign('layout-footer');
        return {
            prefixCls
        }
    },
})
</script>


<style lang="less" scoped>
  @prefix-cls: ~'@{namespace}-layout-footer';

  @normal-color: rgba(0, 0, 0, 0.45);

  @hover-color: rgba(0, 0, 0, 0.85);

  .@{prefix-cls} {
    color: @normal-color;
    text-align: center;

    &__links {
      margin-bottom: 8px;

      a {
        color: @normal-color;

        &:hover {
          color: @hover-color;
        }
      }
    }

    &__github {
      margin: 0 30px;

      &:hover {
        color: @hover-color;
      }
    }
  }
</style>
