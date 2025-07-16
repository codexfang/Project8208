import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/Project8208/', // MUST match your repo name
  plugins: [react()],
})