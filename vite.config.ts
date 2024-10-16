import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react({
  })],
  build: {
    minify: false,
    sourcemap: true,
    outDir: 'dist_vi',
    rollupOptions: {
      output: {
        chunkFileNames: 'assets/[name].js',
        manualChunks: (id: string) => {
          if (id.includes('/node_modules/')) {
            return 'vendor';
          } else {
            if (id.includes('/plugin/')) {
              return 'plugin';
            }

            if (id.includes('/libs/')) {
              return 'headless';
            }
          }

          return undefined;
        },
      },
    },
  },
});
