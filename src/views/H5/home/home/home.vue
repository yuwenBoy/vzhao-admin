<template>
  <div class="home">
    <!-- 首頁 頂部 -->
    <div class="header">
      <!-- 搜索欄 -->
      <input type="text" class="search" placeholder="垃圾袋" />
      <!-- tab標籤 -->
      <div class="menu">
        <ul class="menu-nav">
          <li
            v-for="(item, index) in tabList"
            :key="index"
            class="title"
            :data-tabId="item.value"
            :class="item.value == active ? 'active' : ''"
            @click="tabSwitch"
          >
            {{ item.name }}
          </li>
        </ul>
      </div>
    </div>
    <div class="content">
      <div class="notice">拼小圈</div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";
const tabList = [
  { name: "推荐", value: "0" },
  { name: "食品", value: "1" },
  { name: "手机", value: "2" },
  { name: "男装", value: "3" },
  { name: "百货", value: "4" },
  { name: "运动", value: "5" },
  { name: "水果", value: "7" },
  { name: "电器", value: "8" },
  { name: "鞋包", value: "9" },
  { name: "内衣", value: "10" },
  { name: "医药", value: "11" },
  { name: "女装", value: "12" },
  { name: "饰品", value: "13" },
  { name: "美妆", value: "14" },
  { name: "车品", value: "15" },
  { name: "家装", value: "16" },
  { name: "电脑", value: "17" },
  { name: "家纺", value: "18" },
  { name: "家具", value: "19" },
  { name: "母婴", value: "20" },
  { name: "海淘", value: "21" },
  { name: "玩乐", value: "22" },
];
const active = ref(0);

const tabSwitch = (e: Object) => {
  debugger;
  active.value = parseInt(e.target.dataset.tabid);
  // 当前点击元素的左边距离
  const distanceL = document
    .getElementsByClassName("title active")[0]
    .getBoundingClientRect().left;
  console.log(distanceL);
  // 点击元素的一半宽度
  const elementHW =
    document.getElementsByClassName("title active")[0].clientWidth / 2;
  console.log(elementHW);
  // 屏幕宽度
  const screenW = document.body.clientWidth;
  console.log(screenW);
  // 屏幕宽度的一半
  const screenHW = document.body.clientWidth / 2;
  console.log(screenHW);

  // 元素右边距离
  const distanceR = screenW - distanceL;
  console.log(distanceR);
  // 获取最外层的元素
  const scrollBox = document.getElementsByClassName("menu");
  console.log(scrollBox);
  // 滚动条滚动的距离
  const scrollL = scrollBox[0].scrollLeft;
  console.log(scrollL);
  // 当元素左边距离大于屏幕一半宽度 或者 右边距离大于屏幕一半距离的时候
  if (distanceL > screenHW - elementHW || distanceR > screenHW - elementHW) {
    // 滚动条最终的滚动距离
    scrollBox[0].scrollLeft = scrollL + (distanceL - screenHW + elementHW);
  }
};
</script>

<style lang="less" scoped>
.home {
  width: 100vw;
  height: 100vh;
  background-color: #cccccc54;
  .header {
    width: 100%;
    // height: 80px;
    position: fixed;
    top: 0px;
    z-index: 999;
    background-color: #fff;

    .search {
      width: 98%;
      height: 40px;
      border-radius: 5px;
      background-color: #eeee;
      border: 0px;
      padding: 0 10px;
    }
    input:-ms-input-placeholder {
      text-align: center;
    }
    .menu::-webkit-scrollbar {
      display: none;
    }
    .menu {
      margin: 10px 0 0 0;
      position: relative;
      overflow-x: scroll;
      overflow-y: hidden;
      height: 40px;
      width: 100%;
      & > ul {
        position: absolute;
        height: 40px;
        left: -29px;
        display: flex;
        flex-flow: row nowrap;
        border-bottom: 1px solid rgba(0, 0, 0, 0.1);

        .title {
          font-size: 16px;
          margin: 0 10px;
          width: max-content;
          //   padding: 0px 18px;
          box-sizing: border-box;
          height: 40px;
          display: flex;
          flex-flow: column nowrap;
          justify-content: space-around;
          align-items: center;
          //   transform:translateX(100px);
          //   animation:move 6s linear infinite;
        }
        .active {
          color: red;
          font-weight: 500;
          border-bottom: 2px solid;
          padding: 10px 0;
          transition: all 0.3s;
        }
      }
    }
  }

  .content {
    width: 100%;
    height: calc(100% - 145px);
    position: relative;
    top: 90px;
    .notice {
      background: #fff;
    }
  }
}
</style>