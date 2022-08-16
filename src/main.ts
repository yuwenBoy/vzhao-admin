import { createApp } from 'vue'
import App from './App.vue'
import { router, setupRouter } from './router';
import { setupLoadingDirectives} from './directives'
// import "ant-design-vue/dist/antd.less";
import('ant-design-vue/dist/antd.less');
// import 'virtual:windi.css';

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