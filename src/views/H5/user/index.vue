<template>
  <div>
    <div>我的</div>
    <div @click="login">用户登录</div>
    <div @click="register">用户注册</div>
  </div>
</template>
<script lang="ts" setup>
    // 路由引入
    import { useRouter } from 'vue-router';
    const router = useRouter();
    // 注册跳转
    const register = ()=>{
        console.log('注册');
        router.push({name:'Register'})
    }
    // 登录跳转
    const login = ()=>{
        console.log('登录');
        router.push({name:'ADMINLogin'})
    }
</script>