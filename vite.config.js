import path from "path";
import { defineConfig } from "vite";
import backend from "./backend/server.js";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3002",
        changeOrigin: true,
      },
    },
    open: true,
  },
  build: {
    outDir: "dist",
    assetsDir: "assets",
    sourcemap: true,
  },
  middleware: [
    (req, res, next) => {
      if (req.url.endsWith(".jsx")) {
        res.setHeader("Content-Type", "text/javascript");
      }
      next();
    },
    (app) => {
      app.use(backend);
    },
  ],
});
