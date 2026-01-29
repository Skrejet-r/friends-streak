import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Für GitHub Pages: base path auf Repository-Namen setzen
  // Wenn dein Repo anders heißt, ändere '/FriendStreak/' entsprechend
  // Im Development-Modus wird '/' verwendet, im Build '/FriendStreak/'
  base: process.env.NODE_ENV === 'production' ? '/FriendStreak/' : '/',
})
