import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from "@tailwindcss/vite"
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    server: {
      host: '0.0.0.0',
      allowedHosts: [env.VITE_ALLOWED_HOST], // from .env
      proxy: {
        '/tracks': 'http://localhost:3000',
        '/items': 'http://localhost:3000',
        '/artists': 'http://localhost:3000',
      },
    },
    build: {
      outDir: '../DJDoubleTwoAPI/client-build',
      emptyOutDir: true,
    },
  };
});