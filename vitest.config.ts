import viteReact from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import { fileURLToPath } from 'url';

export default defineConfig(() => {
  return {
    plugins: [viteReact(), tsconfigPaths()],
    test: {
      watch: false,
      globals: true,
      environment: 'jsdom',
      setupFiles: fileURLToPath(new URL('./vitest.setup.ts', import.meta.url)),
    },
  };
});
