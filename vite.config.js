/*
 * @Author: new-wang
 * @Date: 2022-10-25 10:09:45
 * @LastEditors: new-wang
 * @LastEditTime: 2022-11-08 11:37:54
 * @Description: 
 */
import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      'layouts': fileURLToPath(new URL('./src/layouts', import.meta.url)),
      'views': fileURLToPath(new URL('./src/views', import.meta.url)),
      'styles': fileURLToPath(new URL('./src/styles', import.meta.url)),
      'utils': fileURLToPath(new URL('./src/utils', import.meta.url)),
      'stores': fileURLToPath(new URL('./src/stores', import.meta.url)),
      'assets': fileURLToPath(new URL('./src/assets', import.meta.url)),
    }
  }
})
