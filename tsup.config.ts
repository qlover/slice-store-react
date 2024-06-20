import { Options, defineConfig } from 'tsup';
import { loadEnv } from './gulpfile';

// use import .cjs
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const pathConfig = require('./config/path.config.cjs');

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
    format: ['esm', 'iife'],
    entry: ['./packages/main/index.ts'],
    outDir: pathConfig.buildDir,
    platform: 'neutral',
    globalName: 'sliceStoreReact',
    outExtension({ format }) {
      if (format === 'iife') return { js: '.js' };
      return { js: `.${format}.js` };
    },
    ...commonConfig
  }
]);
