import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react({
    include: ["**/*.tsx", '**/*.ts', '**/*.json'],
    jsxImportSource: '@emotion/react',
  })],
  server: {
    watch: {
      usePolling: true
    },
    host: true,
    port: 3000
  }
})
