import { createAsyncComponent } from "/@/utils/factory/createAsyncComponent";

import FullScreen from './FullScreen.vue';


// 导航用户头像、信息
export const UserDropDown = createAsyncComponent(() => import('./user-dropdown/index.vue'),{
    loading: true
});

export const LayoutBreadcrumb = createAsyncComponent(() => import('./Breadcrumb.vue'));

// 全屏模式
export {
    FullScreen
}

// 导航 通知消息
export const Notify = createAsyncComponent(() => import('./notify/index.vue'))