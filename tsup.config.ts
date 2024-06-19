import { Options, defineConfig } from 'tsup';

const currentNodeEnv = process.env.NODE_ENV;
const isProd = currentNodeEnv === 'build';

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
    entry: ['./src/index.ts'],
    outDir: 'dist/main',
    platform: 'neutral',
    external: ['react', '@qlover/slice-store'],
    globalName: 'SliceStore',
    outExtension({ format }) {
      if (format === 'iife') return { js: '.js' };
      return { js: `.${format}.js` };
    },
    ...commonConfig
  }
]);
