import { resolve } from 'node:path';
import { existsSync, readFileSync } from 'node:fs';
import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';

const JSON_ROOT = resolve(__dirname, 'json');

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

export default defineConfig({
  publicDir: false,

  plugins: [
    react(),
    serveLocalJson(),
    dts({
      include: ['src'],
      exclude: [
        'src/**/*.test.ts',
        'src/**/*.test.tsx',
        'src/dev/**',
      ],
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
    sourcemap: false,
    emptyOutDir: true,
    rollupOptions: {
      external: [
        'react',
        'react-dom',
        'react/jsx-runtime',
        'i18next',
        'react-i18next',
        '@mui/material',
        '@mui/icons-material',
        '@mui/x-date-pickers',
        '@emotion/react',
        '@emotion/styled',
        'dayjs',
      ],
      output: {
        globals: { react: 'React', 'react-dom': 'ReactDOM' },
        assetFileNames: 'tamil-calendar.[ext]',
      },
    },
  },
});