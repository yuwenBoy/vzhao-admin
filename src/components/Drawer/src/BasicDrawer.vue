<template>
    <Drawer :class="prefixCls" @close="onClose" v-bind="getBindValues">
       <template #title v-if="!$slots.title">
          <DrawerHeader>
123
          </DrawerHeader>
       </template>
    </Drawer>
</template>
<script lang="ts">
import { assertTryStatement } from '@babel/types';
import { Drawer } from 'ant-design-vue';
import { computed, defineComponent, toRaw, unref,ref } from 'vue';
import { DrawerProps } from './typing';
import { useAttrs } from '/@/hooks/core/useAttrs';
import { useDesign } from '/@/hooks/web/useDesign';
import { deepMerge } from '/@/utils';

import DrawerHeader from './components/DrawerHeader.vue';


export default defineComponent({
    components:{Drawer,DrawerHeader},
    inheritAttrs:false,
    emits:['visible-change','ok','close','register'],
    setup(props,{ emit }) {
        const visibleRef = ref(false);
        const attrs = useAttrs();
        const propsRef = ref<Partial<Nullable<DrawerProps>>>(null);
        const {prefixVar,prefixCls} = useDesign('basic-drawer');


        const getMergeProps = computed(():DrawerProps =>{
            return deepMerge(toRaw(props),unref(propsRef))
        })
        const getProps = computed((): DrawerProps => {
            const opt = {
                placement:'right',
                ...unref(attrs),
                ...unref(getMergeProps),
                visible:unref(visibleRef),
            };
            opt.title = undefined;
            const { isDetail,width,wrapClassName,getContainer}  = opt;
            if(isDetail){
                if(!width){
                    opt.width = '100%';
                }
                const detailCls = `${prefixCls}_detail`;
                opt.wrapClassName = wrapClassName ? `${wrapClassName} ${detailCls}`:detailCls;

                if(!getContainer){
                    opt.getContainer = `.${prefixCls}-layout-content` as any;
                }
            }
            return opt as DrawerProps;
        })
        const getBindValues = computed(():DrawerProps => {
            return {
               ...attrs,
               ...unref(getProps)
            }
        })
        return {
            prefixVar,
            prefixCls,
            getBindValues,
            getProps: getProps as any,

        }
    },
})
</script>
<style lang="less">

@header-height:60px;
@detail-header-height:40px;
@prefix-cls:~'@{namespace}-basic-drawer';

</style>
