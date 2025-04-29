import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss()],
  optimizeDeps: {
    include: ["quill", "quill-table", "react-quill"],
    exclude: ["quill-better-table"],
    force: true, // Force re-optimization of dependencies
  },
  build: {
    commonjsOptions: {
      include: [/quill/, /quill-table/, /react-quill/, /node_modules/],
    },
  },
  
})


