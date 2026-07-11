import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Stable vendor chunk so app changes don't bust the framework cache.
          vendor: ["react", "react-dom", "react-router-dom"],
        },
      },
    },
  },
});
