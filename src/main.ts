import '/@/design/index.less';
import 'virtual:windi-base.css';
import 'virtual:windi-components.css';
import 'virtual:windi-utilities.css';
import 'virtual:svg-icons-register';
import { createApp } from 'vue'
import App from './App.vue'
import { router, setupRouter } from './router';
import { setupLoadingDirectives} from './directives'

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
    setupRouter(app);
    setupLoadingDirectives(app);
    app.use(router)
    app.mount('#app')
 
}
// const app = createApp(App)
// app.use(useRouter)
bootstrap();