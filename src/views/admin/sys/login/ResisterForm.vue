<template>
    <div v-show="getShow">注册</div>
</template>

<script lang="ts" setup>
 import { computed, unref } from 'vue';
 import { LoginStateEnum, useLoginState } from './useLogin';

 const { getLoginState } = useLoginState();
 const getShow = computed(() => unref(getLoginState) === LoginStateEnum.REGISTER);
</script>
