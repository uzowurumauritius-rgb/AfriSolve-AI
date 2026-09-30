import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
export default defineConfig({
  plugins: [react()],
  server: { host: '127.0.0.1', port: 5174, proxy: { '/api': 'http://127.0.0.1:5173' } },
  test: { environment: 'jsdom', include: ['tests/ui*.test.{js,jsx}'], globals: true, restoreMocks: true },
});
