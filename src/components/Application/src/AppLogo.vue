<template>
    <div class="anticon" :class="getAppLogoClass" @click="goHome">
        <img src="../../../assets/images/logo.png" alt="" />
        <div class="ml-2 truncate md:opacity-100" :class="getTitleClass" v-show="showTitle">
           {{ title }}
        </div>
    </div>
</template>
<script lang="ts" setup>
import { computed } from "vue";
import { useGlobSetting } from "/@/hooks/setting";
import { useDesign } from "/@/hooks/web/useDesign";

const props = defineProps({
    theme: {type: String, validator: (v:string) => ['light','dark'].includes(v)},
    showTitle:{type:Boolean,default:true},
    alwaysShowTitle:{type:Boolean},
});

const { prefixCls } = useDesign('app-logo');

const { title } = useGlobSetting();

const getAppLogoClass = computed(()=>[
    prefixCls,
    props.theme
    // {'collapsed-show-title':unref(getCollapsedShowTitle)}
])

const getTitleClass = computed(()=>[
    `${prefixCls}__title`,
    {
        'xs:opacity-0':!props.alwaysShowTitle
    }
])

function goHome() {
    
}


</script>



<style lang="less" scoped>
  @prefix-cls: ~'@{namespace}-app-logo';

  .@{prefix-cls} {
    display: flex;
    align-items: center;
    padding-left: 7px;
    cursor: pointer;
    transition: all 0.2s ease;

    &.light {
      border-bottom: 1px solid @border-color-base;
    }

    &.collapsed-show-title {
      padding-left: 20px;
    }

    &.light &__title {
      color: @primary-color;
    }

    &.dark &__title {
      color: @white;
    }

    &__title {
      font-size: 16px;
      font-weight: 700;
      transition: all 0.5s;
      line-height: normal;
    }
  }
</style>