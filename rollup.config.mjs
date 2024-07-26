import typescript from '@rollup/plugin-typescript';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';

export default {
  input: 'src/index.tsx',
  output: {
    file: 'dist/bundle.js',
    format: 'umd', // Immediately Invoked Function Expression format
    sourcemap: true,
    globals: {
      react: 'React',
      'react-dom': 'ReactDOM'
    },
  },
  plugins: [
    peerDepsExternal(),
    nodeResolve({
      extensions: ['.js', '.jsx', '.ts', '.tsx']
    }),
    commonjs({
      include: 'node_modules/**',
      requireReturnsDefault: 'auto', // This will fix the 'default' export issues
    }),
    typescript()
  ],
  external: ['react', 'react-dom'],
};