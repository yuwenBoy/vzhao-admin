<template>
  <div :class="[prefixCls, `${prefixCls}--${theme}`]">
    <a-breadcrumb :routes="routes">
      <template #itemRender="{ route, routes: routesMatched }">
        <Icon :icon="getIcon(route)" v-if="getShowBreadCrumbIcon && getIcon(route)" />
        <span v-if="!hasRedirect(routesMatched,route)">{{ route.name || route.meta.title }}</span>
        <router-link v-else to=""> {{ route.name || route.meta.title }}</router-link>
      </template>
    </a-breadcrumb>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, watchEffect } from 'vue';
import { useDesign } from '/@/hooks/web/useDesign';
import { propTypes } from '/@/utils/propTypes';
import { Breadcrumb } from 'ant-design-vue';
import { RouteLocationMatched, useRouter } from 'vue-router';
import Icon from '/@/components/Icon';
import { useRootSetting } from '/@/hooks/setting/useRootSetting';
import { REDIRECT_NAME } from '/@/router/constant';
export default defineComponent({
  name: 'LayoutBreadcrumb',
  components: { Icon, [Breadcrumb.name]: Breadcrumb },
  props: {
    theme: propTypes.oneOf(['dark', 'light']),
  },
  setup() {


    const { prefixCls } = useDesign('layout-breadcrumb');
    const routes = ref<RouteLocationMatched[]>([]);
    const { getShowBreadCrumbIcon } = useRootSetting();
    const { currentRoute } = useRouter();

    watchEffect(async () => {
      console.log('watch');
      if(currentRoute.value.name === REDIRECT_NAME) return;
      // const menus = await getMenus();
      // const routeMatched = currentRoute.value.matched;
      // const cur = routeMatched?.[routeMatched.length - 1];
      // let path = currentRoute.value.path;
      // if(cur && cur?.meta?.currentActiveMenu) {
      //   path = cur.meta.currentActiveMenu as string;
      // }
    })

    function hasRedirect(routes: RouteLocationMatched[],route:RouteLocationMatched) {
      return routes.indexOf(route) !== routes.length - 1;
    }
    function getIcon(route) {
      return route.icon || route.meta?.icon;
    }
    return {
      prefixCls,
      routes,
      getIcon,
      getShowBreadCrumbIcon,
      hasRedirect
    };
  },
});
</script>

<style lang="less">
@prefix-cls: ~'@{namespace}-layout-breadcrumb';

.@{prefix-cls} {
  display: flex;
  padding: 0 8px;
  align-items: center;

  .ant-breadcrumb-link {
    .anticon {
      margin-right: 4px;
      margin-bottom: 2px;
    }
  }

  &--light {
    .ant-breadcrumb-link {
      color: @breadcrumb-item-normal-color;

      a {
        color: rgb(0 0 0 / 65%);

        &:hover {
          color: @primary-color;
        }
      }
    }

    .ant-breadcrumb-separator {
      color: @breadcrumb-item-normal-color;
    }
  }

  &--dark {
    .ant-breadcrumb-link {
      color: rgb(255 255 255 / 60%);

      a {
        color: rgb(255 255 255 / 80%);

        &:hover {
          color: @white;
        }
      }
    }

    .ant-breadcrumb-separator,
    .anticon {
      color: rgb(255 255 255 / 80%);
    }
  }
}
</style>