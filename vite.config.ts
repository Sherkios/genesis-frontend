import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      assets: path.resolve(__dirname, "src/assets/"),
      components: path.resolve(__dirname, "src/components/"),
      store: path.resolve(__dirname, "src/store/"),
      services: path.resolve(__dirname, "src/services/"),
      src: path.resolve(__dirname, "src/"),
    },
  },
});
