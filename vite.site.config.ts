import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Site/demo build for Vercel (calendar-kanaksan): builds the playground app
// from index.html + src/dev/main.tsx into dist-site/. Panchangam JSON is
// served statically from public/json (copied into the build output).
// The library build stays in vite.config.ts.
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist-site',
    emptyOutDir: true,
    sourcemap: false,
  },
});
