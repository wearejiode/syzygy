// vite.config.js
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      entry: 'src/GenieAssistant.js',
      name: 'GenieAssistant',
      fileName: 'genie-assistant',
      formats: ['es', 'umd']
    },
    rollupOptions: {
      output: {
        globals: {
          // define external deps here if needed
        }
      }
    }
  }
});