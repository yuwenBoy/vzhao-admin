import { defineConfig,UserConfig,ConfigEnv } from 'vite'
// import pkg from './package.json';
// import vue from '@vitejs/plugin-vue'
import { loadEnv } from 'vite';
import { resolve } from 'path';
import { wrapperEnv } from './build/utils';
import { createVitePlugins } from './build/vite/plugin';
import { createProxy } from './build/vite/proxy';
import { OUTPUT_DIR } from './build/constant';
function pathResolve(dir: string){
  return resolve(process.cwd(),'.',dir);
}

export default ({ command, mode } : ConfigEnv):UserConfig =>{
const root = process.cwd();

const env = loadEnv(mode,root);

const viteEnv = wrapperEnv(env);

const { VITE_PORT, VITE_PUBLIC_PATH,VITE_PROXY,VITE_DROP_CONSOLE } = viteEnv;

const isBuild = command === 'build';
return {
  base:VITE_PUBLIC_PATH,
  root,
    resolve:{
    alias: [
      // /@/xxxx => src/xxxx
      {
        find : /\/@\//,
        replacement: pathResolve('src')+'/'
      },
       // /#/xxxx => types/xxxx
       {
        find: /\/#\//,
        replacement: pathResolve('types') + '/',
      },
    ]
  },
  server:{
    host:true,
    port:VITE_PORT,
    proxy:createProxy(VITE_PROXY)
  },
  build: {
    target: 'es2015',
    outDir: OUTPUT_DIR,
    terserOptions: {
      compress: {
        keep_infinity: true,
        // Used to delete console in production environment
        drop_console: VITE_DROP_CONSOLE,
      },
    },
    // Turning off brotliSize display can slightly reduce packaging time
    brotliSize: false,
    chunkSizeWarningLimit: 2000,
  },
  define:{
     // setting vue-i18-next
      // Suppress warning
      __INTLIFY_PROD_DEVTOOLS__: false,
      // __APP_INFO__: JSON.stringify(__APP_INFO__),
  },
  css: {
    preprocessorOptions: {
      less: {
        // modifyVars: generateModifyVars(),
        javascriptEnabled: true,
      },
    },
  },
  // The vite plugin used by the project. The quantity is large, so it is separately extracted and managed
  plugins: createVitePlugins(viteEnv, isBuild),

  optimizeDeps: {
    // @iconify/iconify: The dependency is dynamically and virtually loaded by @purge-icons/generated, so it needs to be specified explicitly
    include: [
      '@iconify/iconify',
      'ant-design-vue/es/locale/zh_CN',
      'moment/dist/locale/zh-cn',
      'ant-design-vue/es/locale/en_US',
      'moment/dist/locale/eu',
    ],
    exclude: ['vue-demi'],
  },
}
}

// https://vitejs.dev/config/
// export default defineConfig({
//   base:'./',
//   plugins: [vue()],
//   resolve:{
//     alias: [
//       {
//         find : /\/@\//,
//         replacement: pathResolve('src')+'/'
//       },
//        // /#/xxxx => types/xxxx
//        {
//         find: /\/#\//,
//         replacement: pathResolve('types') + '/',
//       },
//     ]
//   },
//   css: {
//     preprocessorOptions: {
//       less: {
//         // modifyVars: generateModifyVars(),
//         javascriptEnabled: true,
//       },
//     },
//   },
// })
