<template>
  <Dropdown placement="bottomLeft" :overlayClassName="`${prefixCls}-dropdown-overlay`">
    <span :class="[prefixCls, `${prefixCls}--${theme}`]" class="flex">
        <img :class="`${prefixCls}__header`" :src="getUserInfo?.avatar" />
        <span :class="`${prefixCls}__info hidden md:block`">
          <span :class="`${prefixCls}__name  `" class="truncate">
            {{ getUserInfo?.cname }}
          </span>
        </span>
      </span>
  <template #overlay>
    <Menu @click="handleMenuClick">
        <MenuItem icon="ion:document-text-outline" text="文档" />
        <MenuItem
          key="logout"
          text="退出"
          icon="ion:power-outline"
        />
    </Menu>
  </template>
  </Dropdown>
</template>
<script lang="ts">
import { Dropdown, Menu } from 'ant-design-vue';
import { computed, defineComponent } from 'vue';
import { useDesign } from '/@/hooks/web/useDesign';
import { useUserStore } from '/@/store/modules/user';

import headerImg from '/@/assets/images/header.jpg';
import { createAsyncComponent } from '/@/utils/factory/createAsyncComponent';
import { propTypes } from '/@/utils/propTypes';

type MenuEvent = 'logout' | 'doc' | 'lock';
export default defineComponent({
  name: 'UserDropDown',
  components: {
    Dropdown,
    Menu,
    MenuItem:createAsyncComponent(() => import('./DropMenuItem.vue')),
    MenuDivider:Menu.Divider,
  },
  props:{
    theme:propTypes.oneOf(['dark','light'])
  },
  setup() {
    const { prefixCls } = useDesign('header-user-dropdown');
    const userStore = useUserStore()
    const getUserInfo = computed(() => {
        const {cname = '',avatar} = userStore.getUserInfo || {};
        return {cname,avatar:avatar || headerImg}
    })

    function handleLoginOut() {
        userStore.confirmLoginout();
    }

    function handleMenuClick(e:{key:MenuEvent}) {
        console.log(e.key);
          switch(e.key){
            case 'logout':
            handleLoginOut();
                break;
          }
    }
    return {
      prefixCls,
      getUserInfo,
      handleMenuClick
    };
  },
});
</script>

<style lang="less">
  @prefix-cls: ~'@{namespace}-header-user-dropdown';

  .@{prefix-cls} {
    height: @header-height;
    padding: 0 0 0 10px;
    padding-right: 10px;
    overflow: hidden;
    font-size: 12px;
    cursor: pointer;
    align-items: center;

    img {
      width: 24px;
      height: 24px;
      margin-right: 12px;
    }

    &__header {
      border-radius: 50%;
    }

    &__name {
      font-size: 14px;
    }

    &--dark {
      &:hover {
        background-color: @header-dark-bg-hover-color;
      }
    }

    &--light {
      &:hover {
        background-color: @header-light-bg-hover-color;
      }

      .@{prefix-cls}__name {
        color: @text-color-base;
      }

      .@{prefix-cls}__desc {
        color: @header-light-desc-color;
      }
    }

    &-dropdown-overlay {
      .ant-dropdown-menu-item {
        min-width: 160px;
      }
    }
  }
</style>
