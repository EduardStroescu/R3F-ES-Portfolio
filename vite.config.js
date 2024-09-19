import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import filterReplace from "vite-plugin-filter-replace";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    filterReplace([
      {
        filter: ["node_modules/three-stdlib/libs/lottie.js"],
        replace: {
          from: 'eval("[function _expression_function(){" + val + ";scoped_bm_rt=$bm_rt}]")[0]',
          to: "(new Function('scoped_bm_rt', val + ';return $bm_rt;'))()",
        },
      },
    ]),
  ],
});
