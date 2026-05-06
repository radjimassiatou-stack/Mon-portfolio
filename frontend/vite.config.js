import { defineConfig } from "vite";

export default defineConfig({
  root: ".",
  publicDir: "public",
  define: {
    __API_URL__: JSON.stringify(process.env.VITE_API_URL || ""),
  },
  build: {
    outDir: "dist",
    emptyOutDir: true,
  },
  server: {
    port: 3000,
    host: "0.0.0.0",
  },
  preview: {
    port: 3000,
    host: "0.0.0.0",
  },
});
