import tailwindcss from '@tailwindcss/vite';
import { fileURLToPath, URL } from 'node:url'
import Vue from '@vitejs/plugin-vue'
import Fonts from 'unplugin-fonts/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [Vue(), Fonts({
    fontsource: {
      families: [
        {
          name: 'Sora',
          weights: [400, 500, 700],
          styles: ['normal'],
        },
      ],
    },
  }), tailwindcss()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('src', import.meta.url)),
    },
    extensions: ['.js', '.json', '.jsx', '.mjs', '.ts', '.tsx', '.vue'],
  },
  server: {
    port: 3000,
  },
})