import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { componentTagger } from "lovable-tagger";

export default defineConfig(({ mode }) => ({
  resolve: {
    alias: {
      '@': '/src', // Configuração do alias para facilitar as importações
    },
  },
  server: {
    host: "::",
    port: 8080,
    proxy: {
      '/api': {
        target: 'http://localhost:3002',
        changeOrigin: true,
        secure: false,
        ws: true,
      },
    },
  },
  plugins: [
    react(),
    mode === 'development' && componentTagger(),
  ].filter(Boolean),
  optimizeDeps: {
    include: ['@radix-ui/react-dialog', '@radix-ui/react-select'],
  },
}));