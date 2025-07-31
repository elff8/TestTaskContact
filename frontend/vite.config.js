import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000, // Устанавливаем порт 3000
    open: true, // Автоматически открывать браузер
  },
});