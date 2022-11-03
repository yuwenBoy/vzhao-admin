<template>
  <!-- <img alt="Vue logo" src="./assets/logo.png" /> -->
  <!-- <HelloWorld msg="Hello Vue 3 + TypeScript + Vite" /> -->
  <ConfigProvider>
    <AppProvider>
      <RouterView />
    </AppProvider>
  </ConfigProvider>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
  margin: 0;
}
</style>

<script lang="ts" setup>
import { ConfigProvider } from "ant-design-vue";
import { defineComponent, watch } from "vue";
import { useRoute } from "vue-router";
import { AppProvider } from "/@/components/Application";
// export default defineComponent({
//   setup() {
//     const route = useRoute();
//     watch(
//       () => route.path,
//       (newVal, oldVal) => {
//         console.log(newVal);
//         console.log(oldVal);
//         localStorage.setItem("page", newVal);
//       }
//     );
//     return {};
//   },
// });
</script>

