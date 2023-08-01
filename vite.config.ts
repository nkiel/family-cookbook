import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import mixPlugin, { Adapter } from 'vite-plugin-mix';

interface MixConfig {
  handler: string;
  adapter?: Adapter | undefined;
}

type MixPlugin = (config: MixConfig) => Plugin;

interface Mix {
  default: MixPlugin;
}

const mix = (mixPlugin as unknown as Mix).default;

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react({
    jsxImportSource: '@emotion/react',
    babel: {
      plugins: ["@emotion/babel-plugin"],
    },
  }),
  mix({
    handler: './src/api/app.ts',
  }),],
  server: {
    watch: {
      usePolling: true
    },
    host: true,
    port: 3000
  }
})
