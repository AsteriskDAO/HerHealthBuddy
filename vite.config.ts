import react from "@vitejs/plugin-react-swc";
import path from "path";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:5000", // Dirección del backend
        changeOrigin: true, // Cambia el origen de la solicitud
        secure: false, // Desactiva SSL para desarrollo local si es necesario
      },
    },
  },
});
