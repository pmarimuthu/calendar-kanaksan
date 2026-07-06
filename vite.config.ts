import { resolve } from 'node:path';
import { existsSync, readFileSync } from 'node:fs';
import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';

const JSON_ROOT = resolve(__dirname, '../json');

function serveLocalJson(): Plugin {
  return {
    name: 'serve-local-json',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (!req.url || !req.url.startsWith('/json/')) return next();
        const relativePath = decodeURIComponent(req.url.slice('/json/'.length).split('?')[0]);
        const filePath = resolve(JSON_ROOT, relativePath);
        if (!filePath.startsWith(JSON_ROOT) || !existsSync(filePath)) {
          res.statusCode = 404;
          res.end(JSON.stringify({ error: `Not found: ${relativePath}` }));
          return;
        }
        res.setHeader('Content-Type', 'application/json');
        res.end(readFileSync(filePath));
      });
    },
  };
}

// Library build: emits ESM + CJS bundles plus per-module .d.ts files.
// react/react-dom are peer dependencies and stay external; i18next/react-i18next
// are bundled (the component manages its own isolated i18n instance internally).
export default defineConfig({
  plugins: [
    react(),
    serveLocalJson(),
    dts({
      include: ['src'],
      exclude: ['src/**/*.test.ts', 'src/**/*.test.tsx'],
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'TamilCalendar',
      formats: ['es', 'cjs'],
      fileName: (format) => `tamil-calendar.${format === 'es' ? 'js' : 'cjs'}`,
    },
    cssCodeSplit: false,
    sourcemap: true,
    emptyOutDir: true,
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime'],
      output: {
        globals: { react: 'React', 'react-dom': 'ReactDOM' },
        assetFileNames: 'tamil-calendar.[ext]',
      },
    },
  },
});
