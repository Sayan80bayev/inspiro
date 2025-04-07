import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        // Manual chunks for dynamic imports
        manualChunks(id) {
          // Customize based on the component you want to split
          if (id.includes('src/components/ui/PinsGrid')) {
            return 'pinsGrid' // Forces a separate chunk for PinsGrid
          }
          if (id.includes('src/widgets/Sidebar')) {
            return 'sidebar' // Forces a separate chunk for Sidebar
          }
          // You can split out vendor libraries as well
          if (id.includes('node_modules')) {
            return 'vendor'
          }
        },
      },
    },
  },
})
