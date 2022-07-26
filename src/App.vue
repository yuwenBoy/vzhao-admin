<template>
  <!-- <img alt="Vue logo" src="./assets/logo.png" /> -->
  <!-- <HelloWorld msg="Hello Vue 3 + TypeScript + Vite" /> -->
  <RouterView />
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

<script lang="ts">
import { defineComponent,watch } from 'vue'
import { useRoute } from 'vue-router'
export default defineComponent({
  setup() {
    const route = useRoute();
    watch(()=> route.path,(newVal,oldVal)=>{
      console.log(newVal);
      console.log(oldVal)
      localStorage.setItem('page',newVal)
    })
    return {

    }
  },
})
</script>

