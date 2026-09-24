import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/painting-gallery/', // Имя должно совпадать с именем репозитория
})