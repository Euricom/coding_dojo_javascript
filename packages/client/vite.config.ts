import react from '@vitejs/plugin-react';
import { join } from 'path';
import { defineConfig } from 'vite';
import EnvironmentPlugin from 'vite-plugin-environment';
import svgrPlugin from 'vite-plugin-svgr';
import pgk from './package.json';

const srcRoot = join(__dirname, 'src');
const plugins = [
  //
  react(),
  svgrPlugin(),
  EnvironmentPlugin('all', { prefix: 'REACT_APP_' }),
].filter(Boolean);

// More config, see: https://vitejs.dev/config/
export default defineConfig({
  plugins,
  resolve: {
    alias: {
      '@': srcRoot,
    },
  },
  define: {
    'process.env.VERSION': JSON.stringify(pgk.version),
    'process.env.BUILD_DATE': JSON.stringify(new Date().toISOString()),
  },
});
