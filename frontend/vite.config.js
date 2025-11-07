import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 5173,
    strictPort: true,
    host: true,
  },
  resolve: {
    alias: {
      // FIX 1: Map the base alias '@' to the 'src' folder.
      // This is the standard pattern for Shadcn/ui and should resolve most issues.
      "@": path.resolve(__dirname, "./src"),

      // FIX 2: If you had explicit aliases for components and lib, simplify them:
      // "@/components": path.resolve(__dirname, "./src/components"),
      // "@/lib": path.resolve(__dirname, "./src/lib"),
    },
  },
});
