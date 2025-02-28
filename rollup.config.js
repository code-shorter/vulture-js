import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';

export default {
    input: 'src/index.js', // Entry point of the library
    output: {
        file: 'dist/vulture.min.js',
        format: 'umd', // Universal Module Definition
        name: 'vulture',
        sourcemap: false
    },
    plugins: [
        resolve(), // Resolve node_modules
        commonjs(), // Convert CommonJS modules to ES6
        terser() // Minify the output
    ]
};
