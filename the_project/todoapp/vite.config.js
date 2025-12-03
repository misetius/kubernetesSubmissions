import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

const port = parseInt(process.env.VITE_PORT, 10) || 3001;

// https://vite.dev/config/
export default defineConfig({
 base: "/",
 plugins: [react()],
 preview: {
  port: port,
  strictPort: true,
 },
 server: {
  port: port,
  strictPort: true,
  host: true,
  origin: "http://0.0.0.0:"+port,
 },
});
