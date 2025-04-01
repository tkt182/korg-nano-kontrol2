import babel from '@rollup/plugin-babel';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import nodePolyfills from 'rollup-plugin-polyfill-node';
import terser from '@rollup/plugin-terser';

export default {
  input: 'samples/browser/src/main.ts',
  output: {
    file: 'samples/browser/dist/bundle.js',
    format: 'esm',
    //format: 'iife',
    //name: 'App',
    sourcemap: true,
  },
  plugins: [
    nodeResolve({
      browser: true,
      preferBuiltins: false,
      extensions: ['.js', '.ts', '.mjs'],
      //extensions: ['.js', '.ts', '.cjs'],
    }),
    babel({
      babelHelpers: 'bundled',
      extensions: ['.js', '.ts'],
      exclude: 'node_modules/**',
    }),
    commonjs({
      extensions: ['.js', '.ts'],
    }),
    nodePolyfills(),
    terser(),
  ],
};
