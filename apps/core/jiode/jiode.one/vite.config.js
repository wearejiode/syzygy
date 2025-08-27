/// <reference types="vitest" />
import { resolve } from 'node:path'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    outDir: resolve(__dirname, '../../../..', 'dist/apps/jiode.one'), // absolute path to repo-root/dist/apps/jiode.one
    emptyOutDir: true,             // clear it before each build
  },
  test: {
    environment: 'jsdom',
    include: ['main.test.js'],
    setupFiles: ['./setupTests.js']
  },
})
