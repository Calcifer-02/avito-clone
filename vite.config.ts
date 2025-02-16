import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
   plugins: [react()],
   server: {
      proxy: {
         "/items": "http://server:3000",
         "/login": "http://localhost:8000",
      },
   },
});
