import { createApp } from 'vue'
import App from './App.vue'
import { router, setupRouter } from './router';


async function bootstrap() {
    const app = createApp(App);
    setupRouter(app);
    app.use(router)
    app.mount('#app')
 
}
// const app = createApp(App)
// app.use(useRouter)
bootstrap();