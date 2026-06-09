import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Levcreates portfolio — single-page React app served at the site root.
export default defineConfig({
  plugins: [react()],
})
