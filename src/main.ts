import '/@/design/index.less';
import 'virtual:windi-base.css';
import 'virtual:windi-components.css';
import 'virtual:windi-utilities.css';
import 'virtual:svg-icons-register';
import App from './App.vue';
import { createApp } from 'vue';
import { router, setupRouter } from './router';
import { setupStore } from '/@/store';
import { setupGlobDirdctives } from '/@/directives'

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

    // 引入路由
    setupRouter(app);

    // 引入全局指令
    setupGlobDirdctives(app);

    app.use(router);

    app.mount('#app');
 
}
// const app = createApp(App)
// app.use(useRouter)
bootstrap();