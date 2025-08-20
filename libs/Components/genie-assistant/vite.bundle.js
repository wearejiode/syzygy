// vite.config.js
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      entry: 'src/genie-assistant.js',
      name: 'genie-assistant',
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
