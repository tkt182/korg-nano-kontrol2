import babel from '@rollup/plugin-babel';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

export default {
  input: 'src/korg-nano-kontrol2.ts',
  output: [
    {
      file: 'lib/korg-nano-kontrol2.cjs',
      format: 'cjs',
    },
    {
      file: 'lib/korg-nano-kontrol2.mjs',
      format: 'esm',
    },
  ],
  external: ['os', 'util', 'tty'],
  plugins: [
    nodeResolve({
      extensions: ['.ts', '.js'],
      preferBuiltins: false,
    }),
    babel({
      babelHelpers: 'bundled',
      extensions: ['.ts', '.js'],
      exclude: 'node_modules/**',
    }),
    commonjs(),
  ],
};
