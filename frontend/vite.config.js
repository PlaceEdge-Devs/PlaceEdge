import path from "path"
import { fileURLToPath } from "url"
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Modern ESM output — required for optimal tree-shaking of lucide-react and framer-motion
    target: 'esnext',
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // React runtime — tiny, always needed, cache independently
          if (
            id.includes('node_modules/react/') ||
            id.includes('node_modules/react-dom/') ||
            id.includes('node_modules/scheduler/')
          ) {
            return 'vendor-react';
          }
          // Konva canvas stack — loaded lazily via React.lazy on FlyerPreview/Setu
          if (
            id.includes('node_modules/konva') ||
            id.includes('node_modules/react-konva') ||
            id.includes('node_modules/use-image')
          ) {
            return 'vendor-konva';
          }
          // Framer Motion — isolate for caching; tree-shakes well with ESM target
          if (id.includes('node_modules/framer-motion')) {
            return 'vendor-framer';
          }
          // lucide-react — icon library; dedicated chunk ensures clean per-icon tree-shaking
          if (id.includes('node_modules/lucide-react')) {
            return 'vendor-icons';
          }
          // react-easy-crop — only loaded when ImageCropperDialog mounts
          if (id.includes('node_modules/react-easy-crop')) {
            return 'vendor-cropper';
          }
          // Recharts + d3 dependencies — heavy charting stack
          if (
            id.includes('node_modules/recharts') ||
            id.includes('node_modules/d3-') ||
            id.includes('node_modules/victory-')
          ) {
            return 'vendor-charts';
          }
          // UI primitive libraries (Base UI, Radix, cmdk)
          if (
            id.includes('node_modules/@base-ui') ||
            id.includes('node_modules/@radix-ui') ||
            id.includes('node_modules/cmdk')
          ) {
            return 'vendor-ui';
          }
        },
      },
    },
  },
})
