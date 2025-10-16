import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import filterReplace from "vite-plugin-filter-replace";
import { threeMinifier } from "@yushijinhun/three-minifier-rollup";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    { ...threeMinifier(), enforce: "pre" },
    react(),
    filterReplace([
      {
        filter: ["node_modules/three-stdlib/libs/lottie.js"],
        replace: {
          from: `eval("[function _expression_function(){" + val + ";scoped_bm_rt=$bm_rt}]")[0]`,
          to: "(new Function('scoped_bm_rt', val + ';return $bm_rt;'))()",
        },
      },
    ]),
  ],
  build: {
    resolve: { dedupe: ["react", "react-dom"] },
    rollupOptions: {
      external: ["hls.js"],
      output: {
        manualChunks: (id) => {
          if (/node_modules\/three/.test(id)) return "three-core";
          if (/node_modules\/howler/.test(id)) return "howler";
          if (
            /node_modules\/(react-hook-form|@hookform\/resolvers|zod)/.test(id)
          )
            return "forms";
          if (/node_modules\/(uuid|prop-types|react-merge-refs)/.test(id))
            return "utils";
          if (id.toLowerCase().includes("postprocessing")) {
            return "postprocessing";
          }

          if (/node_modules/.test(id)) return "vendor";
        },
      },
    },
  },
});
