import { defineConfig,UserConfig,ConfigEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path';
// import WindiCSS from 'vite-plugin-windicss'
function pathResolve(dir: string){
  return resolve(process.cwd(),'.',dir);
}

// export default ({ command, mode } : ConfigEnv):UserConfig =>{
// return {
//   base:'./',
//     resolve:{
//     alias: [
//       {
//         find : /\/@\//,
//         replacement: pathResolve('src')+'/'
//       }
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
// }
// }

// https://vitejs.dev/config/
export default defineConfig({
  base:'./',
  plugins: [vue()],
  resolve:{
    alias: [
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
  css: {
    preprocessorOptions: {
      less: {
        // modifyVars: generateModifyVars(),
        javascriptEnabled: true,
      },
    },
  },
})
