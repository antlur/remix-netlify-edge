import { vitePlugin as remix } from "@remix-run/dev";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { netlifyPlugin } from "@netlify/remix-edge-adapter/plugin";
import { remixDevTools } from "remix-development-tools";

export default defineConfig({
  server: {
    port: 3000,
  },
  plugins: [remix(), netlifyPlugin(), tsconfigPaths()],
  optimizeDeps: { exclude: ["fsevents"] },
});
