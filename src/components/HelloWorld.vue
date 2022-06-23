<!-- v3 两张方式 组合式api setup语法糖 -->
<!-- setup 语法糖 -->
<!-- <script setup lang="ts">
import { ref,defineComponent } from 'vue'

defineProps<{ msg: string }>()
const count = ref(0)
const title = ref('hello world')
const changeMsg = () =>{
    title.value = 'hello zhaojian'
}
</script> -->


<!-- 组合式api -->
<script lang="ts">
import { ref,defineComponent,reactive,computed,watch, onMounted,defineProps } from 'vue'
import { useRoute,useRouter } from 'vue-router'
export default defineComponent({
  setup(){
defineProps<{ msg: string }>()
const count = ref(0)
const title = ref('hello world')
let userInfo = reactive({
  name:'继续向前走',
  age:28
})

onMounted(()=>{
  console.log('挂载完成，相当于选项式api的mounted');
});

const a = ref(1)
const b = ref(2)
const changeMsg = () =>{
    title.value = 'hello zhaojian'
    userInfo.name = 'jxxqz'
    // a.value = 5
}

let addSum = computed(()=>{
    return parseInt(a.value) + parseInt(b.value)
})

// let timer = setInterval(()=>{
//   a.value++
// },1000)

watch(a,(newVal,oldVal)=>{
  if(newVal>10){
    //  clearTimeout(timer);
     console.log('条件判断为a大于10的暂停定时器')
  }
  else{
  console.log(`a从${oldVal}变成了${newVal}`)
  }
})

// 路由使用
let router =useRouter();
let route =  useRoute();

const toPage=()=>{
  console.log(router)
    router.push({name:'Login'})
}
return {
  count,
  title,
  changeMsg,
  userInfo,
  addSum,
  a,
  b,
  toPage
}
  }
})

</script>

<template>
  <h1>{{ msg }}</h1>
  <div @click="changeMsg">
  <span>{{ title }}</span>
  <span>{{ userInfo }}</span>
  </div>

  <div>v3 计算和监听的用法:
  </div>
  <!-- <div><button  @click="changeMsg">watch监听a的值为{{ a }}</button> -->
  <input type="text" v-model="a" placeholder="请输入a的值"/>
  <br />
  <input type="text" v-model="b" placeholder="请输入b的值"/>
   <div>
    相加后的值为：{{ addSum}}
   </div>
   <button @click="toPage">跳转页面</button>
  <p>
    Recommended IDE setup:
    <a href="https://code.visualstudio.com/" target="_blank">VSCode</a>
    +
    <a href="https://github.com/johnsoncodehk/volar" target="_blank">Volar</a>
  </p>

  <p>See <code>README.md</code> for more information.</p>

  <p>
    <a href="https://vitejs.dev/guide/features.html" target="_blank">
      Vite Docs
    </a>
    |
    <a href="https://v3.vuejs.org/" target="_blank">Vue 3 Docs</a>
  </p>

  <button type="button" @click="count++">count is: {{ count }}</button>
  <p>
    Edit
    <code>components/HelloWorld.vue</code> to test hot module replacement.
  </p>
</template>

<style scoped>
a {
  color: #42b983;
}

label {
  margin: 0 0.5em;
  font-weight: bold;
}

code {
  background-color: #eee;
  padding: 2px 4px;
  border-radius: 4px;
  color: #304455;
}
</style>
