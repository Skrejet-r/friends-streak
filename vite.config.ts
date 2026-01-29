import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Für GitHub Pages: base path auf Repository-Namen setzen
  // Repository-Name: friends-streak
  // Im Development-Modus wird '/' verwendet, im Build '/friends-streak/'
  base: process.env.NODE_ENV === 'production' ? '/friends-streak/' : '/',
})
