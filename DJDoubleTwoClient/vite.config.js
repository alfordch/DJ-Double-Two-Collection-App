import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Load .env file for the current mode (development/production)
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react()],
    server: {
      host: '0.0.0.0',
      allowedHosts: [env.VITE_ALLOWED_HOST], // uses your .env variable
      proxy: {
        '/tracks': 'http://localhost:3000',
      },
    },
    build: {
      outDir: '../DJDoubleTwoAPI/client-build',
      emptyOutDir: true,
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },

  };
});