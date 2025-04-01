import babel from '@rollup/plugin-babel';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';

export default {
  input: 'samples/node/main.ts',
  output: {
    file: 'samples/node/bundle.js',
    format: 'esm',
    //file: 'samples/node/bundle.cjs',
    //format: 'cjs',
    sourcemap: true,
  },
  plugins: [
    nodeResolve({
      browser: true,
      preferBuiltins: true,
      extensions: ['.js', '.ts'],
    }),
    babel({
      babelHelpers: 'bundled',
      extensions: ['.js', '.ts'],
      exclude: 'node_modules/**',
    }),
    commonjs(),
    terser(),
  ],
};
