import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import vitePluginExternal from 'vite-plugin-external';

// TODO: maybe better option as https://github.com/vikejs/vike
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({}),
    // NOTE:
    // - default output.global only works for iife and umd
    // - this will not work in SSG since window object and the external deps is not there
    // - process.env.VITE_SSG is vite-react-ssg specific
    // - for dev mode, the SSR compile is OK but seems like the jsx-runtime loading will
    // hav issue because of the cjs format
    // https://github.com/Daydreamer-riri/vite-react-ssg/blob/main/src/node/dev.ts
    // https://github.com/Daydreamer-riri/vite-react-ssg/blob/main/src/node/build.ts
    process.env.VITE_SSG || process.env.__DEV_MODE_SSR ? undefined : vitePluginExternal({
      externals: {
        react: 'React'
      },
      // config to use alias, not output.global
      interop: 'auto',
    })
  ],
  build: {
    minify: false,
    sourcemap: true,
    outDir: "dist_vi",
    rollupOptions: {
      // not needed, covered by vite-plugin-external
      // external: ["react", "react-dom"],
      output: {
        /*
        // this onli works on UMD and IIFE as rollup limitation
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
        */
        chunkFileNames: "assets/[name].js",
        manualChunks: (id: string) => {
          if (id.includes("/node_modules/")) {
            return "vendor";
          } else {
            if (id.includes("/plugin/")) {
              return "plugin";
            }

            if (id.includes("/libs/")) {
              return "headless";
            }
          }
          return undefined;
        },
      },
    },
  },
});
