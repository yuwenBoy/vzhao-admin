<template>
     <div class="maskLoading" v-show="isLoading">
        <span>{{ parentTitle }}</span>
    </div>
</template>
<!-- setup語法糖 -->
<script lang="ts" setup>
import { defineProps,ref, toRef } from 'vue';
      const isLoading = ref(true)
      const props = defineProps(['title'])
      const parentTitle = toRef(props,'title');
      setTimeout(() => {
        isLoading.value = false
      }, 1000); 
</script>


<!-- component api 组合方式封装loading -->
<!-- <script lang="ts">
import { defineComponent,ref, toRef } from 'vue'
export default defineComponent({
    props:['title','timeout'],
    setup(props) {
        const isLoading = ref(true)
        let parentTitle = toRef(props,"title")
        //  let parentTime = toRef(props,"timeout")
        //  const time = ref(parentTime)
        console.log(props.title)
        setTimeout(()=>{
            isLoading.value = false
        },1000)
        return {
            isLoading,
            parentTitle,
            // parentTime
        }
    },
})
</script> -->

<style lang="less" scoped>
.maskLoading{
    position:fixed;
    top: 0;
    left: 0;
    z-index: 999;
    background-color: #ccc;
    height: 100vh;
    width: 100%;
    span{
       vertical-align: middle;
       line-height: 100vh;
    }
}
</style>