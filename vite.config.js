import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/rajaongkir": {
        target: "https://rajaongkir.komerce.id",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/rajaongkir/, ""),
      },
    },
  },
});
