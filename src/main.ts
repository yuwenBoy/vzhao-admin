import '/@/design/index.less';
import 'virtual:windi-base.css';
import 'virtual:windi-components.css';
import 'virtual:windi-utilities.css';
import 'virtual:svg-icons-register';
import App from './App.vue';
import { createApp } from 'vue';
import { initAppConfigStore } from '/@/logics/initAppConfig';
import { router, setupRouter } from './router';
import { setupRouterGuard } from '/@/router/guard'
import { setupStore } from '/@/store';
import { setupGlobDirdctives } from '/@/directives'
import { setupI18n } from '/@/locales/setupI18n';

if(import.meta.env.DEV){
    import('ant-design-vue/dist/antd.less');
}
// import 'virtual:windi.css'; 
// 等价于
// import 'virtual:windi-base.css';
// import 'virtual:windi-components.css';
// import 'virtual:windi-utilities.css';

async function bootstrap() {
    const app = createApp(App);

    // 引入pina 状态管理
    setupStore(app);

    initAppConfigStore();

    // registerGlobComp(app);
    await setupI18n(app);

    // 引入路由
    setupRouter(app);

    // 引入全局指令
    setupGlobDirdctives(app);

    // app.use(router);
    setupRouterGuard(router);

    app.mount('#app');
 
}
// const app = createApp(App)
// app.use(useRouter)
bootstrap();