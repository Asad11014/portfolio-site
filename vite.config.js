import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base '/website/' keeps it compatible with GitHub Pages project hosting.
// Change to '/' if deploying to a custom domain or Render.
export default defineConfig({
  plugins: [react()],
  base: './',
})
