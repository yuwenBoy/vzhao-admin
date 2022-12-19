<template>
  <!-- <h2>v3学习目录</h2> -->
  <!-- <button @click="register">用户注册</button> -->
  <!-- <button @click="openLoading">全局加载</button> -->
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
      <li
        v-for="(item, index) in tabList"
        :key="item.id"
        @click="tabClick(item, index)"
        :class="{ active: tab_active === index }"
      >
        <div class="buttom">
          <img class="image" :src="tab_active === index? item.icon_selected : item.icon" />
          <span class="text"> {{ item.name }}</span>
        </div>
      </li>
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
import { defineComponent, ref, reactive, toRefs, watch, onMounted } from "vue";
import { useRouter } from "vue-router";
import { Loading, useLoading } from "../../../components/Loading";
import home_img from "../../../assets/h5/home.png";
import home_active_img from "../../../assets/h5/home_active.png";
import video_img from "../../../assets/h5/video.png";
import video_active_img from "../../../assets/h5/video_active.png";
import category_img from "../../../assets/h5/category.png";
import category_active_img from "../../../assets/h5/category_active.png";
import chat_img from "../../../assets/h5/chat.png";
import chat_active_img from "../../../assets/h5/chat_active.png";
import personal_img from "../../../assets/h5/personal.png";
import personal_active_img from "../../../assets/h5/personal_active.png";
// import {
//   HomeOutlined,
//   SettingFilled,
//   SmileOutlined,
//   SyncOutlined,
//   LoadingOutlined,
// } from '@ant-design/icons-vue';
export default defineComponent({
  components: {
    Loading,
  },
  setup() {
    const tab_active = ref(0);

    const tabList = reactive([
      { name: "首页", id: 1, icon: home_img,icon_selected:home_active_img, url: "Home", page: "/home" },
      { name: "视频", id: 2, icon: video_img,icon_selected:video_active_img, url: "Demo", page: "/demo" },
      { name: "分类", id: 3,icon: category_img,icon_selected:category_active_img,url: "Message", page: "/message" },
      { name: "聊天", id: 4,icon: chat_img,icon_selected:chat_active_img, url: "Message", page: "/message" },
      { name: "个人中心", id: 5, icon: personal_img,icon_selected:personal_active_img, url: "My", page: "/my" },
    ]);
    const route = useRouter();
    const compState = reactive({
      absoulute: false,
      loading: false,
      theme: "dark",
      background: "rgba(111,111,111,.7)",
      tip: "加载中...",
    });
    onMounted(() => {
      let indePage = localStorage.getItem("page");
      tabList.forEach((item, index) => {
        if (item.page === indePage) {
          tab_active.value = index;
        }
      });
    });

    function open(absolute: boolean) {
      compState.absoulute = absolute;
      compState.loading = true;
      setTimeout(() => {
        compState.loading = false;
      }, 2000);
    }

    const tabClick = (item, index) => {
      console.log(item);
      tab_active.value = index;
      route.push({ name: item.url });
      open(false);
    };

    return {
      home_img,
      home_active_img,
      video_img,
      video_active_img,
      category_img,
      category_active_img,
      chat_img,
      chat_active_img,
      personal_img,
      personal_active_img,
      tabList,
      //  register,
      tab_active,
      tabClick,
      compState,

      ...toRefs(compState),
    };
  },
});
</script>

<style lang="less" scoped>
.tab {
  width: 100%;
  height: 55px;
  position: fixed;
  background-color: #f5f5f5;
  padding: 5px 0;
  bottom: 0;
  z-index: 999;
  &_content {
    margin: 0px;
    list-style: none;
    padding: 0px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    .buttom {
       display: flex;
       flex-direction: column;
       .image{
        width:25px;display:block;line-height:30px;margin:0 auto;
       }
       .text{
        font-size: 12px;
        margin: 0px auto;
       }
    }
    li {
      width: 20%;
      float: left;
      height: 100%;
    //   line-height: 50px;
    //   font-size: 18px;
    }
    .active {
      color: red;
    }
  }
}
</style>
