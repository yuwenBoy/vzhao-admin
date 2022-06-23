<template>
    <h2>v3学习目录</h2>
    <button @click="register">用户注册</button>
    <loading :title="parentTitle"/>
</template>


<!-- setup 语法糖方式 -->
<script lang="ts" setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import loading from '../../components/loading/loading.vue'
let parentTitle = ref('资源加载中，请稍等...')
const router = useRouter();
const register = ()=>{
    router.push({name: 'Register'})
}
</script>


<!-- component api 组合方式 -->
<!-- <script lang="ts">
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'
import loading from '../../components/loading/loading.vue'
export default defineComponent({
    components:{
        loading
    },
    setup() {
        let router = useRouter()
        const register= ()=>{
              console.log('跳转注册')
              router.push({name:'Register'})
       }
       return {
         register
       }
    },
})
</script> -->
