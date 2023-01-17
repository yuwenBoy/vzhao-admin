
<script lang="tsx">
import { InfoCircleFilled } from "@ant-design/icons-vue";
import { computed, defineComponent, PropType, unref } from "@vue/runtime-core";
import { Tooltip } from "ant-design-vue";
import { CSSProperties } from "vue";
import { useDesign } from "/@/hooks/web/useDesign";
import { getPopupContainer } from '/@/utils';
import { getSlot } from "/@/utils/helper/tsxHelper";
import { isArray,isString } from "/@/utils/is";

 

 const props = {
    maxWidth: {type:String,default:'600px'},
    showIndex:{type:Boolean},
    color:{type:String,default:'#FFFFFF'},
    fontSize:{type:String,default:'14px'},
    placement:{type:String,default:'right'},
    text:{type:[Array,String] as PropType<string[] | string> }
 }


 export default defineComponent({
    name:'BasicHelp',
    components:{ Tooltip },
    props,
    setup(props,{ slots }){
       const { prefixCls } = useDesign('basic-help');

       const getTooltipStyle = computed(():CSSProperties=>({
        color:props.color,fontSize:props.fontSize
       }));

       const getOverlayStyle = computed(():CSSProperties => ({maxWidth:props.maxWidth}));

       function renderTitle() {
           const textList = props.text;
           if(isString(textList)){
               return <p>{textList}</p>
           }

           if(isArray(textList)){
            return textList.map((text,index)=>{
                return (<p key={text}><>{props.showIndex?`${index+1}. `: ''}{text}</></p>)
            })
           }
           return null;
       }
       return () => {
          return (<Tooltip 
                    overlayClassName={`${prefixCls}__wrap`} 
                    title={<div style={unref(getTooltipStyle)}>{renderTitle()}</div>}
                    autoAdjustOverflow={true}
                    overlayStyle={unref(getOverlayStyle)}
                    placement={props.placement as 'right'}
                    getPopupContainer={() => getPopupContainer()}>
                    <span class={prefixCls}>{getSlot(slots) || <InfoCircleFilled />}</span>    
                  </Tooltip>)
       }
    }
  })

</script>
<style lang="less">
@prefix-cls:~ '@{namespace}-basic-help';

.@{prefix-cls} {
  display: inline-block;
  margin-left: 6px;
  font-size: 14px;
  color: @text-color-help-dark;
  cursor: pointer;

  &:hover {
    color: @primary-color;
  }

  &__warp {
    p {
      margin-bottom: 0;
    }
  }
}
</style>
