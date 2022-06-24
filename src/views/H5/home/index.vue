<template>
    <!-- <h2>v3学习目录</h2> -->
    <!-- <button @click="register">用户注册</button> -->
    <button @click="openLoading">全局加载</button>
    <Loading 
    :loading="loading"
    :absolute="absolute"
    :theme="theme"
    :background="background"
    :tip="tip"
    />
     <RouterView />
    <div class="tab">
         <ul class="tab_content">
            <li v-for="(item,index) in tabList" :key="item.id" @click="tabClick(item,index)" :class="{'active':tab_active === index}">{{ item.name }}</li>
         </ul>
    </div>
</template>


// <!-- setup 语法糖方式 -->
// <!-- <script lang="ts" setup>
// import { ref } from 'vue';
// import { useRouter } from 'vue-router';
// import loading from '../../components/loading/loading.vue'
// let parentTitle = ref('资源加载中，请稍等...')
// const router = useRouter();

// const register = ()=>{
//     router.push({name: 'Register'})
// }
// </script> -->


// <!-- component api 组合方式 -->
<script lang="ts">
import { defineComponent,ref,reactive,toRefs } from 'vue'
import { useRouter } from 'vue-router'
import { Loading,useLoading } from '../../../components/Ant_Loading'

export default defineComponent({
    components:{
        Loading
    },
    setup() {
       
        const tab_active = ref(0)
        const tabList =reactive([{name:'首页',id:1,icon:'',url:'Home'},{name:'Demo',id:2,icon:'',url:'Demo'},{name:'消息',id:3,icon:'',url:'Message'},{name:'我的',id:4,icon:'',url:'My'}])
        let router = useRouter()
        const register= ()=>{
              console.log('跳转注册')
              router.push({name:'Register'})
       }

       const tabClick = (item,index)=>{
        console.log(item)
              tab_active.value = index
              router.push({name:item.url})
       }


       const compState = reactive({
        absoulute:false,
        loading:false,
        theme:'dark',
        background:'rgba(111,111,111,.7)',
        tip:'加载中...'
       });

       function open(absolute:boolean){
            compState.absoulute = absolute;
            compState.loading = true;
            setTimeout(()=>{
                compState.loading = false;
            },2000)
       }
       const openLoading = ()=>{
            open(false)
       }

       return {
        tabList,
         register,
         tab_active,
         tabClick,
         compState,
         openLoading,
          ...toRefs(compState),
       }
    },
})
</script>

<style lang="less">
.tab{
    width: 100%;
    height: 60px;
    position: fixed;
    background-color: #eee;
    bottom: 0;
    &_content{
        margin: 0px;
        list-style: none;
        padding: 0px;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        li{
            width: 25%;
            float: left;
            height: 100%;
            line-height: 60px;
            font-size: 18px;
        }
        .active{
           color: green;
        }
    }
}
</style>
