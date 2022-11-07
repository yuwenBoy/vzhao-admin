<template>
    <div v-show="getShow">忘记密码</div>
</template>

<script lang="ts" setup>
 import { computed, unref } from 'vue';
 import { LoginStateEnum, useLoginState } from './useLogin';

 const { getLoginState } = useLoginState();
 const getShow = computed(() => unref(getLoginState) === LoginStateEnum.RESET_PASSWORD);
</script>
