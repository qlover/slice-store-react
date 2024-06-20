import { Options, defineConfig } from 'tsup';
import { loadEnv } from './gulpfile';

<<<<<<< HEAD
// use import .cjs
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const pathConfig = require('./config/path.config.cjs');

=======
>>>>>>> f0a6168f0362742191c954901731a17fe1e50e76
loadEnv();

const env = process.env.NODE_ENV;
console.log('[env is]', env);
const isProd = env === 'production';

const commonConfig: Options = {
  minify: isProd,
  sourcemap: !isProd,
  shims: true,
  clean: true,
  dts: true
};

export default defineConfig([
  {
    format: ['esm', 'cjs'],
    entry: ['./packages/main/index.ts'],
    outDir: 'dist/main',
    platform: 'neutral',
    globalName: 'SliceStoreReact',
    outExtension({ format }) {
      if (format === 'iife') return { js: '.js' };
      return { js: `.${format}.js` };
    },
    ...commonConfig
  }
]);
