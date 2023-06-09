import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';
import { resolve } from 'path';

export default defineConfig({
  plugins: [solidPlugin()],
  server: {
    port: 3000,
  },
  build: {
    target: 'esnext',
    lib: {
      entry: resolve(__dirname, './src/SolidQueryDevtools.jsx'),
      name: 'solid-query-devkit'
    },
  },
  rollupOptions: {
    input: './src/SolidQueryDevtools.jsx',
    external: ['solid-js', '@tanstack/solid-query', 'path']
  }
});